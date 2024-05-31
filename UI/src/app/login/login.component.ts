import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models/login';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  myForm:FormGroup;
  login:Login;
  submitted:boolean=false;


  constructor(private authService: AuthService,private fb:FormBuilder,private router: Router,private spinner:NgxSpinnerService){
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
    this.spinner.show(undefined, {
      type: 'square-jelly-box',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.7)',
      color: '#fff'
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.login.userName=this.myForm.value.userName;
    this.login.password=this.myForm.value.password;
    
    this.authService.login(this.login).subscribe(res => {
      if (res.message == 'Login successful') {
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['/state']);
        }, 5000); // 5-second delay before redirecting
      } else {
        // Handle login failure (e.g., show an error message)
        this.spinner.hide();
      }
    });
  }
}
