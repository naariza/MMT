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
  public fecha: any;
  public mes: any;
  public recorrido: number;
  public respuestas: Array<any>;
  public alertMessage;

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
    this.mes = new Date().getMonth() + 1;
    this.fecha = new Date().getFullYear() + '-' + '0' + this.mes + '-' + new Date().getDate();
    this.formulario = new Formulario('', '', '', '', '', '');
    this.cars = new Car('','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','')
    this.preoperacional = new Preoperacional('', '', null, null, '', this.recorrido, this.fecha, '','', '', '');
    this.respuestas = [];
  }

  ngOnInit(): void {
    this.getCar();
    this.getForm();
  }
  getRecorrido(start, end) {
    this.recorrido = end - start;
  }
  // getUser() {
  //   let id = this.identity._id;
  //   this._userService.getDriver(this.token, id).subscribe(
  //     (response: any) => {
  //       this.user = response.user;
  //       if (!response.user) {
  //         this._router.navigate(['/']);
  //       } else {
  //         this.user = response.user;
  //       }
  //     },
  //     error => {
  //       var errorMessage = <any>error;
  //       var body = error.error.message;
  //       if (errorMessage != null) {
  //         // this.alertMessage = body;
  //         console.log(error);
  //       }
  //     }

  //   );

  // }
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
      console.log(params)
      let driver = params.driver;
      let form = params.form;
      this.preoperacional.driver = driver;
      this.preoperacional.formulario = form;
      this.preoperacional.car=this.identity.car;
      this.preoperacional.respuestas = this.respuestas;
      this.preoperacional.kil_Total = this.recorrido;
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
