import axios from 'axios';
import { Place, Weather } from '../interfaces';

export default class Searches {

    historial: string[] = [];

    constructor() {
        
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async place(placesName: string) {

        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com`,
                params: this.paramsMapbox
            });

            
            const resp = await instance.get(`/geocoding/v5/mapbox.places/${ placesName }.json`);

            return resp.data.features.map((city: any) => {

                const newPlace: Place = {
                    id: city.id,
                    name: city.place_name,
                    lng: city.center[0],
                    lat: city.center[1]
                };

                return newPlace;                
                
            });
            
        } catch (error) {
            return [];
        }   

    };

    async weatherByPlace (lat: number, lon: number) {

        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org`,
                params: { ...this.paramsWeather, lat, lon}
            });

            const resp = await instance.get(`/data/2.5/weather`);

            const { main, weather, wind } = resp.data;
            
            return {
                desc: weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1),
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
                humidity: main.humidity,
                wind: wind.speed
            };
            
        } catch (error) {
            console.log(error);
        }
    };

}