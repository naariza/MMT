import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private level_usuer: LoginService,
    private router:Router) {

  }

  ngOnInit(): void {
  }

  message(nivel_user: string) {
    console.log(nivel_user);
    // this.level_usuer.level_num = nivel_user;
    this.router.navigate(['login-Admin'],{queryParams:{
      level:nivel_user
    }})
    
  }
}