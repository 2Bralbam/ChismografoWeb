import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {
  categoryId = '';
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['id'];
    });
  }
  public AgregarProducto(){
    let product = this.GetProductoData();
    console.log(product);
    this.http.post('https://api.escuelajs.co/api/v1/products', product).subscribe(data => {
      console.log(data);
      
    });
    this.router.navigate(['']);
  }
  public GetProductoData(){
    let title = document.getElementById('titleInput') as HTMLInputElement;
    let price = document.getElementById('priceInput') as HTMLInputElement;
    let description = document.getElementById('descriptionInput') as HTMLInputElement;
    let images = document.getElementById('imageInput') as HTMLInputElement;
    let product = {
      title: title.value,
      price: parseFloat(price.value)??0,
      description: description.value,
      categoryId: parseInt(this.categoryId),
      images: images.value.split(',')
    };
    return product;
  }
}
