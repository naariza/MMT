import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formulario } from 'src/app/Models/formulario';
import { FormularioService } from 'src/app/Services/formulario.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers:[UserService]
})
export class FormularioComponent implements OnInit {
  public form:Formulario;
  public token;
  public identity;
  public alertMessage;
  preguntas = [];
  pregunta:String;
  descripcion:String;
  constructor(
    private _formService:FormularioService,
    private _userService:UserService,
    private _router:Router
  ) {
    this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();
    this.form= new Formulario('','','','','','')
   }

  ngOnInit(): void {
  
  }
  agregarPregunta(){
    // debugger
    if(this.pregunta != '' && this.pregunta !=null && this.descripcion !='' && this.descripcion !=null){
      this.preguntas.push({
        pregunta:this.pregunta,
        descripcion:this.descripcion,
        valor:''
      });
    }
    this.pregunta ="";
    this.descripcion ="";
  }
  delete(preguntaDelete:string){
    this.preguntas.forEach(function (elemento, indice, array) {
      
      if(JSON.stringify(elemento) == JSON.stringify(preguntaDelete)){
      array.splice(indice,1);

      }
    });
    
    
  //  
  }
  guardarformulario(){
    this.form.preguntas=this.preguntas;
    this._formService.saveForm(this.token,this.form).subscribe(
      response => {
        let form = response.formulario;
        this.form = form;
 
        if (!form._id) {
          this.alertMessage = 'Error al crear el Formulario';
        } else {
          this.alertMessage = 'El registro del formulario '+this.form.name+' se realizo corecctamente';
          this.form = new Formulario('','','','','','');
          this._router.navigate(['/formulario']);
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = error.error.message;
          this.alertMessage = body;
          console.log(error);
        }
      }
    );
    
    console.log(this.form);
    

  }
}
