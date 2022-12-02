export type Record = {
    id: string;
}

export interface IStorage {
    
    getAll(collectionName: string): Promise<Record[]>;
    getById(collectionName: string, id: string): Promise<Record>;
    create(collectionName: string, data: any): Promise<Record>;
    update(collectionName: string, id: string, data: any): Promise<Record>;
    delete(collectionName: string, id: string): Promise<void>
}