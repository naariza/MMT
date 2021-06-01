import { Component, OnInit } from '@angular/core';
import { User } from "../../Models/user";
import { Car } from "../../Models/car";
import { UserService } from 'src/app/Services/user.service';
import { VehiculoService } from 'src/app/Services/vehiculo.service';
import { GLOBAL } from 'src/app/Services/global';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormularioService } from 'src/app/Services/formulario.service';
import { Formulario } from 'src/app/Models/formulario';


@Component({
  selector: 'app-preoperacional',
  templateUrl: './preoperacional.component.html',
  styleUrls: ['./preoperacional.component.css']
})
export class PreoperacionalComponent implements OnInit {
  public identity;
  public token;
  public url;
  public car:Car;
  public formulario:Formulario;
  public alertMessage;
  constructor(
    private _userService:UserService,
    private _carService:VehiculoService,
    private _formService:FormularioService,
    private _route:ActivatedRoute,
    private _router:Router
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url= GLOBAL.url;
    this.car = new Car('','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','');
    this.formulario= new Formulario('','','','','','');
}

  ngOnInit(): void {
  this.getCar()
this.getForm();
  }
getCar(){
    let id = this.identity.car;
    this._carService.getCar(this.token, id).subscribe(
        (response: any) => {
            this.car = response.car;
            if (!response.car) {
                this._router.navigate(['/']);
            } else {
                this.car = response.car;
            }
        },
        error => {
            var errorMessage = <any>error;
            var body = error.error.message;
            if (errorMessage != null) {
                // this.alertMessage = body;
                console.log(error);
            }
        }

    );
}
getForm(){
    let id = this.identity.car;
            // debugger
            this._formService.getForm(this.token, id).subscribe(
                (response: any) => {
                    this.formulario = response.formulario;
                    if (!response.formulario) {
                        this._router.navigate(['/']);
                    } else {
                        this.formulario= response.formulario[0];
                    }
                },
                error => {
                    var errorMessage = <any>error;
                    var body = error.error.message;
                    if (errorMessage != null) {
                        // this.alertMessage = body;
                        console.log(error);
                    }
                }
    
            );
            
  }
public confirmado;
onDeleteConfirm(id){
    this.confirmado=id;

}
onCancelCar(){
    this.confirmado=null;
}
onDeleteCar(id){
    this._carService.DeleteCar(this.token, id).subscribe(
        (response: any) => {
            if (!response.cars) {
                alert("Error en el servido");
            } 
            // this.getUser();
        },
        error => {
            var errorMessage = <any>error;
            var body = error.error.message;
            if (errorMessage != null) {
                // this.alertMessage = body;
                console.log(error);
            }
        }
    );
}
}
