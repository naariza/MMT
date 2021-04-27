import { Component, Input, OnInit } from '@angular/core';
import { UserService } from "../../Services/user.service";
import { User } from '../../Models/user';
import { GLOBAL } from "../../Services/global";
import { Router, ActivatedRoute,Params } from "@angular/router";
import { LoginService } from 'src/app/Services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers:[UserService]
})
export class LoginComponent implements OnInit {

  public level="";
  public user:User;
  public user_register:User;
  public identity;
  public token;
  public errorMessage;
  public url;
  
  constructor(
    // public level:LoginService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService 
    )
    {
    this.user= new User('','','','','','','');
    this.user_register= new User('','','','','','','');
    this.url=GLOBAL.url;
    
   }

  ngOnInit(): void {
    this._route.queryParams.subscribe(res => {
      if(res.level){
        this.level = res.level
      }else{
        this._router.navigate(['']);
      }
    });
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    
  }
  public onSubmit(){
    //Conseguir los datos del usuario identificado
    this._userService.singup(this.user).subscribe(
      response =>{
        let identity = response.user;
        this.identity = identity;
        if(!this.identity._id){
          alert("El usuario no está corecctamente identificado")
        }else{
          //Crear elelmento en el localStorage para tener el usuario en sesion
          localStorage.setItem('identity',JSON.stringify(identity));

          //Conseguir el token para enviarselo a cada petición
          this._userService.singup(this.user,'true').subscribe(
            response =>{
              let token = response.token;
              this.token = token;
              if(this.token.length <= 0){
                alert("El token no se ha generado")
              }else{
                //Crear elemento en el localStorage para tener el token disponble
                localStorage.setItem('token',token);
                this.user= new User('','','','','','','');
                this._router.navigate(['navegador']);
                console.log(this.token);
              }
            },
               error=>{
                var errorMessage = <any>error;
                if(errorMessage != null){
                  var body = error.error.message;
                  this.errorMessage=body;
                  console.log(error);
                }
             
              }
              );
        }

         },
      error=>{
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = error.error.message;
          this.errorMessage=body;
          console.log(error);
        }
     
      }
    );
  }
  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token=null;
    this._router.navigate[('/')];
  }
}
