import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-producto-detalles',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './producto-detalles.component.html',
  styleUrl: './producto-detalles.component.css'
})

export class ProductoDetallesComponent {
  Producto!: Product;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    
  }
  public DescargarDatos(productId: string){
    const ProductoAlmacenado = sessionStorage.getItem('categoryId');
    if (ProductoAlmacenado === productId) {
      this.Producto = JSON.parse(ProductoAlmacenado);
      return;
    }
    this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${productId}`).subscribe(data => {
      console.log(data);
      this.Producto = data;
      if(data === null || data === undefined){
        this.router.navigate(['']);
      }
    });
    sessionStorage.setItem('categoryId', productId);
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.DescargarDatos(productId);
      }
    });
  }
  public EliminarMethod(){
    this.ShowConfirmMessage();
  }
  public ShowConfirmMessage(){
    let confirmMessage = document.getElementById('confirmMessage') as HTMLDivElement;
    if(confirmMessage === null) return;
    if(confirmMessage.style.display === 'none'){
      confirmMessage.style.display = 'block';
    }
    else{
      confirmMessage.style.display = 'none';
    }
  }
  public HideConfirmMessage(){
    let confirmMessage = document.getElementById('confirmMessage') as HTMLDivElement;
    if(confirmMessage === null) return;
    confirmMessage.style.display = 'none';
  }
  public ConfirmarEliminarMethod(){
    let id = document.getElementById('idInput') as HTMLInputElement;
    if(id === null) return;
    this.http.delete(`https://api.escuelajs.co/api/v1/products/${id.value}`).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['']);
  }
  public EditarMethod(){
    let btnConfirmar = document.getElementById('btnConfirmar') as HTMLButtonElement;
    let title = document.getElementById('titleInput') as HTMLInputElement;
    let price = document.getElementById('priceInput') as HTMLInputElement;
    let description = document.getElementById('descriptionInput') as HTMLInputElement;
    let images = document.getElementById('imageInput') as HTMLInputElement;
    let id = document.getElementById('idInput') as HTMLInputElement;
    if(title === null || price === null || description === null || images === null || id === null) return;  
    if(title.disabled === false || price.disabled === false || description.disabled === false || images.disabled === false || id.disabled === false){
      title.disabled = true;
      price.disabled = true;
      description.disabled = true;
      images.disabled = true;
      id.disabled = true;
      return;
    }
    else{
      title.disabled = false;
      price.disabled = false;
      description.disabled = false;
      images.disabled = false;
      id.disabled = false;
    }

    
    if(btnConfirmar === null) return;
    if(btnConfirmar.style.display === 'none'){
      btnConfirmar.style.display = 'block';
    }
    else{
      btnConfirmar.style.display = 'none';
    }
  }
  public ConfirmarEditarMethod(){
    let title = document.getElementById('titleInput') as HTMLInputElement;
    let price = document.getElementById('priceInput') as HTMLInputElement;
    let description = document.getElementById('descriptionInput') as HTMLInputElement;
    let images = document.getElementById('imageInput') as HTMLInputElement;
    let id = document.getElementById('idInput') as HTMLInputElement;
    if(title === null || price === null || description === null || images === null || id === null) return;
    let categoryId = sessionStorage.getItem('categoryId');
    if(categoryId === null) return;
    let Producto = {
      id: parseInt(id.value),
      title: title.value,
      price: parseFloat(price.value),
      description: description.value,
      images: [images.value]
    };
    this.SendPutRequest(Producto);
    this.router.navigate(['']);
  }
  public SendPutRequest(Producto:any){
    console.log(Producto);
    this.http.put(`https://api.escuelajs.co/api/v1/products/${Producto.id}`, Producto).subscribe(data => {
      console.log(data);
    });
  }
}
