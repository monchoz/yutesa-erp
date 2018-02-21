export class Order {
    constructor (
        public customer: string,
        public date: string,
        public products: Array<any>
    ) { }
}