import { Collection } from "./data/Collection";
import { LocalStorage } from "./data/LocalStorage";
import { TruckService } from "./data/TruckService";
import { td, tr, button } from "./dom/dom.";
import { Editor } from "./dom/Editor";
import { Table } from "./dom/Table";
import { Vehicle } from "./vehicle ";

export type CargoType = 'box' | 'flatbed' | 'van'

export class Truck implements Vehicle {
    public id: string;
    public make: string;
    public model: string;
    public cargoType: CargoType;
    public capacity: number;
    public rentalPrice: number;
    public rentedTo: string;

    constructor(
        id: string,
        make: string,
        model: string,
        cargoType: CargoType,
        capacity: number,
        rentalPrice: number,
        rentedTo: string,
    ) {
        this.id = id,
            this.make = make,
            this.model = model;
        this.cargoType = cargoType;
        this.capacity = capacity;
        this.rentalPrice = rentalPrice;
        this.rentedTo = rentedTo;
    }
}

const truckStorage = new LocalStorage();
const truckCollection = new Collection(truckStorage, 'trucks');
const truckService = new TruckService(truckCollection);

const newSection = document.getElementById('new section');
const editSection = document.getElementById('edit section');

const newTruckForm = document.getElementById('new-truck') as HTMLFormElement;
const editTruckForm = document.getElementById('edit-truck') as HTMLFormElement;

const table = document.querySelector(".overview") as HTMLTableElement;
const tableManager = new Table(table, createTruckRow, identifyTruck)

document.getElementsByClassName('action new')[0].addEventListener('click', onSwitchTableForms);

const newTruckEditor = new Editor(newTruckForm, onSubmit.bind(null, tableManager),
    [
        'make',
        'model',
        'cargoType',
        'capacity',
        'rentalPrice',
        'rentedTo',
    ]);

const editTruckEditor = new Editor(editTruckForm, onEdit.bind(null, tableManager),
    [
        'id',
        'make',
        'model',
        'cargoType',
        'capacity',
        'rentalPrice',
        'rentedTo',
    ]);

editTruckEditor.remove();
tableManager.element.addEventListener('click', onSwitchTableForms);

hidrate(tableManager);

function onSwitchTableForms(event: MouseEvent) {
    if (event.target instanceof HTMLButtonElement) {
        if (event.target.className == 'action edit') {

            newTruckEditor.remove();
            editTruckEditor.attachTo(editSection)
            const recordId = event.target.parentElement.parentElement.dataset.id
            const record = tableManager.get(recordId);
            editTruckEditor.setValues(record);

        } else if (event.target.className == 'action delete') {
            onDelete(event.target, tableManager);
        } else if (event.target.className == 'action new') {
            editTruckEditor.remove();
            newTruckEditor.attachTo(newSection);
        } 
    }
}


async function hidrate(tableManager: Table) {
    const trucks = await truckService.getAll();

    for (let truck of trucks) {
        tableManager.add(truck);
    }
}

function identifyTruck(trucks: Truck[], id: string) {
    return trucks.find(t => t.id == id);
}

function createTruckRow(truck: Truck) {
    const row =
        tr({ dataId: truck.id },
            td({}, truck.id),
            td({}, truck.make.charAt(0).toUpperCase() + truck.make.slice(1)),
            td({}, truck.model.charAt(0).toUpperCase() + truck.model.slice(1)),
            td({}, truck.cargoType.charAt(0).toUpperCase() + truck.cargoType.slice(1)),
            td({}, `${truck.capacity} tons`),
            td({}, `$/${truck.rentalPrice}/day`),
            td({}, button({ className: 'action edit' }, 'Edit'), button({ className: 'action delete' }, 'Delete')),
        )
    return row;
}

async function onSubmit(tableManager: Table, { make, model, cargoType, capacity, rentalPrice, rentedTo }) {

    if (Number.isNaN(Number(rentalPrice))) {
        throw new TypeError('rentalPrice must be a number');
    }
    if (Number.isNaN(Number(capacity))) {
        throw new TypeError('capacity must be a number');
    }

    const truck = {
        make,
        model,
        cargoType,
        capacity: Number(capacity),
        rentalPrice: Number(rentalPrice),
        rentedTo,
    }
    const result = await truckService.create(truck);
    tableManager.add(result);
    newTruckForm.reset();
}

async function onEdit(tableManager: Table, { id, make, model, cargoType, capacity, rentalPrice, rentedTo }) {
    capacity = Number(capacity);
    rentalPrice = Number(rentalPrice);

    const result = await truckService.update(id, { make, model, cargoType, capacity, rentalPrice, rentedTo });
    tableManager.replace(id, result);

    editTruckEditor.remove();
    newTruckEditor.attachTo(newSection)
}

async function onDelete(target: HTMLButtonElement, tableManager: Table) {
    const recordId = target.parentElement.parentElement.dataset.id;
    tableManager.remove(recordId);
    truckService.delete(recordId);
}
