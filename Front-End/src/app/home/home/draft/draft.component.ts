import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login/login.component';
import { EmailI, HomeComponent } from '../home.component'
import { InboxComponent } from '../inbox/inbox.component';
import {InboxService } from '../inbox/inbox.service';
import { TrashService } from '../trash/trash.service';
import $ from "jquery"
import { DraftService } from './draft.service';
import { registerLocaleData } from '@angular/common';


@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {
  public static listOfEmails : EmailI[]
  private viewArray : string[][]
  private listPreSize : number
  private iterationsNum : number
  private listOfButtons : NodeList


  constructor(private router : Router, private serveMe1: DraftService) {
    DraftComponent.listOfEmails = []
    this.viewArray = []
    this.listPreSize = this.viewArray.length
    this.iterationsNum = 4
    HomeComponent.pageIndicator = "Draft"

  }


  ngOnInit(): void {
    // var x : EmailI = {
    //   senderUsername: '',
    //   timeSentString: "27/9/2001",
    //   subject: "birthday",
    //   body: '',
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

    // DraftComponent.listOfEmails.push(x)
    // DraftComponent.listOfEmails.push(y)
    // DraftComponent.listOfEmails.push(Z)
    // DraftComponent.listOfEmails.push(w)

    this.serveMe1.getDraft(LoginComponent.globalUsername).subscribe((data : EmailI[])=> {
      DraftComponent.listOfEmails = data;
       console.log(DraftComponent.listOfEmails);

       this.listPreSize = this.viewArray.length
       this.parseArray()

       this.place(this.viewArray,this.iterationsNum,this.listPreSize,"Edit")
       this.listOfButtons = document.querySelectorAll("td  > button")
       this.checkClick()});
}
parseArray(){
  this.viewArray = [];
  for (let email=0; email < DraftComponent.listOfEmails.length;email++){
    this.viewArray[email] = []
    this.viewArray[email][0] = DraftComponent.listOfEmails[email].receiversUsernames.toString()
    this.viewArray[email][1] = DraftComponent.listOfEmails[email].timeSentString
    this.viewArray[email][2] = DraftComponent.listOfEmails[email].subject
  }
}
checkClick(){
  for (var i =  0 ; i < this.listOfButtons.length ; i++){

    if (i%2){
      this.listOfButtons[i].addEventListener("click",$.proxy(this.deleteClicked,this));
    }else{
      this.listOfButtons[i].addEventListener("click",$.proxy(this.editClicked,this));
    }

  }
}
sortDraft(input : EmailI[]){
  this.listPreSize = DraftComponent.listOfEmails.length;
  DraftComponent.listOfEmails = input
  this.parseArray();
  this.place(this.viewArray,this.iterationsNum,this.listPreSize);
  this.listOfButtons = document.querySelectorAll("td  > button");
  this.checkClick();
}
filterDraft(input : EmailI[]){
  console.log(input.length)
  this.listPreSize = DraftComponent.listOfEmails.length;
  console.log("INPUT LENGTH ", input.length)
  DraftComponent.listOfEmails = input
  console.log("COMP LENGTH ", DraftComponent.listOfEmails.length);

  this.parseArray();
  console.log(this.viewArray.length);
  if(input.length == 0){
    this.viewArray = [];
  }

  this.place(this.viewArray,this.iterationsNum,this.listPreSize);
  this.listOfButtons = document.querySelectorAll("td  > button");
  this.checkClick();
}
searchDraft(input : EmailI[]){
  console.log(input.length)
  this.listPreSize = DraftComponent.listOfEmails.length;
  console.log("INPUT LENGTH ", input.length)
  DraftComponent.listOfEmails = input
  console.log("COMP LENGTH ", DraftComponent.listOfEmails.length);

  this.parseArray();
  console.log(this.viewArray.length);
  if(input.length == 0){
    this.viewArray = [];
  }

  this.place(this.viewArray,this.iterationsNum,this.listPreSize);
  this.listOfButtons = document.querySelectorAll("td  > button");
  this.checkClick();
}


deleteClicked(e: any){
  try{
    const buttonNum = parseInt(e.target.id)
    this.serveMe1.deleteForever(DraftComponent.listOfEmails[(buttonNum-1)/2]).subscribe((data : EmailI[])=> {
      this.router.navigateByUrl('/home',{skipLocationChange:true}).then(()=>{
        this.router.navigate(["/home/draft"])

      })
    })
  }catch (error){
    console.log(error)
  }
}
    editClicked(e: any){
      try{
        console.log(DraftComponent.listOfEmails)
        const buttonNum = parseInt(e.target.id)
        this.showInSendEmail()
      }catch (error){
        console.log(error)
      }
    }

    showInSendEmail(){
      this.router.navigate(['/home/sendEmail']);
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
