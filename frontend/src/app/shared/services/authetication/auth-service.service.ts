import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';

@Injectable({ 
  providedIn: 'root'
})
export class AuthServiceService {
  authToken:any;
  user:any;
  constructor(private http:HttpClient) { }
  // for registeration
  registerUser(user):Observable<any>{
    let headers =new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/signup',user,{headers:headers})
    .pipe(map(res=>res));
  } 

    // store data in local storage fr guards
    storeUserData(token, user) {

      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
      // console.log(this.authToken, this)
    }

  // for login 
  AuthLogin(userauth):Observable<any>{ 
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/authenticate',userauth,{headers:headers})
  .pipe(map(res=>res));
  }
}
