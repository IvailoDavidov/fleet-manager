import { Car, carService } from "./cars";
import { href, td, tr } from "./dom/dom.";
import { Table } from "./dom/Table";
import { Truck, truckService } from "./trucks";
import { Vehicle } from "./vehicle ";


const overviewTable = document.querySelector(".overview") as HTMLTableElement;
const tableManager = new Table(overviewTable, createOverviewRow);

hidrate(tableManager);



async function hidrate(tableManager: Table) {

    const vehicles = await carService.getAll();
    const trucks = await truckService.getAll();

    overviewTable.replaceChildren();
    overviewTable.innerHTML =
        `<thead>
           <tr>
               <th>ID</th>
               <th>Type</th>
               <th>Make</th>
               <th>Model</th>
               <th>Rental Price</th>
               <th>Status</th>
               <th>Details</th>
           </tr>
        </thead>`;

    for (let car of vehicles) {
        tableManager.add(car);
    }

    for (let truck of trucks) {
        tableManager.add(truck);
    }
}

function createOverviewRow(vehicle: Vehicle) {
    let type = null;
    if (vehicle instanceof Car) {
        type = Car.name;
    } else if (vehicle instanceof Truck) {
        type = Truck.name;
    }
    const row =
        tr({ dataId: vehicle.id },
            td({}, vehicle.id),
            td({}, type),
            td({}, vehicle.make.charAt(0).toUpperCase() + vehicle.make.slice(1)),
            td({}, vehicle.model.charAt(0).toUpperCase() + vehicle.model.slice(1)),
            td({}, `$/${vehicle.rentalPrice}/day`),
            td({}, vehicle.rentedTo),
            td({}, href({ className: 'details-link', href: `/details.html?id=${vehicle.id}` }, 'Show Details')),
        )
    return row;
}



