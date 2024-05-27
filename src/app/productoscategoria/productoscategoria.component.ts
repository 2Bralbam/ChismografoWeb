import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-productoscategoria',
  standalone: true,
  imports: [HttpClientModule, NgFor, CommonModule],
  templateUrl: './productoscategoria.component.html',
  styleUrl: './productoscategoria.component.css'
})
export class ProductoscategoriaComponent implements OnInit {
  productos: Product[] = [];
  categoryId = '';
  /**
   *
   */
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    
  }
  public DescargarDatos(categoryId: string){
    this.http.get<Product[]>(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`).subscribe(data => {
      console.log(data);
      this.productos = data;
    });
    sessionStorage.setItem('categoryId', categoryId);
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const categoryId = params['id'];
      if (categoryId) {
        this.DescargarDatos(categoryId);
        this.categoryId = categoryId;
      }
    });
  }
}
