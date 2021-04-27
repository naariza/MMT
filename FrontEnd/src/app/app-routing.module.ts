import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { LoginComponent } from "./Components/login/login.component";
import { MainComponent } from './Components/main/main.component';
import { HomeComponent } from "./Components/home/home.component";
import { UserEditComponent } from "./Components/user-edit/user-edit.component";
import { RegisterUserComponent } from "./Components/register-user/register-user.component";
import { DriversComponent } from "./Components/drivers/drivers.component";

const routes: Routes = [
  {path:'', component:MainComponent},
  {path:'login-Admin', component:LoginComponent},
  {path:'login-User', component:LoginComponent},
  {path:'navegador', component:HomeComponent},
  {path:'edit-user/:id', component:UserEditComponent},
  {path:'register-user', component:RegisterUserComponent},
  {path:'get-drivers/:page', component:DriversComponent},
  {path:'**', component:MainComponent}
];


export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

