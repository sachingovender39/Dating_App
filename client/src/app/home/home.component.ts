import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  registerForm:boolean = false;
  ngOnInit(): void {
  }

  toggleView(){
    this.registerForm = true;
  }

  cancelReg(val: boolean){
    if (val){
      this.registerForm = false;
    }
  }
}
