import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/login/login/login.component';
import { EmailI } from '../home.component';
@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  loginUsername = LoginComponent.globalUsername

  constructor(private http : HttpClient) { }

  sendEmailAttachments(email:EmailI, formData? : FormData) : Observable<string>{

    return this.http.post<string>("http://localhost:8080/sendEmailAttachments?email=" + encodeURIComponent(JSON.stringify(email)), formData);
  }
  sendEmail(email:EmailI) : Observable<string>{

    return this.http.post<string>("http://localhost:8080/sendEmail", email);
  }
  movetoDraft(email:EmailI) : Observable<String>{

    return this.http.post<String>("http://localhost:8080/movetoDraft", email);
  }




}
