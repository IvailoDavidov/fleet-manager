import { Record } from "./IStorage";

export interface ICollection {
    
    getAll(): Promise<Record[]>;
    getById(id: string): Promise<Record>;
    create(data: any): Promise<Record>;
    update(id: string, data: any): Promise<Record>;
    delete(id: string): Promise<void>
}