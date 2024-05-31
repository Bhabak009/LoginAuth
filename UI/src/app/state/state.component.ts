import { Component, OnInit } from '@angular/core';
import { State } from '../models/state';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StateService } from '../services/state.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PincodeService } from '../services/pincode.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent {

  myForm: FormGroup;
  state:State;
  
   constructor(private pincodeService: PincodeService,private fb:FormBuilder){
    this.state = new State();
  //  this.myForm=this.fb.group({
  //   userName:[''],
  //   password:['']
  //  })
   }
   ngOnInit(){
    this.myForm=this.fb.group({
      pincode:['']
    })
   }
   check(){
    this.pincodeService.checkTerritory(this.myForm.value.pincode).subscribe(res=>{
      console.log(res);
      alert(res[0].PostOffice[0].State);
    })
   }


  //  Save(){
  //   debugger;
  //    console.log(this.state);

  //    if(this.state.stateCode == undefined || this.state.stateCode == null || this.state.stateCode.length == 0)
  //    {
  //     alert("Please State Code");
  //     return false;
  //    }else{
  //     return true;
  //    }
     
  //    this.stateService.addState(this.state).subscribe(res => {
  //     console.log(res);
  //    }); 

  //  }

// Save(){
// if(this.myForm.valid){
//   this.state.userName=this.myForm.value.userName;
//   this.state.password=this.myForm.value.password;
// }
// this.authService.login(this.state).subscribe(res=>{
//   console.log(res);
// })

// }
}
