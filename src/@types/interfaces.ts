export interface IInventoryInner {
  StatTrak: boolean,
  color: string,
  imageUrl: string,
  index: number,
  price: number,
  property: string,
  skinId: number,
  skinTitle: string,
  type: string,
}

export interface IInventory {
  [index: number]: IInventoryInner
}