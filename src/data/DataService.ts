import { IService } from "./IService";
import { ICollection } from "./ICollection";
import { Record } from "./IStorage";

export abstract class DataService<T, TData> implements IService<T, TData>{

    protected collection: ICollection;

    constructor(collection: ICollection) {
        this.collection = collection;
    }

    async getAll(): Promise<T[]> {
        const records = (await this.collection.getAll()).map(r => this.parseRecord(r));
        return records;
    }
    async getById(id: string): Promise<T> {
        const record = this.parseRecord(await this.collection.getById(id));
        return record;
    }
    async create(data: TData): Promise<T> {
        this.validate(data);
        const newRecord = await this.collection.create(data);
        return this.parseRecord(newRecord);
    }
    async update(id: string, data: TData): Promise<T> {
        this.validate(data);
        const recordToUpdate = await this.collection.update(id, data);
        return this.parseRecord(recordToUpdate);
    }
    async delete(id: string): Promise<void> {
        return this.collection.delete(id);
    }

    protected abstract parseRecord(record: Record): T

    protected abstract validate(data: any): void
}