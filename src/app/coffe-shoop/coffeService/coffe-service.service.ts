import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carro, productoComercial } from '../interfaces/carro.interfaces';
import { Categorias } from '../interfaces/categorias.interfaces';
import { Producto, Productos } from '../interfaces/coffe.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CoffeServiceService {

//  baseUrl:string='https://rest-servergfu.herokuapp.com';
    baseUrl:string = environment.restcoffe
   
 private header!: HttpHeaders;
 private carro!:Carro;
 public logeo: boolean = false;
  constructor(private http:HttpClient) { }

//llamadas
  getProductos():Observable<Productos>{
   return this.http.get<Productos>(`${this.baseUrl}/api/productos`);
  }
  getProducto(id:string):Observable<Producto>{
    return this.http.get<Producto>(`${this.baseUrl}/api/productos/${id}`);
  }
  getCategorias():Observable<Categorias>{
    return this.http.get<Categorias>(`${this.baseUrl}/api/categorias`);
  }
  
 putProducto(id:string , data:any):Observable<any>{
 
  
  const token = localStorage.getItem('token')!;
  
   const headers ={'x-token': token}
   return this.http.put<any>(`${this.baseUrl}/api/productos/${id}`,data,{ headers})
  
 }
//actualizar o crear imagen
 putImagenProducto(id:string, data:FormData):Observable<any>{
   return this.http.put(`${this.baseUrl}/api/uploads/productos/${id}`,data)
 }

 //generar Nuevo Producto
 nuevoProducto(body:any):Observable<any>{
  const token = localStorage.getItem('token')!;
  const headers ={'x-token': token}
   return this.http.post(`${this.baseUrl}/api/productos`,body, {headers});
 }

deleteProducto(id:string):Observable<any>{
  const token = localStorage.getItem('token')!;
  const headers ={'x-token': token}
  return this.http.delete(`${this.baseUrl}/api/productos/${id}`,{headers})
}



  //crear carro 
    crearCarro(usuario:string,Producto?:productoComercial ):void{
     debugger;
     if(localStorage.getItem('token')){
      this.logeo =true
     }
      if (this.logeo){
            this.carro = {
              usuario:usuario,
              productos:[],
              total:0
            }
      } else{
      this.carro ={
          usuario: usuario,
          productos:[
                    {
                    id:Producto!.id,
                    nombre:Producto!.nombre,
                    precio:Producto!.precio,
                    cantidad:Producto!.cantidad
                     }
                     ],
          total: Producto!.precio           
          }
        }
          
          localStorage.setItem('carro', JSON.stringify(this.carro));
    }
      

//agregar al carro
   agregarAlCarro(producto:productoComercial):void{
    this.carro = JSON.parse(localStorage.getItem('carro')!) || {};
        
    this.cargarProducto(producto);  
    this.carro = this.calcularPrecio(this.carro);
   localStorage.setItem('carro',JSON.stringify(this.carro));

   }

 private cargarProducto(producto:productoComercial):void{
   const existeEnCarro:productoComercial | any  = this.carro.productos.find(elemento => elemento.nombre ===producto.nombre)
      
   if(existeEnCarro){
     const indice =  this.carro.productos.findIndex(elemento => elemento.nombre === existeEnCarro.nombre);
     this.carro.productos[indice].cantidad = existeEnCarro.cantidad + 1       
   }else{
    this.carro.productos.push(producto);
   }   
 }

 private calcularPrecio(carro:Carro):Carro{
     
  let valor:number = 0

  carro.productos.forEach(producto => {
       
   valor = valor + producto.cantidad * producto.precio;
     
  });

  carro.total  = valor;
  return carro;
 }

eliminarProducto(producto:productoComercial):void{
  this.carro = JSON.parse(localStorage.getItem('carro')!) ||{};
  const indice =  this.carro.productos.findIndex(elemento => elemento.nombre === producto.nombre);
 debugger;
 this.carro.productos[indice].cantidad =   this.carro.productos[indice].cantidad -1 ;
 if(this.carro.productos[indice].cantidad <= 0){
  this.carro.productos.splice(indice,1);
 }
this.carro = this.calcularPrecio(this.carro);
localStorage.setItem('carro',JSON.stringify(this.carro));
}


validarImagen(nombre:string){
  const extensiones = ['jpg','png'];
  const nombreCortado = nombre.split('.');
  const extension = nombreCortado[nombreCortado.length-1];

 if (extensiones.includes(extension)){
  return true;
 }
 return false
}





}

