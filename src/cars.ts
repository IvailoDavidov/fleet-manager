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
const formContainer = document.getElementById('forms');

const newCarForm = document.getElementById('new-car') as HTMLFormElement;
const editCarForm = document.getElementById('edit-car') as HTMLFormElement;

const table = document.querySelector(".overview") as HTMLTableElement;
const tableManager = new Table(table, createCarRow, identifyCar)

const newCarEditor = new Editor(newCarForm, onSubmit.bind(null, tableManager),
    [
        'make',
        'model',
        'bodyType',
        'numberOfSeats',
        'transmission',
        'rentalPrice',
        'rentedTo',
    ]);

const editCarEditor = new Editor(editCarForm, onEdit.bind(null, tableManager),
    [
        'id',
        'make',
        'model',
        'bodyType',
        'numberOfSeats',
        'transmission',
        'rentalPrice',
        'rentedTo',
    ]);


editCarEditor.remove();
tableManager.element.addEventListener('click', onSwitchTableForms);

hidrate(tableManager);

function onSwitchTableForms(event: MouseEvent) {
    if (event.target instanceof HTMLButtonElement) {
        if (event.target.className == 'action-edit') {

            newCarEditor.remove();
            editCarEditor.attachTo(formContainer)
            const recordId = event.target.parentElement.parentElement.dataset.id
            const record = tableManager.get(recordId);
            editCarEditor.setValues(record);

        } else if (event.target.className == 'action-delete') {
            onDelete(event.target, tableManager);
        }
    }
}

async function hidrate(tableManager: Table) {
    const cars = await carService.getAll();

    for (let car of cars) {
        tableManager.add(car);
    }
}

function identifyCar(cars: Car[], id: string) {
    return cars.find(c => c.id == id);
}

function createCarRow(car: Car) {
    const row =
        tr({ dataId: car.id },
            td({}, car.id),
            td({}, car.make.charAt(0).toUpperCase() + car.make.slice(1)),
            td({}, car.model.charAt(0).toUpperCase() + car.model.slice(1)),
            td({}, car.bodyType.charAt(0).toUpperCase() + car.bodyType.slice(1)),
            td({}, `${car.numberOfSeats}`),
            td({}, car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)),
            td({}, `$/${car.rentalPrice}/day`),
            td({}, button({ className: 'action-edit' }, 'Edit'), button({ className: 'action-delete' }, 'Delete')),
        )
    return row;
}

async function onSubmit(tableManager: Table, { make, model, bodyType, numberOfSeats, transmission, rentalPrice, rentedTo }) {

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

async function onEdit(tableManager: Table, { id, make, model, bodyType, numberOfSeats, transmission, rentalPrice, rentedTo }) {
    numberOfSeats = Number(numberOfSeats);
    rentalPrice = Number(rentalPrice);

    const result = await carService.update(id, {make, model, bodyType, numberOfSeats, transmission, rentalPrice, rentedTo });
    //tableManager.add(result);
    tableManager.replace(id, result);

    editCarEditor.remove();
    newCarEditor.attachTo(formContainer)

}

async function onDelete(target: HTMLButtonElement, tableManager: Table) {
    const recordId = target.parentElement.parentElement.id;
    tableManager.remove(recordId);
    carService.delete(recordId);
}