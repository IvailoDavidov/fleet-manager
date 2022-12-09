export class Table {
    public element: HTMLTableElement;
    private records: any[] = [];
    private rows: Map<object, HTMLTableRowElement> = new Map();

    constructor(
        element: HTMLTableElement,
        private createRow: (record: any) => HTMLTableRowElement,
        private identify?: (records: any[], id: any) => any,
        records?: any[]
    ) {

        this.element = element;
        if (records) {
            this.records = records;
        }
        this.records.forEach((el) => this.add.bind(el));
    }

    add(record: any) {
        const row = this.createRow(record);
        this.element.appendChild(row);
        this.records.push(record);
        this.rows.set(record, row);
    }

    get(id: any): any {
        if (typeof this.identify != 'function') {
            throw new ReferenceError('Identity function not specified');
        }
        const result = this.identify(this.records, id);
        return result;
    }

    getRow(id: any): HTMLTableRowElement {
        const record = this.get(id);
        return this.rows.get(record);
    }

    replace(id: any, newRecord: any) {
        const record = this.get(id);
        const index = this.records.findIndex(r => r == record);
        const row = this.getRow(id);

        const newRow = this.createRow(newRecord);
        row.replaceWith(newRow);
        this.rows.set(record, newRow);

        this.records.splice(index, 1, newRecord);
    }

    remove(id: string): void {

        const record = this.get(id);
        const recordIndex = this.records.findIndex(r => r.id == id);
        const row = this.getRow(id);
        row.remove();
        this.rows.delete(record);
        this.records.splice(recordIndex, 1)
    }
}