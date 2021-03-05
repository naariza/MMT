import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsociadosComponent } from './pages/asociados/asociados.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { HeaderComponent } from './share/header/header.component';

const appRoutes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Nosotros',component:NosotrosComponent},
  {path:'Nuestros-Servicios',component:ServiciosComponent},
  {path:'Contactanos',component:ContactanosComponent},
  {path:'Asociados',component:AsociadosComponent},
  {path:'Login',component:LoginComponent},
  {path:'**',component:HomeComponent},
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);