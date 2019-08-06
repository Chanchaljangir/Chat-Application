import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/shared/services/Authetication/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  role:any;
  classes=[];
 constructor(private authService:AuthServiceService,private router:Router,private toastr:ToastrService) { }


  ngOnInit() {
    this.signupForm = new FormGroup({

      'username' : new FormControl(null, [Validators.required,Validators.maxLength(25)]),
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      
      'password' : new FormControl(null,[Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      'repassword' : new FormControl(null,[Validators.required]),
  },
  {validators: this.passwordConfirming('password','repassword')}
  );
}
  //Confirm Password
  passwordConfirming(password: string, repassword: string){
    return(group: FormGroup):{[key: string]: any}=>{
      let pass= group.controls[password];
      let cnfpass= group.controls[repassword];
      if(pass.value !== cnfpass.value){
        return{
         passwordConfirming: true
        };
      }
      return null;
    }
 }

 //on signup 
 onRegister(){
  console.log(this.signupForm.value)
  this.authService.registerUser(this.signupForm.value).subscribe(data=>{
    if(data.success){
      this.authService.storeUserData(data.res.token,data.res.user);
        console.log("user data ", data);
        this.toastr.success(' User logged in'); 
      this.router.navigate(['chat']);   
  }
  else{ 
    // console.log(data);
    this.toastr.error(' you are not logged in');
    this.router.navigate(['signup'])
    
  } 
});
} 
}
