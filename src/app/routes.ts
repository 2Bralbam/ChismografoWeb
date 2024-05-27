import {Routes} from '@angular/router';
import { ProductoDetallesComponent } from './producto-detalles/producto-detalles.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { HomeComponent } from './home/home.component';
import { ProductoscategoriaComponent } from './productoscategoria/productoscategoria.component';
const routeConfig:Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home',
    },
    {
        path: 'categorias',
        component: ProductoscategoriaComponent,
        title: 'Productos por Categoria',
    },
    {
        path: 'producto',
        component: ProductoDetallesComponent,
        title: 'Detalles del Producto',
    },
    {
        path: 'agregar',
        component: AgregarProductoComponent,
        title: 'Agregar Producto',
    },
    {
        path: '**',
        redirectTo: '',
    }

];

export default routeConfig;