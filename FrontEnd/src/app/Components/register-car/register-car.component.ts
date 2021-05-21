import { Component, OnInit } from '@angular/core';
import { UserService } from "../../Services/user.service";
import { Car } from "../../Models/car";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GLOBAL } from 'src/app/Services/global';
import { VehiculoService } from 'src/app/Services/vehiculo.service';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.css']
})
export class RegisterCarComponent implements OnInit {
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public titulo: string;
  public car_register: Car;
  public filesToUpload: Array<File>;
  constructor(
    private _carService: VehiculoService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.url = GLOBAL.url;
    this.car_register = new Car('','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','');
    this.titulo = "Registrar Vehiculo"
  }


  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  onSubmit() {
    this._carService.register(this.token,this.car_register).subscribe(
      response => {
        let car = response.car;
        this.car_register = car;
 
        if (!car._id) {
          this.alertMessage = 'Error al registr el auto';
        } else {
          this.alertMessage = 'El registro del vehiculo '+this.car_register.clase+' se realizo corecctamente';
          this.car_register = new Car('','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'null', 'null','');

          this._router.navigate(['/edit-car', response.car._id]);
        }
        if(response.car._id){
          this._router.navigate(['/edit-car',response.car._id]);
        }else{
          this._router.navigate(['/navegador']);
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = error.error.message;
          this.alertMessage = body;
          console.log(error);
        }
      }
    );
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;

  }

}
