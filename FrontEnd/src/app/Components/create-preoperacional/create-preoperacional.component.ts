import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Car } from 'src/app/Models/car';
import { Formulario } from 'src/app/Models/formulario';
import { Preoperacional } from 'src/app/Models/preoperacional';
import { User } from 'src/app/Models/user';
import { FormularioService } from 'src/app/Services/formulario.service';
import { PreoperacionalService } from 'src/app/Services/preoperacional.service';
import { UserService } from 'src/app/Services/user.service';
import { VehiculoService } from 'src/app/Services/vehiculo.service';
import { FormularioComponent } from '../formulario/formulario.component';
import { formatDate } from "@angular/common";

// let dateFormat = require("dateformat");
// let now = new Date();
// dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");

@Component({
  selector: 'app-create-preoperacional',
  templateUrl: './create-preoperacional.component.html',
  styleUrls: ['./create-preoperacional.component.css'],
  providers: [UserService, VehiculoService, FormularioService]

})
export class CreatePreoperacionalComponent implements OnInit {

  public identity;
  public token;
  public cars: Car;
  public formulario: Formulario;
  public preoperacional: Preoperacional;
  public recorrido: number;
  public respuestas: Array<any>;
  public alertMessage;
  public today= new Date();
  public fecha = '';
  constructor(
    private _userService: UserService,
    private _formService: FormularioService,
    private _preService: PreoperacionalService,
    private _carService:VehiculoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
     this.fecha = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US');
    console.log(this.fecha)
    this.formulario = new Formulario('', '', '', '', '', '');
    this.cars = new Car('',false,'','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','')
    this.preoperacional = new Preoperacional('', null, this.fecha, '','','','');
    this.respuestas = [];
    
  }

  ngOnInit(): void {
    this.getCar();
    this.getForm();
  }
  getRecorrido(start, end) {
    this.recorrido = end - start;
  }
  getCar() {
    this._route.params.forEach((params: Params) => {
        let car = params.car
        this._carService.getCars(this.token, car).subscribe(
            (response: any) => {

                if (!response.car) {
                    this._router.navigate(['/']);
                } else {

                    this.cars = response.car;
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
  getForm() {
    this._route.params.forEach((params:Params)=>{
      var car = params.car
      this._formService.getForm(this.token, car).subscribe(
      (response: any) => {
        this.formulario = response.formulario;
        if (!response.formulario) {
          this._router.navigate(['/']);
        } else {
          this.formulario = response.formulario[0];
          this.formulario.preguntas.forEach(item => {
            let datos = {
              pregunta: item.pregunta,
              descripcion: item.descripcion,
              valor: 3,
              otros: false
            }
            if (item.otros) {
              datos.otros = true;
            }
            this.respuestas.push(datos);
          });
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
    })
    

  }
  guardarPreoperacional() {
    this._route.params.forEach((params: Params) => {
      let driver = params.driver;
      let form = params.form;
      let carId = params.car;
      this.preoperacional.driver = driver;
      this.preoperacional.formulario = form;
      this.preoperacional.car=carId;
      this.preoperacional.respuestas = this.respuestas;
      this.cars.status=true;
      this._carService.updateCar(this.token,carId,this.cars).subscribe(
        (response:any)=>{
          
          if (!response.car) {
            this.alertMessage = 'Error en el servidor';
          } else {
            this.alertMessage = 'El vehiculo se ha actualizado correctamente';
            this.cars=response.car
          }
        },
        error=>{
          var errorMessage = <any>error;
          var body = error.error.message;
          if (errorMessage != null) {
            this.alertMessage = body;
            console.log(error);
          }
        }
      )
      this._preService.savePreo(this.token, this.preoperacional).subscribe(
        (response: any) => {
          let preoperacional = response.preoperacional;

          if (!preoperacional._id) {
            this.alertMessage = 'Error al crear el Formulario';
          } else {
            this.alertMessage = 'El registro del formulario del vehiculo ' + this.cars._id + ' se realizo corecctamente';
           }
           this._router.navigate(['/get-car/1']);      

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

    })
  }

  darRespuesta(pre, res) {
    pre.valor = res;
    pre.otros = false;
    this.respuestas.forEach(function (elemento, indice, array) {
      if (elemento.pregunta == "Otros ¿Cuáles?" && pre.valor == elemento.valor) {
        pre.valor = res;
        pre.otros = res == 1 ? true : false;
      }
    });
  }
}
