import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { routing, appRoutingProviders } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { MainComponent } from './Components/main/main.component';
import { HomeComponent } from './Components/home/home.component';
import { VehiculoComponent } from './Components/vehiculo/vehiculo.component';
import { EquipoComponent } from './Components/equipo/equipo.component';
import { UserService } from './Services/user.service';
import { UserEditComponent } from './Components/user-edit/user-edit.component';
import { RegisterUserComponent } from './Components/register-user/register-user.component';
import { BubbleUserComponent } from './Components/bubble-user/bubble-user.component';
import { DriversComponent } from './Components/drivers/drivers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    VehiculoComponent,
    EquipoComponent,
    UserEditComponent,
    RegisterUserComponent,
    BubbleUserComponent,
    DriversComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    routing
  ],
  providers: [appRoutingProviders, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
