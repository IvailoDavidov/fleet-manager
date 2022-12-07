import { Truck, CargoType } from "../trucks"
import { DataService } from "./DataService";
import { Record } from "./IStorage";


type TruckViewModel = {
    make: string,
    model: string,
    cargoType: CargoType,
    capacity: number
    rentalPrice: number,
    rentedTo: string | null,
}

export class TruckService extends DataService<Truck, TruckViewModel>{

    protected parseRecord(record: Record): Truck {
        const data = record as any;
        const result = new Truck(
            data.id,
            data.make,
            data.model,
            data.cargoType,
            data.capacity,
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
        if (typeof data.rentalPrice != 'number') {
            throw new TypeError('Invalid property "rentalPrice"')
        }
        if (typeof data.cargoType != 'string') {
            throw new TypeError('Invalid property "cargoType"')
        }
        if (typeof data.capacity != 'number') {
            throw new TypeError('Invalid property "capacity"')
        }
    }
}