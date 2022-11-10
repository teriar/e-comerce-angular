import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { CoffeServiceService } from '../coffeService/coffe-service.service';
import { Carro, productoComercial } from '../interfaces/carro.interfaces';
import { Categoria, Categorias } from '../interfaces/categorias.interfaces';
import { Producto } from '../interfaces/coffe.interfaces';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {
  
  arrProductosCompletos !: Producto[];
  arrProductos!: Producto[];
  carro!: Carro | any;
  editar: boolean = false;
  categorias!: Categoria[];
  constructor(private confirmationService: ConfirmationService, private coffeService: CoffeServiceService, private messageService: MessageService) { }

  ngOnInit(): void {



    this.carro = localStorage.getItem('carro');
     //obtener los productos desde api 
    this.coffeService.getProductos()
      .subscribe(data =>{
         this.arrProductos = data.productos.filter(producto => producto.disponible = true)
         this.arrProductosCompletos =data.productos.filter(producto => producto.disponible = true)
        })


         //validar el tipo de usuario
    if (localStorage.getItem('token') && localStorage.getItem('rol')) {
       //si es admin
      const rol = localStorage.getItem('rol');
      if (rol == 'ADMIN_ROLE') {
        localStorage.removeItem('carro');
        this.editar = true;
        //si es usuario normal y hay carro
      } else if (localStorage.getItem('carro')) {
        let carro: Carro = JSON.parse(localStorage.getItem('carro')!)
        console.log(carro);
        carro.usuario = (localStorage.getItem('id')!);
        localStorage.setItem('carro', JSON.stringify(carro));
      } else {
         //si es usuario normal y no hay carro
        const id = localStorage.getItem('id');
        this.coffeService.crearCarro(id!);
      }

    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
    }

    //obtener categorias
    this.coffeService.getCategorias().subscribe(data => this.categorias = data.categorias)



  }




  mensaje(producto: Producto) {

    if (!localStorage.getItem('carro')) {
      this.confirmationService.confirm({
        message: 'Iniciar session o continue como invitado?',
        accept: () => {
          console.log('me quiero logear')
          return
        },
        reject: (type: any) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              const productoCreado: productoComercial = {
                id: producto._id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1
              }
              this.coffeService.crearCarro('invitado', productoCreado)
              break;
            case ConfirmEventType.CANCEL:
              return;
              break;
          }
        },
      });
    }
    if (localStorage.getItem('carro')) {
      
      const productoConvertido = this.convertirComercial(producto)
      this.coffeService.agregarAlCarro(productoConvertido);
      this.messageService.add({ key: 'agregado', severity: 'success', summary: 'Agregado', detail: `Se a agregado:${producto.nombre}` })
      setTimeout(() => {
        this.messageService.clear('agregado');
      }, 2000);

    } else {
      return
    }

  }


  convertirComercial(producto: Producto): productoComercial {

    const productoComercial: productoComercial = {
      id: producto._id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    }

    return productoComercial;

  }


  porCategoria(item:string){
    
   this.arrProductos = this.arrProductosCompletos.filter(producto => producto.categoria.nombre === item);
    
    if(item ==='TODOS'){
    this.arrProductos = this.arrProductosCompletos
    
    }
  }



}


