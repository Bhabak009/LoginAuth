import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models/login';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  myForm:FormGroup;
  login:Login;
  submitted:boolean=false;


  constructor(private authService: AuthService,private fb:FormBuilder,private router: Router){
    this.login=new Login();
  }
  ngOnInit(): void {
    this.myForm=this.fb.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }
  Login(){
    
    this.submitted=true;
    this.login.userName=this.myForm.value.userName;
    this.login.password=this.myForm.value.password;
    this.authService.login(this.login).subscribe(res=>{
    
      if(res.message=='Login successful'){
        this.router.navigate(['/state']);
      }
     
    })
  }
}
