import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { LoginComponent } from "./Components/login/login.component";
import { MainComponent } from './Components/main/main.component';

const routes: Routes = [
  {path:'', component:MainComponent},
  {path:'login-Admin', component:LoginComponent},
  {path:'login-User', component:LoginComponent},
  {path:'**', redirectTo:''}
];


export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

