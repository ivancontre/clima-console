export interface Place {
    id: string;
    name: string;
    lng: number;
    lat: number;
};

export interface Weather {
    desc: string;
    min: number;
    max: number;
    temp: number;
    humidity: number;
    wind: number;
};