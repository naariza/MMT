import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Car } from 'src/app/Models/car';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { VehiculoService } from 'src/app/Services/vehiculo.service';
import { GLOBAL } from "../../Services/global";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  providers:[UserService,VehiculoService]
})
export class RegisterUserComponent implements OnInit {
  public identity;
  public token;
  public url:string;
  public alertMessage;
  public titulo:string;
  public user_register:User;
  public filesToUpload : Array<File>;
  public cars : Car[];
  public next_page;
  public prev_page;
  
  constructor(
    private _userService:UserService,
    private _carService:VehiculoService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
  
    this.url=GLOBAL.url;
    this.user_register = new User('','','','','','','','');
    this.titulo="Registrar Usuario"
    this.next_page=1;
  this.prev_page=1;
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();
  console.log(this.token)

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
  onSubmit(){
 
  this._userService.register(this.token,this.user_register).subscribe(
    response=>{
      let user = response.user;
      if(!user._id){
        this.alertMessage='Error al registrase';
      }else{
        this.alertMessage='El registro se ha realizado corecctamente, identificate con '+this.user_register.email;
        this.user_register = response.user;
        this._router.navigate(['/edit-user',this.user_register._id]);
      }
    },
    error=>{
      var errorMessage = <any>error;
      if(errorMessage != null){
        var body = error.error.message;
        this.alertMessage=body;
        console.log(error);
      }
    }
  );
  }
    fileChangeEvent(fileInput:any){
        this.filesToUpload= <Array<File>>fileInput.target.files;
        
    }
  
    
}
