import { Component, ElementRef, OnInit,TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { UserService } from "../../Services/user.service";
import { User } from '../../Models/user';
import { GLOBAL } from "../../Services/global";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { PreoperacionalService } from 'src/app/Services/preoperacional.service';
import { VehiculoService } from 'src/app/Services/vehiculo.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService]
})
 
export class LoginComponent implements OnInit {
  @ViewChild('aaaa', {static: true}) ModalChoto;
  @ViewChild('manual', {static: true}) Manual;
  public level = "";
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertMessage;
  public url;
  public verify;
  public closeResult = '';
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _preoService: PreoperacionalService,
    private _modalService: NgbModal,
    private _carService:VehiculoService
  ) {
    this.user = new User('', '', '', null, '', '', '');
    this.user_register = new User('', '', '', '', '', '', '');
    this.url = GLOBAL.url;

  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(res => {
      if (res.level) {
        this.level = res.level
      } else {
        this._router.navigate(['']);
      }
    });


  }
  public onSubmit() {
    //Conseguir los datos del usuario identificado
    this._userService.singup(this.user).subscribe(
      (response:any )=> {
        this.identity = response.user;
        
        if (!this.identity._id) {
          this.errorMessage="El usuario no está corecctamente identificado"
        } else {
          //Crear elelmento en el localStorage para tener el usuario en sesion
          localStorage.setItem('identity', JSON.stringify(this.identity));

          //Conseguir el token para enviarselo a cada petición
          this._userService.singup(this.user, 'true').subscribe(
            response => {
              this.token = response.token;
              if (this.token.length <= 0) {
                alert("El token no se ha generado")
              } else {
                //Crear elemento en el localStorage para tener el token disponble
                localStorage.setItem('token', this.token);
                if (this.level == '1') {
                  this._router.navigate(['navegador']);
                }
              }
            },
            error => {
              var errorMessage = <any>error;
              if (errorMessage != null) {
                var body = error.error.message;
                this.errorMessage = body;
                console.log(error);
              }

            }
          );
        }

      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = error.error.message;
          this.errorMessage = body;
          console.log(error);
        }

      }
    );
  }
  getVerifyCar() {
    this._preoService.getPreoDriver(this.token, this.identity._id).subscribe(
      (response: any) => {
        if (!response) {
          this._router.navigate(['/']);
        } else {
          this.verify = response
          if (this.verify.status == true) {
           this.open(this.ModalChoto)
          }
          else {
            this._router.navigate(['/get-car/1']);
          }
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
  }
  open(content) {
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
 updateCar(){
      let id = this.verify._id;
      this.verify.status=false;
      this._carService.updateCar(this.token, id, this.verify).subscribe(
        (response: any) => {
          this.verify= response.car;
          if (!response.car) {
            this.alertMessage = 'Error en el servidor';
          } else {
              this.alertMessage = 'El vehiculo se ha actualizado correctamente';
              this._router.navigate(['/get-car/1']);
              this.getDismissReason('Save click')
              console.log(this.verify)

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
  }
  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this.user = new User('', '', '', '', '', '', '');
    this._router.navigate[('/')];
  }

}
