import { DataService } from "./DataService";
import { Car, BodyType, Transmission} from "../cars"
import { Record } from "./IStorage";

type CarViewModel = {
    make: string,
    model: string,
    bodyType: BodyType,
    numberOfSeats: number,
    transmission: Transmission
    rentalPrice: number,
    rentedTo: string | null,
}

export class CarService extends DataService<Car, CarViewModel>{

    protected parseRecord(record: Record): Car {
        const data = record as any;
        const result = new Car(
            data.id,
            data.make,
            data.model,
            data.bodyType,
            data.numberOfSeats,
            data.transmission,
            data.rentalPrice,
            data.rentedTo,
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
        if (typeof data.bodyType != 'string') {
            throw new TypeError('Invalid property "bodyType"')
        }
        if (typeof data.numberOfSeats != 'number') {
            throw new TypeError('Invalid property "numberOfSeats"')
        }
        if (typeof data.transmission != 'string') {
            throw new TypeError('Invalid property "transmission"')
        }
        if (typeof data.rentalPrice != 'number') {
            throw new TypeError('Invalid property "rentalPrice"')
        }
    }
}