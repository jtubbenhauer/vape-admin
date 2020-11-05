export interface Supplier {
  name: string;
  flavours?: [{
    name: string,
    stock: number
  }]
}