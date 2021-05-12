import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-preoperacional',
  templateUrl: './create-preoperacional.component.html',
  styleUrls: ['./create-preoperacional.component.css']
})
export class CreatePreoperacionalComponent implements OnInit {
  
  preguntas = [];
  pregunta:String;
  Descripcion:String;

  constructor() { }

  ngOnInit(): void {
  }

  agregarPregunta(){
    this.preguntas.push({
      pregunta:this.pregunta,
      descripcion:this.Descripcion,
      valor:[]
    });
    this.pregunta ="";
    this.Descripcion ="";
  }

  guardarformulario(){
    const formulario = {
      pregunta:this.preguntas
    }
  }
}
