import { Vehicle } from "./vehicle ";

type BodyType = 'sedan' | 'suv' | 'hatchback';
type Transmission = 'manual' | 'automatic';

export class Car implements Vehicle {
    id: string;
    make: string;
    model: string;
    rentalPrice: number;
    rentedTo: string;
    bodyType: BodyType;
    numberOfSeats: number;
    transmission: Transmission
}

