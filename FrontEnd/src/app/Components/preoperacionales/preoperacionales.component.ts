import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Preoperacional } from 'src/app/Models/preoperacional';
import { PreoperacionalService } from 'src/app/Services/preoperacional.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-preoperacionales',
  templateUrl: './preoperacionales.component.html',
  styleUrls: ['./preoperacionales.component.css']
})
export class PreoperacionalesComponent implements OnInit {
  public token;
  public identity;
  public preoperacionales;
  public alertMessage;
  constructor(
    private _userService: UserService,
    private _preoService: PreoperacionalService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
  }

  ngOnInit(): void {
    this.getPreoperacionales();
  }
  getPreoperacionales() {
    this._route.params.forEach((params: Params) => {
      let carId = params.id;
      this._preoService.getPreo(this.token, carId).subscribe(

        (response: any) => {
          console.log(response);
          if (!response.preoperacionales) {
            this._router.navigate(['/navegador']);
          } else {
            if (response.preoperacionales.length == 0) {
              this.alertMessage = 'El vehiculo no tiene preoperacionales';
            } else {
              this.preoperacionales = response.preoperacionales;
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

      )
    });

  }
}