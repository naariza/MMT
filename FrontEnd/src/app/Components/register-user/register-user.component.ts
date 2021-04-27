import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { GLOBAL } from "../../Services/global";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  public identity;
  public token;
  public url:string;
  public alertMessage;
  public titulo:string;
  public user_register:User;
  public filesToUpload : Array<File>;
  
  constructor(
    private _userService:UserService,
    private _router:Router
  ) { 
  
    this.url=GLOBAL.url;
    this.user_register = new User('','','','','','','');
    this.titulo="Registrar Usuario"
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();
  }
  onSubmit(){
    this._userService.register(this.user_register).subscribe(
      response=>{
        let user = response.user;
        this.user_register = user;

        if(!user._id){
          this.alertMessage='Error al registrase';
        }else{
          this.alertMessage='El registro se ha realizado corecctamente, identificate con '+this.user_register.name;
          this.user_register = new User('','','','','','','');
          this._router.navigate(['/edit-user',response.user._id]);
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
