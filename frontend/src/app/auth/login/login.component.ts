import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/shared/services/Authetication/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm:FormGroup; 
  constructor(private authservice:AuthServiceService,private router:Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'email' : new FormControl(null, Validators.required),     
      'password' : new FormControl(null,[Validators.required])
  }); 
  }
 // for login 
 CheckUserAuth(){  
  this.authservice. AuthLogin(this.signinForm.value).subscribe(data=>{
    if(data.success){ 
      // console.log("succ data ",data);
      // console.log('database ',data['user'].role);
      // console.log('fff', this.signinForm.value.role);
      
      this.authservice.storeUserData(data.token,data.user);
        this.toastr.success(' User succesfully logged in'); 
      this.router.navigate(['chat']);
      
    }
    else{ 
      // console.log(data);
      this.toastr.error(' you are not logged in');
      this.router.navigate(['login']);   
    }  
  });
} 
}
