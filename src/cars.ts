import { Vehicle } from "./vehicle ";

export type BodyType = 'sedan' | 'suv' | 'hatchback';
export type Transmission = 'manual' | 'automatic';

export class Car implements Vehicle {
    public id: string;
    public make: string;
    public model: string;
    public rentalPrice: number;
    public rentedTo: string;
    public bodyType: BodyType;
    public numberOfSeats: number;
    public transmission: Transmission;

    constructor(
        id: string,
        make: string,
        model: string,
        rentalPrice: number,
        rentedTo: string,
        bodyType: BodyType,
        numberOfSeats: number,
        transmission: Transmission) {

        this.id = id;
        this.make = make;
        this.model = model;
        this.rentalPrice = rentalPrice;
        this.rentedTo = rentedTo;
        this.bodyType = bodyType;
        this.numberOfSeats = numberOfSeats;
        this.transmission = transmission;
    }
}