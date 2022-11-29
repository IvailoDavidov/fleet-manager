export abstract class Vehicle {
    id: string;
    make: string;
    model: string;
    rentalPrice: number;
    rentedTo: string | null;
}