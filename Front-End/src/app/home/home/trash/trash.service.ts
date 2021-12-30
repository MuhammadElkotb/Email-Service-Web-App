import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/login/login/login.component';
import { EmailI } from '../home.component';

@Injectable({
  providedIn: 'root'
})
export class TrashService {
  loginUsername = LoginComponent.globalUsername

  constructor(private http : HttpClient) { }

  getTrash(loginUsername:string) : Observable<EmailI[]>{

    return this.http.get<EmailI[]>("http://localhost:8080/getTrash?username=" + loginUsername + "&priority=false");
  }

  restore(email:EmailI) : Observable<EmailI[]>{

    console.log(email)
    return this.http.post<EmailI[]>("http://localhost:8080/restore", email);

  }

  deleteForever(email:EmailI) : Observable<EmailI[]>{
    console.log(email)
    return this.http.delete<EmailI[]>("http://localhost:8080/deleteForever", {body:email});

  }

}
