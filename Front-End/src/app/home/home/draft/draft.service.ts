import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/login/login/login.component';
import { EmailI } from '../home.component';
@Injectable({
  providedIn: 'root'
})
export class DraftService {
  loginUsername = LoginComponent.globalUsername

  constructor(private http : HttpClient) { }

  getDraft(loginUsername:string) : Observable<EmailI[]>{

    return this.http.get<EmailI[]>("http://localhost:8080/getDraft?username=" + loginUsername + "&priority=false");
  }
  deleteForever(email:EmailI) : Observable<EmailI[]>{

    return this.http.delete<EmailI[]>("http://localhost:8080/deleteForeverDraft", {body : email});
  }




}
