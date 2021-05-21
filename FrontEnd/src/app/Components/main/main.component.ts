import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private router:Router) {

  }

  ngOnInit(): void {
  }

  message(nivel_user: string) {
    this.router.navigate(['login-Admin'],{queryParams:{
      level:nivel_user
    }})
    
  }
}