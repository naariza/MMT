import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Car } from 'src/app/Models/car';
import { Formulario } from 'src/app/Models/formulario';
import { FormularioService } from 'src/app/Services/formulario.service';
import { GLOBAL } from 'src/app/Services/global';
import { UserService } from 'src/app/Services/user.service';
import { VehiculoService } from 'src/app/Services/vehiculo.service';

@Component({
    selector: 'app-cars',
    templateUrl: './cars.component.html',
    styleUrls: ['./cars.component.css'],
    providers: [UserService, VehiculoService]
})
export class CarsComponent implements OnInit {
    public titulo: string;
    public cars: Car[];
    public identity;
    public token;
    public url: string;
    public carSelect: any;
    public formularioPreo:Formulario;
    public alertMessage;
    
    autorization=[];
    date:Date;
    zone:String;
    activity:String;
    authorize:String;
    modelo:String;
    clase:String;
    Placa:String;
    driver:String;
    formulario:FormGroup;
    

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _carService: VehiculoService,
        private formBuilder: FormBuilder,
        private _formService:FormularioService
    ) {
        this.titulo = 'Vehiculos';
        this.url = GLOBAL.url;
    }
    
    ngOnInit() {
        this.formulario = this.formBuilder.group({
            date:[new Date(),Validators.required],
            zone:['',Validators.required],
            activity:['',Validators.required],
            authorize:['',Validators.required],
        });
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.getCar();
    }
    getCar() {
        this._route.params.forEach((params: Params) => {
            let clase = params['clase']
            let driverId=params['id']
            this._carService.getCar(this.token, clase,driverId).subscribe(
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
                        this.alertMessage = body;
                    }
                }
            )
        });

    }
    
    addAuthorization(){
        console.clear();
        
        
         const loquesea =    {
             modelo:this.carSelect.modelo, 
             clase:this.carSelect.clase,
             placa:this.carSelect.placa,
             driver:this.identity.name,
             date:this.formulario.value.date,
             zone:this.formulario.value.zone,
             activity:this.formulario.value.activity,
             authorize:this.formulario.value.authorize   
            }
            
        this._carService.Authorization(this.token,loquesea).subscribe(
            (response:any) =>{
                this.getForm()
                this.formulario.reset()
            },
            error =>{
                var errorMessage = <any>error;
                var body = error.error.message;
                if (errorMessage != null) {
                    this.alertMessage = body;
                } 
            }
        )

    }
    public confirmado;
    onDeleteConfirm(id) {
        this.confirmado = id;

    }
    onCancelCar() {
        this.confirmado = null;
    }
    onDeleteCar(id) {
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
                    this.alertMessage = body;
                }
            }
        );
    }
    logout() {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        localStorage.clear();
        this.identity = null;
        this.token = null;
        this._router.navigate[('/')];
    }
    getForm(){
        let id = this.carSelect._id;
                this._formService.getForm(this.token, id).subscribe(
                    (response: any) => {
                        this.formularioPreo = response.formulario;
                        if (!response.formulario) {
                            this._router.navigate(['/']);
                        } else {
                            this.formularioPreo= response.formulario[0];
                            this._router.navigate(['/create-preoperacional',this.carSelect.clase,this.carSelect._id,this.formularioPreo._id,this.identity._id]);
                        }
                    },
                    error => {
                        var errorMessage = <any>error;
                        var body = error.error.message;
                        if (errorMessage != null) {
                            this.alertMessage = body;
                        }
                    }
        
                );
                
      }
}
