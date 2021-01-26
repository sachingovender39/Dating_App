import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private accountService:AccountService,private router:Router, private toastr:ToastrService ) { }
  currentUser$:Observable<User>;
  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login():void{
    this.accountService.login(this.model).subscribe(resp => {
      console.log(resp);
      this.router.navigateByUrl('/members');
    },error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  logout():void{
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  // getCurrentUser(){
  //   this.accountService.currentUser.subscribe(resp =>{
  //     this.loggedIn = !!resp;
  //   }, err =>{
  //     console.log(err);
  //   });
  // }

}
