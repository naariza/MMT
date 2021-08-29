import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Car } from 'src/app/Models/car';
import { User } from 'src/app/Models/user';
import { GLOBAL } from 'src/app/Services/global';
import { UserService } from 'src/app/Services/user.service';
import { VehiculoService } from 'src/app/Services/vehiculo.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
  providers: [UserService,VehiculoService]
})
export class CarEditComponent implements OnInit {
  public titulo: string;
  public car: Car;
  public user: User;
  public identity;
  public token;
  public alertMessage;
  public url: string;
  constructor(
    private _userService: UserService,
    private _carSevice: VehiculoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.titulo = 'Cargar Archivos del Vehiculo';
    this.user = this.identity;
    this.car = new Car('',false,'','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','');

    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getCar();
  }
  getCar() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._carSevice.getCar(this.token, id).subscribe(
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
    });
  }
  onSubmit() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._carSevice.updateCar(this.token, id, this.car).subscribe(
        (response: any) => {
          this.car = response.car;
          if (!response.car) {
            this.alertMessage = 'Error en el servidor';
          } else {

            if (!this.filesToUpload) {
              this._router.navigate(['/navegador']);
            } else {
              //Subir la imagen del vehiculo
              this.makeFileRequest(this.url + "upload-image-car/" + this.car._id, [], this.filesToUpload).then(
                (result: any) => {
                  this.car.image = result.image;
                },
                error => {
                  console.log(error);
                }

              );
              this.alertMessage = 'El vehiculo se ha actualizado correctamente';
              this._router.navigate(['cars/1']);
            }
          }
        },
        error => {
          var errorMessage = <any>error;
          var body = error.error.message;
          if (errorMessage != null) {
            this.alertMessage = body;
            console.log(error);
          }
        }

      );
    });
  }
  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;

  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    var token = this.token;
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {

            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }

}
