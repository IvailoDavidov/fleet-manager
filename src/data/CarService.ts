import { DataService } from "./DataService";
import { Car } from "../cars"
import { Record } from "./IStorage";

type CarViewModel = {
    make: string,
    model: string,
    rentalPrice: number,
    rentedTo: string,
    bodyType: string,
    numberOfSeats: number,
    transmission: string
}

export class CarService extends DataService<Car, CarViewModel>{

    protected parseRecord(record: Record): Car {
        const data = record as any;
        const result = new Car(
            data.id,
            data.make,
            data.model,
            data.rentalPrice,
            data.rentedTo,
            data.bodyType,
            data.numberOfSeats,
            data.transmission
        );

        return result;
    }

    protected validate(data: any): void {
        if (typeof data.make !== 'string') {
            throw new TypeError('Invalid property "make"')
        }
        if (typeof data.model != 'string') {
            throw new TypeError('Invalid property "model"')
        }
        if (typeof data.rentalPrice != 'number') {
            throw new TypeError('Invalid property "rentalPrice"')
        }
        if (typeof data.rentedTo != 'string') {
            throw new TypeError('Invalid property "rentedTo"')
        }
        if (typeof data.bodyType != 'string') {
            throw new TypeError('Invalid property "rentalPrice"')
        }
        if (typeof data.numberOfSeats != 'number') {
            throw new TypeError('Invalid property "numberOfSeats"')
        }
        if (typeof data.transmission != 'string') {
            throw new TypeError('Invalid property "transmission"')
        }
    }
}