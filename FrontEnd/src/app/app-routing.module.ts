import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { LoginComponent } from "./Components/login/login.component";
import { MainComponent } from './Components/main/main.component';
import { HomeComponent } from "./Components/home/home.component";
import { UserEditComponent } from "./Components/user-edit/user-edit.component";
import { RegisterUserComponent } from "./Components/register-user/register-user.component";
import { DriversComponent } from "./Components/drivers/drivers.component";
import { RegisterCarComponent } from "./Components/register-car/register-car.component";
import { CarEditComponent } from "./Components/car-edit/car-edit.component";
import { CarsComponent } from "./Components/cars/cars.component";
import { PreoperacionalComponent } from "./Components/preoperacional/preoperacional.component";
import { CreatePreoperacionalComponent } from "./Components/create-preoperacional/create-preoperacional.component";
import { FormularioComponent } from "./Components/formulario/formulario.component";

const routes: Routes = [
  {path:'', component:MainComponent},
  {path:'login-Admin', component:LoginComponent},
  {path:'login-User', component:LoginComponent},
  {path:'navegador', component:HomeComponent},
  {path:'edit-user/:id', component:UserEditComponent},
  {path:'register-user', component:RegisterUserComponent},
  {path:'cars/:page', component:CarsComponent},
  {path:'register-car', component:RegisterCarComponent},
  {path:'edit-car/:id', component:CarEditComponent}, 
  {path:'get-drivers', component:DriversComponent},  
  {path:'preoperacional', component:PreoperacionalComponent}, 
  {path:'create-preoperacional/:driver/:form', component:CreatePreoperacionalComponent},
  {path:'formulario', component:FormularioComponent}, 
  {path:'**', component:MainComponent}
];


export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

