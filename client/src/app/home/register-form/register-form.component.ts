
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor(private accountService:AccountService,private toastr:ToastrService) { }
  model: any = {};
  @Output() cancelReg = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  cancel(){
    this.cancelReg.emit(true);
  }

  register(){
    this.accountService.register(this.model).subscribe((resp) => {
      console.log(resp);
    },
    error =>{
      console.log(error);
    })
  }

}
