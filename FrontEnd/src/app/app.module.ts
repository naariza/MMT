import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing,appRoutingProviders} from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { HeaderComponent } from './share/header/header.component';
import { BodyComponent } from './share/body/body.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { AsociadosComponent } from './pages/asociados/asociados.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    HeaderComponent,
    BodyComponent,
    HomeComponent,
    ContactanosComponent,
    FooterComponent,
    NosotrosComponent,
    ServiciosComponent,
    AsociadosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
