import { LocalStorage } from "./data/LocalStorage";
import { Vehicle } from "./vehicle ";
import { Collection } from "./data/Collection"
import { CarService } from "./data/CarService";
import { Editor } from "./dom/Editor";
import { td, tr, button } from "./dom/dom.";
import { Table } from "./dom/Table";

export type BodyType = 'sedan' | 'suv' | 'hatchback';
export type Transmission = 'manual' | 'automatic';

export class Car implements Vehicle {
    public id: string;
    public make: string;
    public model: string;
    public bodyType: BodyType;
    public numberOfSeats: number;
    public transmission: Transmission;
    public rentalPrice: number;
    public rentedTo: string;

    constructor(
        id: string,
        make: string,
        model: string,
        bodyType: BodyType,
        numberOfSeats: number,
        transmission: Transmission,
        rentalPrice: number,
        rentedTo: string,
    ) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.bodyType = bodyType;
        this.numberOfSeats = numberOfSeats;
        this.transmission = transmission;
        this.rentalPrice = rentalPrice;
        this.rentedTo = rentedTo;
    }
}


const carStorage = new LocalStorage();
const carCollection = new Collection(carStorage, 'cars');
const carService = new CarService(carCollection);

start();

async function start() {
 
    const newCarForm = document.getElementById('new-car') as HTMLFormElement;
    const table = document.querySelector(".overview") as HTMLTableElement;
    const tableManager = new Table(table, createCarRow, identifyCar)

    const editor = new Editor(newCarForm, onSubmit.bind(null,tableManager),
    [
        'make',
        'model',
        'bodyType',
        'numberOfSeats',
        'transmission',
        'rentalPrice',
        'rentedTo',
    ]);

    hidrate(tableManager);
}



async function hidrate(tableManager: Table) {
    const cars = await carService.getAll();
    console.log(cars);   
    for (let car of cars) {
        tableManager.add(car);
    }
}

function identifyCar(cars: Car[], id:string){
    return cars.find(c => c.id == id);
}

function createCarRow(car: Car) {
    const row = 
    tr({},
        td({}, car.id),
        td({}, car.make.charAt(0).toUpperCase() + car.make.slice(1)),
        td({}, car.model.charAt(0).toUpperCase() + car.model.slice(1)),
        td({}, car.bodyType.charAt(0).toUpperCase() + car.bodyType.slice(1)),
        td({}, `${car.numberOfSeats}`),
        td({}, car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)),
        td({}, `$/${car.rentalPrice}/day`),
        td({}, button({ className: 'action edit' }, 'Edit'), button({ className: 'action delete' }, 'Delete')),
    )
    return row;
}

async function onSubmit(tableManager: Table,{ make, model, bodyType, numberOfSeats, transmission, rentalPrice, rentedTo }) {
 
    if (Number.isNaN(Number(rentalPrice))) {
        throw new TypeError('rentalPrice must be a number');
    }
    if (Number.isNaN(Number(numberOfSeats))) {
        throw new TypeError('numberOfSeats must be a number');
    }

    const car = {
        make,
        model,
        bodyType,
        numberOfSeats: Number(numberOfSeats),
        transmission,
        rentalPrice: Number(rentalPrice),
        rentedTo,
    }
    const result = await carService.create(car);
    tableManager.add(result);
}


