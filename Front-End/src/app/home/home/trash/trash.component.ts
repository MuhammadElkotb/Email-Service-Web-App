import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/login/login/login.component';
import { EmailI } from '../home.component';
import { InboxComponent } from '../inbox/inbox.component';
import { InboxService } from '../inbox/inbox.service';
import { TrashService } from './trash.service';
import { HomeComponent } from '../home.component';
import { inject } from '@angular/core/testing';
import $ from "jquery"


@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  public static listOfEmails : EmailI[]
  private viewArray : string[][]
  private listPreSize : number
  private iterationsNum : number
  private listOfButtons : NodeList

  constructor(private serveMe1: TrashService, private router:Router) {
    TrashComponent.listOfEmails = []
    this.viewArray = []
    this.listPreSize = this.viewArray.length
    this.iterationsNum = 5
    HomeComponent.pageIndicator = "Trash"
  }

  ngOnInit(): void {
    // var x : EmailI = {
    //   senderUsername: 'Joe',
    //   timeSentString: "27/9/2001",
    //   subject: "birthday",
    //   body: '',
    //   owner: '',
    //   receiversUsernames: ["Meniem", "Ray"],
    //   emailID: '',
    //   emailType: 'Recieved',
    //   priority: 'Urgent'
    // }
    // var y : EmailI = {
    //   senderUsername: 'Meniem',
    //   timeSentString: "4/6/2001",
    //   subject: "birthday",
    //   body: '',
    //   owner: '',
    //   receiversUsernames: ["Deffo", "Joe"],
    //   emailID: '',
    //   emailType: 'Recieved',
    //   priority: 'Important'
    // }
    // var Z : EmailI = {
    //   senderUsername: "otb",
    //   timeSentString: "هيخو",
    //   subject: "birthday",
    //   body: '',
    //   owner: '',
    //   receiversUsernames: ["Meniem", "Joe"],
    //   emailID: '',
    //   emailType: 'Sent',
    //   priority: 'Non-essential'
    // }
    // var w : EmailI = {
    //   senderUsername: "deffo",
    //   timeSentString: "لول",
    //   subject: "birthday",
    //   body: '',
    //   owner: '',
    //   receiversUsernames: ["Otb", "Meniem"],
    //   emailID: '',
    //   emailType: 'Sent',
    //   priority: 'Skipable'
    // }

    // TrashComponent.listOfEmails.push(x)
    // TrashComponent.listOfEmails.push(y)
    // TrashComponent.listOfEmails.push(Z)
    // TrashComponent.listOfEmails.push(w)

    this.serveMe1.getTrash(LoginComponent.globalUsername).subscribe((data : EmailI[])=> {
      TrashComponent.listOfEmails = data;
      console.log(TrashComponent.listOfEmails);
      this.listPreSize  = this.viewArray.length
      this.parseArray()

      this.place(this.viewArray,this.iterationsNum,this.listPreSize,"Restore")
      this.listOfButtons = document.querySelectorAll("td  > button")
      this.checkClick()
    });


}
parseArray(){
  this.viewArray = [];
  for (let email=0; email < TrashComponent.listOfEmails.length;email++){
    this.viewArray[email] = []
    let isSent = TrashComponent.listOfEmails[email].emailType
    this.viewArray[email][0] = isSent
    if (isSent == "Sent" || isSent == "sent")
      this.viewArray[email][1] = TrashComponent.listOfEmails[email].senderUsername
    else
      this.viewArray[email][1] = TrashComponent.listOfEmails[email].receiversUsernames.toString()
    this.viewArray[email][2] = TrashComponent.listOfEmails[email].timeSentString
    this.viewArray[email][3] = TrashComponent.listOfEmails[email].subject

  }
}
checkClick(){
  for (var i =  0 ; i < this.listOfButtons.length ; i++){

    if (i%2){
      this.listOfButtons[i].addEventListener("click",$.proxy(this.deleteClicked,this));
    }else{
      this.listOfButtons[i].addEventListener("click",$.proxy(this.restoreClicked,this));
    }

  }
}
sortTrash(input : EmailI[]){
  this.listPreSize = TrashComponent.listOfEmails.length;
  TrashComponent.listOfEmails = input
  this.parseArray();
  this.place(this.viewArray,this.iterationsNum,this.listPreSize);
  this.listOfButtons = document.querySelectorAll("td  > button");
  this.checkClick();
}
filterTrash(input : EmailI[]){
  console.log(input.length)
  this.listPreSize = TrashComponent.listOfEmails.length;
  console.log("INPUT LENGTH ", input.length)
  TrashComponent.listOfEmails = input
  console.log("COMP LENGTH ", TrashComponent.listOfEmails.length);

  this.parseArray();
  console.log(this.viewArray.length);
  if(input.length == 0){
    this.viewArray = [];
  }

  this.place(this.viewArray,this.iterationsNum,this.listPreSize);
  this.listOfButtons = document.querySelectorAll("td  > button");
  this.checkClick();
}
searchTrash(input : EmailI[]){
  console.log(input.length)
  this.listPreSize = TrashComponent.listOfEmails.length;
  console.log("INPUT LENGTH ", input.length)
  TrashComponent.listOfEmails = input
  console.log("COMP LENGTH ", TrashComponent.listOfEmails.length);

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


deleteClicked(e: any){
  try{
    const buttonNum = parseInt(e.target.id)
    console.log("DELETE", buttonNum)

    console.log(TrashComponent.listOfEmails[(buttonNum-1)/2])
    this.serveMe1.deleteForever(TrashComponent.listOfEmails[(buttonNum-1)/2]).subscribe((data : EmailI[])=> {
      this.router.navigateByUrl('/home',{skipLocationChange:true}).then(()=>{
        this.router.navigate(["/home/trash"])

      })
    })
  }catch (error){
    console.log(error)
  }
}
  restoreClicked(e: any){
    try{
      const buttonNum = parseInt(e.target.id)
      console.log("RESTORE", buttonNum)
      console.log("RESTORE", TrashComponent.listOfEmails[Math.abs((buttonNum)/2)]);
      this.serveMe1.restore(TrashComponent.listOfEmails[(buttonNum)/2]).subscribe((data : EmailI[])=> {
        this.router.navigateByUrl('/home',{skipLocationChange:true}).then(()=>{
          this.router.navigate(["/home/trash"])
        })
      })
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


