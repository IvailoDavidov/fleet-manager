import { generateId } from "../utils";
import { IStorage, Record } from "./IStorage";

export class LocalStorage implements IStorage {

    async getAll(collectionName: string): Promise<Record[]> {
        return JSON.parse(localStorage.getItem(collectionName) || null) || [];
    }
    async getById(collectionName: string, id: string): Promise<Record> {
        const item = (await this.getAll(collectionName)).find(r => r.id == id);

        return item;
    }
    async create(collectionName: string, data: any): Promise<Record> {
        const items = await this.getAll(collectionName);
        const generatedId = generateId();
        const record = Object.assign({}, data, { id: generatedId });
        items.push(record);
        localStorage.setItem(collectionName, JSON.stringify(items));

        return record;
    }
    async update(collectionName: string, id: string, data: any): Promise<Record> {
        const items = await this.getAll(collectionName);
        const index = items.findIndex(r => r.id == id);
        if (index == -1) {
            throw new ReferenceError(`Record ${id} not found in ${collectionName}`);
        }
        const record = Object.assign({}, data, { id: id });
        items[index] = record;
        localStorage.setItem(collectionName, JSON.stringify(items));

        return record;
    }
    async delete(collectionName: string, id: string): Promise<void> {
        const items = await this.getAll(collectionName);
        const index = items.findIndex(r => r.id == id);
        if (index == -1) {
            throw new ReferenceError(`Record ${id} not found in ${collectionName}`);
        }
        items.splice(index, 1);
        localStorage.setItem(collectionName, JSON.stringify(items));
    }
}