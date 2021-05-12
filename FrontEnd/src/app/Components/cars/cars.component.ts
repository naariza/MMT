import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Car } from 'src/app/Models/car';
import { GLOBAL } from 'src/app/Services/global';
import { UserService } from 'src/app/Services/user.service';
import { VehiculoService } from 'src/app/Services/vehiculo.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  providers:[UserService,VehiculoService]
})
export class CarsComponent implements OnInit {
  public titulo: string;
  public cars: Car[];
  public identity;
  public token;
  public url:string;
  public next_page;
  public prev_page;
  constructor(
      private _route:ActivatedRoute,
      private _router:Router,
      private _userService:UserService,
      private _carService:VehiculoService
  ){
  this.titulo= 'Vehiculos';
  this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();
  this.url = GLOBAL.url;
  this.next_page=1;
  this.prev_page=1;
  }
  ngOnInit(){
    this.getCar();
  }
  getCar(){
    this._route.params.forEach((params:Params)=>{
        let page = +params['page'];
        if(!page){
            page = 1;
        }else{
            this.next_page=page+1;
            this.prev_page=page-1;

            if(this.prev_page == 0){
                this.prev_page=1;
            }
        }
        this._carService.getCars(this.token,page).subscribe(
            (response: any) => {
                if (!response.cars) {
                    this._router.navigate(['/']);
                } else {
                    this.cars = response.cars;
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
        )
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
            this.getCar();
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
