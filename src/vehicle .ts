export abstract class Vehicle {
    abstract id: string;
    abstract make: string;
    abstract model: string;
    abstract rentalPrice: number;
    abstract rentedTo: string | null;
}