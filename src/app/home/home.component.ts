
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}
interface Categorias{
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  categorias:Categorias[] = [];
  productos: Product[] = [];
  constructor(private http: HttpClient) { }

  
  ngAfterViewInit() {
    
  }
  public DescargarDatos(){
    this.http.get<Categorias[]>('https://api.escuelajs.co/api/v1/categories').subscribe(data => {
      console.log(data);
      this.categorias = data;
    });

    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products').subscribe(data => {
      console.log(data);
      this.productos = data;
    });
    let scrollableCats = document.querySelectorAll('.scrollableCat');

    scrollableCats.forEach((scrollableCat: any) => {
      scrollableCat.addEventListener('wheel', function(this: HTMLElement, e: WheelEvent) {
        if (e.deltaY > 0) this.scrollLeft += 100;
        else this.scrollLeft -= 100;
        e.preventDefault();
      }, { passive: false });
    });
  }
  ngOnInit():void {
    this.DescargarDatos();
    
  }
}