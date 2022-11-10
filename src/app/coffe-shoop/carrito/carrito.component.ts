import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CoffeServiceService } from '../coffeService/coffe-service.service';
import { Carro, productoComercial } from '../interfaces/carro.interfaces';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styles: [
  ]
})
export class CarritoComponent implements OnInit {

carro !:Carro;
 @Input() cargar=0;


  constructor(private coffeServices:CoffeServiceService) { }

  ngOnChanges(changes: SimpleChanges) {
    if(localStorage.getItem('carro')){
      this.carro  = JSON.parse(localStorage.getItem('carro')! ) ;
     
    }
  }

  ngOnInit(): void {
    
    
    if(localStorage.getItem('carro')){
      this.carro  = JSON.parse(localStorage.getItem('carro')! ) ;
      
    }
  }

  eliminarProducto(producto:productoComercial){
    
    this.coffeServices.eliminarProducto(producto);
    this.carro =JSON.parse(localStorage.getItem('carro')! ) ;
  }

  

  

}
