import { Component, OnInit } from '@angular/core';
import { User } from "../../Models/user";
import { Car } from "../../Models/car";
import { UserService } from 'src/app/Services/user.service';
import { VehiculoService } from 'src/app/Services/vehiculo.service';
import { GLOBAL } from 'src/app/Services/global';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-preoperacional',
  templateUrl: './preoperacional.component.html',
  styleUrls: ['./preoperacional.component.css']
})
export class PreoperacionalComponent implements OnInit {
  public identity;
  public token;
  public url;
  public users:User[];
  public alertMessage;
  constructor(
    private _userService:UserService,
    private _carService:VehiculoService,
    private _route:ActivatedRoute,
    private _router:Router
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url= GLOBAL.url;
   }

  ngOnInit(): void {
  this.getUser()
  }
  getUser() {
    this._route.params.forEach(() => {
        let id = this.identity.car;
        this._userService.getDrivers(this.token, id).subscribe(
            (response: any) => {
                this.users = response.users;
                if (!response.users) {
                    this._router.navigate(['/']);
                } else {
                    this.users = response.users;
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
    });
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
            this.getUser();
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
