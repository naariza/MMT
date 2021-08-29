import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { routing, appRoutingProviders } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { MainComponent } from './Components/main/main.component';
import { HomeComponent } from './Components/home/home.component';
import { VehiculoComponent } from './Components/vehiculo/vehiculo.component';
import { UserService } from './Services/user.service';
import { UserEditComponent } from './Components/user-edit/user-edit.component';
import { RegisterUserComponent } from './Components/register-user/register-user.component';
import { BubbleUserComponent } from './Components/bubble-user/bubble-user.component';
import { DriversComponent } from './Components/drivers/drivers.component';
import { RegisterCarComponent } from './Components/register-car/register-car.component';
import { CarEditComponent } from './Components/car-edit/car-edit.component';
import { CarsComponent } from './Components/cars/cars.component';
import { CreatePreoperacionalComponent } from './Components/create-preoperacional/create-preoperacional.component';
import { FormularioComponent } from './Components/formulario/formulario.component';
import { PreoperacionalesComponent } from './Components/preoperacionales/preoperacionales.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    VehiculoComponent,
    UserEditComponent,
    RegisterUserComponent,
    BubbleUserComponent,
    DriversComponent,
    RegisterCarComponent,
    CarEditComponent,
    CarsComponent,
    CreatePreoperacionalComponent,
    FormularioComponent,
    PreoperacionalesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [appRoutingProviders, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
