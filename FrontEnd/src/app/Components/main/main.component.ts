import { Component, OnInit,Input } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Input() item:string;
  public cua=Number;
  constructor(private level_usuer:LoginService) { 
    this.item="";
  }

  ngOnInit(): void {
  }
  
message(nivel_user:string){
  console.log(nivel_user);
  this.level_usuer.level_num=nivel_user;
  

}
}