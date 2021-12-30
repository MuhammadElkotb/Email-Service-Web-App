import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AttachmentI, EmailI, HomeComponent } from '../home.component';
import { InboxComponent } from '../inbox/inbox.component';
import $ from "jquery"
import { LoginComponent } from 'src/app/login/login/login.component';
import { SendEmailService } from './send-email.service';





@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  private listOfReceivers : string[]
  private listPreSize : number
  private iterationsNum : number
  private emailToBeSent : EmailI
  private attachments: AttachmentI[]
  private fileObject = new FormData
  private listOfButtons : NodeList
  private files : File[] = [];
  private form = new FormData();


  constructor(private placer : InboxComponent  , private serveMe:SendEmailService, private router:Router) {
    this.listOfReceivers = []
    this.listPreSize = 0
    this.iterationsNum = 2
    this.listOfButtons = document.querySelectorAll("td  > button")
    this.attachments = [],
    this.emailToBeSent  = {
      senderUsername: '',
      timeSentString: '',
      subject: '',
      body: '',
      owner: '',
      receiversUsernames: [],
      emailID: '',
      emailType: '',
      priority: '',
      attachments : []
    }
    HomeComponent.pageIndicator = "Send Email"
  }


  ngOnInit(): void {
    this.checkClick()
    console.log(LoginComponent.globalUsername)
  }


  showReceiver(){
    var receiver_input = (<HTMLInputElement>document.getElementById("receiver")).value
    this.listPreSize = this.listOfReceivers.length
    this.listOfReceivers.push(receiver_input)
    this.place()
    this.listOfButtons = document.querySelectorAll("td  > button")
    this.checkClick()
  }


  getAttachment(input : any){
    var files: File[]
    files = input.files

    var tempForm = new FormData();
    for(let i = 0; i < files.length; i++){
      tempForm.append("file", files[i])
    }
    console.log(files)
    this.form = tempForm;
    if(files.length == 0){
      this.form.append("file", null);
    }

  }



  sendEmail(){
    var e = (<HTMLSelectElement>document.getElementById("priority_select"))
    this.emailToBeSent.priority = e.options[e.selectedIndex].text
    this.emailToBeSent.body = (<HTMLInputElement>document.getElementById("message")).value
    this.emailToBeSent.subject = (<HTMLInputElement>document.getElementById("subject")).value
    this.emailToBeSent.receiversUsernames = this.listOfReceivers
    this.emailToBeSent.senderUsername =  this.emailToBeSent.owner =  LoginComponent.globalUsername
    console.log(this.emailToBeSent.priority)
    console.log(this.emailToBeSent.body)
    console.log(this.emailToBeSent.subject)
    console.log(LoginComponent.globalUsername)
    console.log(this.emailToBeSent.senderUsername)
    console.log(this.emailToBeSent.owner)
    console.log(this.emailToBeSent.receiversUsernames)
    
    if(!this.form.get("file")){
      this.serveMe.sendEmail(this.emailToBeSent).subscribe((data: string)=> {
        alert(data)
      })
      console.log("After Send")
    }
    else{
      this.serveMe.sendEmailAttachments(this.emailToBeSent, this.form).subscribe();
    }
    console.log("before Send")
  
  }
  movetoDraft(){
    var e = (<HTMLSelectElement>document.getElementById("priority_select"))
    this.emailToBeSent.priority = e.options[e.selectedIndex].text
    this.emailToBeSent.body = (<HTMLInputElement>document.getElementById("message")).value
    this.emailToBeSent.subject = (<HTMLInputElement>document.getElementById("subject")).value
    this.emailToBeSent.receiversUsernames = this.listOfReceivers
    this.emailToBeSent.senderUsername =  this.emailToBeSent.owner =  LoginComponent.globalUsername
    this.serveMe.movetoDraft(this.emailToBeSent).subscribe((data:String)=>{
        console.log(data)
        this.ngOnInit()
    });
    console.log("lol")
  }

  clear(){
    this.listPreSize = this.listOfReceivers.length
    this.listOfReceivers = []
    this.place()
  }

  checkClick(){
    console.log(this.listOfButtons)
    for (var i =  0 ; i < this.listOfButtons.length ; i++)
        this.listOfButtons[i].addEventListener("click",$.proxy(this.deleteClicked,this));
      }

    deleteClicked(e: any){
      try{
        const buttonNum = parseInt(e.target.id)
        this.listPreSize = this.listOfReceivers.length
        for (var i=buttonNum ; i<this.listOfReceivers.length-1 ; i++)
          this.listOfReceivers[i] = this.listOfReceivers[i+1]
        this.listOfReceivers.pop()
        console.log(this.listOfReceivers)
        this.place()
        this.listOfButtons = document.querySelectorAll("td  > button")
        this.checkClick()
      }catch (error){
        console.log(error)
      }
    }

    place(){
      var body = document.getElementById("mybody")
      for (let i=0;i<this.listPreSize;i++){
        body?.removeChild(body?.childNodes[0])
      }
      console.log(this.listOfReceivers)
      for (let i=0;i<this.listOfReceivers.length;i++){
        var node = document.createElement("tr");
        node.style.width = "300px"
        node.style.textAlign = "center"
        node.style.padding = "7px"
        node.style.margin = "50px"
        var node2 = document.createElement("td");
        var textNode = document.createTextNode(this.listOfReceivers[i]);
        node2.appendChild(textNode);
        node.appendChild(node2);
        var node3 = document.createElement("td");
        var textNode2 = document.createTextNode("Delete");
        var node4 = document.createElement("button");
        node4.style.marginRight = "5px"
        node4.appendChild(textNode2);
        node4.type = "button";
        node4.id = i.toString()
        node3.appendChild(node4);
        node.appendChild(node3);
        document.getElementById("mybody")?.appendChild(node);
    }
  }
}

