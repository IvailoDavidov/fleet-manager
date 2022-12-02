import { Vehicle } from "./vehicle ";

export type CargoType = 'box' | 'flatbed' | 'van'

export class Truck implements Vehicle {
    public id: string;
    public make: string;
    public model: string;
    public rentalPrice: number;
    public rentedTo: string;
    public cargoType: CargoType;
    public capacity: number;

    constructor(
        id: string,
        make: string,
        model: string,
        rentalPrice: number,
        rentedTo: string,
        cargoType: CargoType,
        capacity: number) {

        this.id = id,
        this.make = make,
        this.model = model;
        this.rentalPrice = rentalPrice;
        this.rentedTo = rentedTo;
        this.cargoType = cargoType;
        this.capacity = capacity;
    }
}