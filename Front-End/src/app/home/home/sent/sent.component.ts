import { Router } from '@angular/router';
  import { Component, OnInit } from '@angular/core';
  import { LoginComponent } from 'src/app/login/login/login.component';
  import { EmailI, HomeComponent } from '../home.component'
  import { InboxComponent } from '../inbox/inbox.component';
  import { InboxService } from '../inbox/inbox.service';
  import $ from "jquery"
  import { SentService } from './sent.service';
import { TrashComponent } from '../trash/trash.component';


  let filtered : boolean = false;
  let listPreSizeFilter : number = 0;

  @Component({
    selector: 'app-sent',
    templateUrl: './sent.component.html',
    styleUrls: ['./sent.component.css']
  })
  export class SentComponent implements OnInit {
    public static listOfEmails : EmailI[]
    private viewArray : string[][] = [];
    private listPreSize : number
    private iterationsNum : number
    private listOfButtons : NodeList


    constructor(private serveMe: SentService, private router:Router) {
      SentComponent.listOfEmails = [];
      filtered = false;
      this.listPreSize = this.viewArray.length
      this.iterationsNum = 4;
      HomeComponent.pageIndicator = "Sent";
    }

    ngOnInit(): void {
      // var x : EmailI = {
      //   senderUsername: 'vfsf',
      //   timeSentString: "27/9/2001",
      //   subject: "birthday",
      //   body: 'vfvsv',
      //   owner: '',
      //   receiversUsernames: ["Joe"],
      //   emailID: '',
      //   emailType: '',
      //   priority: 'Urgent'
      // }
      // var y : EmailI = {
      //   senderUsername: '',
      //   timeSentString: "4/6/2001",
      //   subject: "birthday",
      //   body: '',
      //   owner: '',
      //   receiversUsernames: ["Meniem"],
      //   emailID: '',
      //   emailType: '',
      //   priority: 'Important'
      // }
      // var Z : EmailI = {
      //   senderUsername: '',
      //   timeSentString: "هيخو",
      //   subject: "birthday",
      //   body: '',
      //   owner: '',
      //   receiversUsernames: ["otb"],
      //   emailID: '',
      //   emailType: '',
      //   priority: 'Non-essential'
      // }
      // var w : EmailI = {
      //   senderUsername: '',
      //   timeSentString: "لول",
      //   subject: "birthday",
      //   body: '',
      //   owner: '',
      //   receiversUsernames: ["deffo"],
      //   emailID: '',
      //   emailType: '',
      //   priority: 'Skipable'
      // }

      // SentComponent.listOfEmails.push(x)
      // SentComponent.listOfEmails.push(y)
      // SentComponent.listOfEmails.push(Z)
      // SentComponent.listOfEmails.push(w)


      this.serveMe?.getSent(LoginComponent.globalUsername).subscribe((data : EmailI[])=> {
          SentComponent.listOfEmails = data;
          console.log(SentComponent.listOfEmails);
          this.listPreSize  = this.viewArray.length;
          this.parseArray();

          this.place(this.viewArray,this.iterationsNum,this.listPreSize);
          this.listOfButtons = document.querySelectorAll("td  > button");
          this.checkClick();});

  }
  parseArray(){

    this.viewArray = [];
    for (let email=0; email < SentComponent.listOfEmails.length;email++){
      console.log("IN FOR LOOP");
      this.viewArray[email] = [];
      this.viewArray[email][0] = SentComponent.listOfEmails[email].receiversUsernames.toString()
      this.viewArray[email][1] = SentComponent.listOfEmails[email].timeSentString
      this.viewArray[email][2] = SentComponent.listOfEmails[email].subject
    }
  }
  checkClick(){
    for (var i =  0 ; i < this.listOfButtons.length ; i++){

      if (i%2){
        this.listOfButtons[i].addEventListener("click",$.proxy(this.deleteClicked,this));
      }else{
        this.listOfButtons[i].addEventListener("click",$.proxy(this.showClicked,this));
      }

    }
}
sortSent(input : EmailI[]){
  this.listPreSize = SentComponent.listOfEmails.length;
  SentComponent.listOfEmails = input
  this.parseArray();
  this.place(this.viewArray,this.iterationsNum,this.listPreSize);
  this.listOfButtons = document.querySelectorAll("td  > button");
  this.checkClick();
}
filterSent(input : EmailI[]){
  console.log(input.length)
  this.listPreSize = SentComponent.listOfEmails.length;
  console.log("INPUT LENGTH ", input.length)
  SentComponent.listOfEmails = input
  console.log("COMP LENGTH ", SentComponent.listOfEmails.length);

  this.parseArray();
  console.log(this.viewArray.length);
  if(input.length == 0){
    this.viewArray = [];
  }

  this.place(this.viewArray,this.iterationsNum,this.listPreSize);
  this.listOfButtons = document.querySelectorAll("td  > button");
  this.checkClick();
}
searchSent(input : EmailI[]){
  console.log(input.length)
  this.listPreSize = SentComponent.listOfEmails.length;
  console.log("INPUT LENGTH ", input.length)
  SentComponent.listOfEmails = input
  console.log("COMP LENGTH ", SentComponent.listOfEmails.length);

  this.parseArray();
  console.log(this.viewArray.length);
  if(input.length == 0){
    this.viewArray = [];
  }


  this.parseArray();
  this.place(this.viewArray,this.iterationsNum,this.listPreSize);
  this.listOfButtons = document.querySelectorAll("td  > button");
  this.checkClick();
}


    closeEmailPopup(){
      (<HTMLElement>document.getElementById("email-popup")).style.display = "none";
  }

  show(email:EmailI){
    var contentsToBeDeleted = document.querySelectorAll("div > p");
    for (var i = 0; i<contentsToBeDeleted.length; i++)
    switch(i){
      case 0 : document.getElementById("sender-container")?.removeChild(document.getElementById("sender-container")?.childNodes[1])
               break
      case 1 : document.getElementById("date-container")?.removeChild(document.getElementById("date-container")?.childNodes[1])
               break
      case 2 : document.getElementById("subject-container")?.removeChild(document.getElementById("subject-container")?.childNodes[1])
               break
      case 3 : document.getElementById("message-container")?.removeChild(document.getElementById("message-container")?.childNodes[1])
               break
      case 4 : document.getElementById("attachment-container")?.removeChild(document.getElementById("attachment-container")?.childNodes[1])
              break;
            
    }
    var emailContents = document.querySelectorAll("div.email-container > div");
    for (var i = 0; i<emailContents.length; i++){
      var node = document.createElement("P")
      node.style.marginTop  = "0"
      var textNode = document.createTextNode(email.senderUsername)
      var destinationNode = document.getElementById("sender-container")
      switch(i){
        case 0 : node.id = "sender"
                break
        case 1 : node.id = "date"
                textNode = document.createTextNode(email.timeSentString)
                destinationNode = document.getElementById("date-container")
                break
        case 2 : node.id = "subject"
                textNode = document.createTextNode(email.subject)
                destinationNode = document.getElementById("subject-container")
                break
        case 3 :
                node.id = "message"
                textNode = document.createTextNode(email.body)
                destinationNode = document.getElementById("message-container")
                break
        case 4 : 

                node.id = "attachment"
                destinationNode = document.getElementById("attachment-container")

                
                break;
                
      }
      if(i != 4){
        node.appendChild(textNode)
      }
      else{
        for(let i = 0; i < email.attachments.length; i++){
          var a = document.createElement("a");
          a.href = "data:".concat(email.attachments[i].type).concat(";base64,").concat(email.attachments[i].encoded);
          a.download = email.attachments[i].name;
          var btn = document.createElement("button");
          btn.style.width = "150px";
          btn.style.height = "40px";
          btn.style.whiteSpace = "normal";
          btn.style.wordWrap = "break-word";
          btn.innerHTML = email.attachments[i].name;
          a.appendChild(btn);
          node.appendChild(a)
        }
      }
      destinationNode?.appendChild(node)

    }


    (<HTMLElement>document.getElementById("email-popup")).style.display = "block";
}
  deleteClicked(e: any){
    try{
      const buttonNum = parseInt(e.target.id)
      this.serveMe.movetoTrash(SentComponent.listOfEmails[(buttonNum-1)/2]).subscribe((data : EmailI[])=> {
        this.router.navigateByUrl('/home',{skipLocationChange:true}).then(()=>{
          this.router.navigate(["/home/sent"])

        })
      })
    }catch (error){
      console.log(error)
    }
  }
    showClicked(e: any){
      try{
        const buttonNum = parseInt(e.target.id)
        this.show(SentComponent.listOfEmails[buttonNum/2]);
      }catch (error){
        console.log(error)
      }
    }

    place(viewArray : string[][],iterationsNum : number,listPreSize: number,btnName: string = "Show"){
      var body = document.getElementById("mybody")
      var buttonCount = 0
      for (let i=0;i<listPreSize;i++){
        console.log("REMOVED CHILD");
        body?.removeChild(body?.childNodes[0])
      }
      console.log(viewArray)
      for (let i=0;i<viewArray.length;i++){
        var node = document.createElement("tr");
        node.style.width = "300px"
        node.style.textAlign = "center"
        node.style.padding = "7px"
        node.style.margin = "50px"
        for (let j=0;j<iterationsNum;j++){
            var node2 = document.createElement("td");
            if (j!=iterationsNum-1){
              var textNode = document.createTextNode(viewArray[i][j]);
              node2.appendChild(textNode);
            }else{
              if (btnName!="Delete"){
                var node3 = document.createElement("button");
                node3.style.marginRight = "5px"
                var textNode = document.createTextNode(btnName);
                node3.appendChild(textNode);
                node3.type = "button";
                node3.id = (buttonCount).toString()
                node2.appendChild(node3);
                buttonCount++
              }
              var textNode2 = document.createTextNode("Delete");
              var node4 = document.createElement("button");
              node4.style.marginRight = "5px"
              node4.appendChild(textNode2);
              node4.type = "button";
              node4.id = (buttonCount).toString()
              node2.appendChild(node4);
              buttonCount++
            }
            node.appendChild(node2);
        }
        document.getElementById("mybody")?.appendChild(node);
    }
  }


}