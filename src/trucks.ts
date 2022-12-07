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

start();

async function start() {

    const newTruckForm = document.getElementById('new-truck') as HTMLFormElement;
    const table = document.querySelector(".overview") as HTMLTableElement;
    const tableManager = new Table(table, createTruckRow, identifyCar)

    const editor = new Editor(newTruckForm, onSubmit.bind(null, tableManager),
        [
            'make',
            'model',
            'cargoType',
            'capacity',
            'rentalPrice',
            'rentedTo',
        ]);

    hidrate(tableManager);
}



async function hidrate(tableManager: Table) {
    const trucks = await truckService.getAll();
    console.log(trucks);
    for (let truck of trucks) {
        tableManager.add(truck);
    }
}

function identifyCar(trucks: Truck[], id: string) {
    return trucks.find(t => t.id == id);
}


function createTruckRow(truck: Truck) {
    const row =
        tr({},
            td({}, truck.id),
            td({}, truck.make.charAt(0).toUpperCase() + truck.make.slice(1)),
            td({}, truck.model.charAt(0).toUpperCase() + truck.model.slice(1)),
            td({}, truck.cargoType.charAt(0).toUpperCase() + truck.cargoType.slice(1)),
            td({}, `$/${truck.capacity} tons`),
            td({}, `$/${truck.rentalPrice}/day`),
            td({}, button({ className: 'action edit' }, 'Edit'), button({ className: 'action delete' }, 'Delete')),
        )
    return row;
}

async function onSubmit(tableManager: Table, { make, model, cargoType, capacity, rentalPrice, rentedTo }) {

    if (Number.isNaN(Number(rentalPrice))) {
        throw new TypeError('rentalPrice must be a number');
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
}
