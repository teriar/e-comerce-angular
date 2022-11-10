import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoffeServiceService } from '../../coffeService/coffe-service.service';
import { Carro, productoComercial } from '../../interfaces/carro.interfaces';
import { Producto, Productos } from '../../interfaces/coffe.interfaces';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styles: [`
  img{
    width:250px;
    height:260px;
  }
  .padt-5{
    padding-top:5px;
  }
  .tarjeta{
    width:350px;
    height:500px;
  }
  `]
})
export class TarjetaComponent implements OnInit {
 
  @Input() Productos:Productos |any 
  @Input() editable:boolean= false;
  @Output() Comprar : EventEmitter<Producto> = new EventEmitter()
  
 carro!:Carro | any

  constructor() { }

  ngOnInit(): void {
   
   if(localStorage.getItem('carro') )
   {
    this.carro = localStorage.getItem('carro');
   }

  }


  mensaje(producto:Producto){
    this.Comprar.emit(producto);
    
    

  }
  
}
