import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private http:HttpClient) { }

// new Group Created
  addGroup(groupName):Observable<any>{ 
      let headers=new HttpHeaders();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/api/addgroup',groupName,{headers:headers})
    .pipe(map(res=>res));
    }

//get groups
getGroup():Observable<any>{ 
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/api/getgroup',{headers:headers})
.pipe(map(res=>res));
}
//get Users
getUsers():Observable<any>{ 
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/api/getusers',{headers:headers})
.pipe(map(res=>res));
}


}
 