import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PreoperacionalService } from 'src/app/Services/preoperacional.service';
import { UserService } from 'src/app/Services/user.service';
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import { style } from '@angular/animations';

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
  public workbook: Workbook;
  constructor(
    private _userService: UserService,
    private _preoService: PreoperacionalService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.workbook = new Workbook();
  }

  ngOnInit(): void {
    this.getPreoperacionales();
  }
  getPreoperacionales() {
    this._route.params.forEach((params: Params) => {
      let carId = params.id;
      this._preoService.getPreo(this.token, carId).subscribe(

        (response: any) => {
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
  downloadExcel(datas) {
    let workSheet = this.workbook.addWorksheet('Preoperacional',{views:[{state: 'frozen', xSplit: 1, ySplit:1}]});
    let header1 = ["Tecnicos En Montajes Mecanicos Y Civiles Ltda"]
    let header = ["kilometraje Inicial","kilometraje Final" ,"kilometraje Recorrido","Pregunta", "Descripción", "Cuenta o No Cuenta"];
    let headerRow = workSheet.addRows([{header1:"Tecnicos En Montajes Mecanicos Y Civiles Ltda",width:7},header]);
  
      
      let respuestas=datas.respuesta;
      for (let x1 of respuestas){
        if(x1.valor == 1){
          x1.valor="Si"
        }else{
          x1.valor="No"
        }
        if(x1.otros==false){
          x1.otros ='';
        }
      let x2 = Object.keys(x1);
      let temp = [datas.kilo_inicial,datas.kilo_final,datas.kilo_recorridos]
      for (let y of x2) {
        temp.push(x1[y])
      }
      workSheet.addRow(temp)
    }
    
    
    let fname = "Preoperacional"
    //add data and file name and download
    this.workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '-' + datas.date + '.xlsx');
    });
  }

}