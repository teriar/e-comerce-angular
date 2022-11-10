export interface Carro{

usuario:string,
productos:productoComercial[],
total:number;

}


export interface productoComercial{

  id:string,
  nombre:string,
  precio:number,
  cantidad:number


}