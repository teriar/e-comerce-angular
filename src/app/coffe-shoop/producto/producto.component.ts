import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CoffeServiceService } from '../coffeService/coffe-service.service';
import { Categorias } from '../interfaces/categorias.interfaces';
import { Producto, Productos } from '../interfaces/coffe.interfaces';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [`
  `]
})


export class ProductoComponent implements OnInit {

  //traer productos
  producto!: Producto;
  // trae categorias
  categorias!: any;

  NuevoProducto: boolean = true;

  //iniciacion de formularios
  formulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: ['1', [Validators.min(1)]],
    categoria: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    imagen: ['',],
    habilitado: [true]
  })

  //imagen a recibir 
  imagen: FormData = new FormData();
  //existe imagen
  existeImg: boolean = false;

  constructor(private activedRouted: ActivatedRoute
    , private coffeService: CoffeServiceService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {


    if (this.router.url.includes('producto')) {
      this.NuevoProducto = false;

      //obtener data del producto
      this.activedRouted.params
        .pipe(
          switchMap(({ id }) => this.coffeService.getProducto(id))
        ).subscribe(data => {
          this.producto = data

          this.formulario?.setValue({
            nombre: this.producto?.nombre,
            precio: this.producto?.precio,
            categoria: this.producto?.categoria?._id,
            descripcion: this.producto?.descripcion,
            imagen: '',
            habilitado: this.producto?.disponible

          })

        })

    }

    //obtener categorias
    this.coffeService.getCategorias().subscribe(data => this.categorias = data)

  }

  campoNoValido(campo: string) {
    return this.formulario.get(campo)?.invalid
      && this.formulario.get(campo)?.touched;
  }


  capturaImagen(evento: any) {

    const imagenRecibida = evento.target?.files[0];

    if (!this.coffeService.validarImagen(imagenRecibida.name)) {

      this.formulario.controls['imagen'].reset();
      return;
    }
    this.imagen.append('archivo', imagenRecibida);
    this.existeImg = true;

  }


  enviarFormulario() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const data = this.formulario.value;
    if (this.router.url.includes('producto')) {

      this.coffeService.putProducto(this.producto._id, data).subscribe(resp => {

        if (this.existeImg) {
          this.coffeService.putImagenProducto(this.producto._id, this.imagen).subscribe(resp => this.router.navigate(['/listado']),
           error => { localStorage.clear; this.router.navigate(['/login'])})

        } else {
          this.router.navigate(['/listado'])
        }
      },
        error => {
          localStorage.clear();
          this.router.navigate(['/login'])
        }
      );
    } else {
      if(!this.existeImg){ return;}
     
         this.coffeService.nuevoProducto(data).subscribe(resp => 
          this.coffeService.putImagenProducto(resp._id, this.imagen).subscribe(redirect=> 
            this.router.navigate(['/listado'])),
             error=> {
              localStorage.clear();
              this.router.navigate(['/login'])
            })
    }
      
  }


  eliminarProducto(){
            this.coffeService.deleteProducto(this.producto._id).subscribe(resp=>{this.router.navigate(['/listado']) })
  }

}
