export interface IService<T, TData> {

    getAll(): Promise<T[]>
    getById(id: string): Promise<T>
    create(data: TData): Promise<T>
    update(id: string, data: TData): Promise<T>
    delete(id: string): Promise<void>
}