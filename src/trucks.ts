import { Vehicle } from "./vehicle ";

type CargoType = 'box' | 'flatbed' | 'van'

export class Truck implements Vehicle {
    id: string;
    make: string;
    model: string;
    rentalPrice: number;
    rentedTo: string;
    cargoType: CargoType;
    capacity: number;
}