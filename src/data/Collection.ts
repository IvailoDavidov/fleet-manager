import { ICollection } from "./ICollection";
import { IStorage, Record } from "./IStorage";

export class Collection implements ICollection {
    private storage: IStorage;
    private name: string;

    constructor(storage: IStorage,name:string) {
        this.storage = storage;
        this.name = name;
    }

    async getAll(): Promise<Record[]> {
        return await this.storage.getAll(this.name);
    }
    async getById(id: string): Promise<Record> {
        return await this.storage.getById(this.name, id);
    }
    async create(data: any): Promise<Record> {
        return await this.storage.create(this.name, data);
    }
    async update(id: string, data: any): Promise<Record> {
        return await this.storage.update(this.name, id, data);
    }
    async delete(id: string): Promise<void> {
        return await this.storage.delete(this.name, id);
    }
}