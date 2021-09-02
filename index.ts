import { inquirerMenu, listPlaces, pause, readInput } from "./helpers/inquirer";
import 'colors';
import 'dotenv/config';
import Searches from "./models/Searches";
import { Place, Weather } from './interfaces';


const main = async () => {

    let opt;

    const searches = new Searches();

    do {

        opt = await inquirerMenu();
       
        switch (opt) {
            case 1:

                // Muestra mensaja para ingresar nombre del lugar
                const placeName = await readInput('Ciudad: ');

                // Realiza consulta axios hacia ap de mapbox
                const places = await searches.place(placeName);

                // Obtiene el id seleccionado de la lista de lugares
                const id = await listPlaces(places);

                if (id !== '0') { 

                    const placeSelected: Place = places.find((place: Place) => place.id === id);
                    
                    searches.saveHistorial(placeSelected.name);

                    // Obtiene info del clima
                    const weather: Weather = await searches.weatherByPlace(placeSelected.lat, placeSelected.lng) as Weather;

                    console.log('\nInformación de la ciudad\n'.green);
                    console.log('Ciudad:', placeSelected.name.green);
                    console.log('Lat:', placeSelected.lat);
                    console.log('Lng:', placeSelected.lng);
                    console.log('Clima actual:', weather?.desc.green);
                    console.log('Temperatura:', `${weather?.temp} °C`.green);
                    console.log('Mínima:', `${weather?.min} °C`.green);
                    console.log('Máxima:', `${weather?.max} °C`.green);
                    console.log('Humedad:', `${weather?.humidity} %`.green);
                    console.log('Viento:', `${weather?.wind} km/h`.green);
                    

                }     

                break;

            case 2:
                searches.historial.forEach((placeName, i) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log(`${ idx } ${ placeName }`);
                })

                break;
        };

        if (opt !== 0) await pause();

    } while (opt !== 0);

};

main();