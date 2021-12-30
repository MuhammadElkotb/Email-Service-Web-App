import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/login/login/login.component';
import { HomeService } from '../home.service';
import { TrashComponent } from './trash/trash.component';
import { ContactI, ContactsComponent } from './contacts/contacts.component';
import { DraftComponent } from './draft/draft.component';
import { SentComponent } from './sent/sent.component';
import { InboxComponent } from './inbox/inbox.component';
export interface AttachmentI{
    encoded: string;
    name: string;
    type: string;
}

export interface EmailI{
  subject : string;
  body : string;
  owner : string;
  senderUsername: string;
  receiversUsernames: string[];
  emailID: string;
  emailType: string;
  timeSentString: string;
  priority: string;
  attachments : AttachmentI[]
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router:Router, private serveMe1: HomeService, private inbox : InboxComponent, private sent : SentComponent, private trash : TrashComponent, private draft : DraftComponent, private contacts : ContactsComponent) { }

  public static globalFilterOption: string = ""
  public static globalFilterText: string = ""
  public static globalSortOption: string = ""
  public static globalSortOrder: string = "true"
  public static globalSearchText: string = ""
  public static pageIndicator : string = ""

  path:string = ""
  ngOnInit(): void {

    this.router.navigate(['/home/inbox']);
    
    

  }

  filter(){
    var e = (<HTMLSelectElement>document.getElementById("filter_menu"))
    HomeComponent.globalFilterOption = e.options[e.selectedIndex].text

    HomeComponent.globalFilterText = (<HTMLInputElement>document.getElementById("filter_text")).value

    if(HomeComponent.pageIndicator == "Trash"){
      console.log("Trash Filtered")
      this.serveMe1.filterTrash(LoginComponent.globalUsername, HomeComponent.globalFilterOption, HomeComponent.globalFilterText).subscribe((data : EmailI[])=> {this.trash.filterTrash(data);console.log(TrashComponent.listOfEmails);})
    }

    else if (HomeComponent.pageIndicator == "Draft"){
      console.log("Draft Filtered")
      this.serveMe1.filterDraft(LoginComponent.globalUsername, HomeComponent.globalFilterOption, HomeComponent.globalFilterText).subscribe((data : EmailI[])=> {this.draft.filterDraft(data);console.log(DraftComponent.listOfEmails);})
    }

    else if (HomeComponent.pageIndicator == "Sent"){
      console.log("Sent Filtered")
      this.serveMe1.filterSent(LoginComponent.globalUsername, HomeComponent.globalFilterOption, HomeComponent.globalFilterText).subscribe((data : EmailI[])=> {this.sent.filterSent(data);console.log(SentComponent.listOfEmails);})
    }

    else if (HomeComponent.pageIndicator == "Inbox"){
      console.log("Inbox Filtered")
      this.serveMe1.filterInbox(LoginComponent.globalUsername, HomeComponent.globalFilterOption, HomeComponent.globalFilterText).subscribe((data : EmailI[])=> {this.inbox.filterInbox(data);console.log(InboxComponent.listOfEmails);})
    }

    console.log(HomeComponent.globalFilterOption)
    console.log(HomeComponent.globalFilterText)

  }

  sort(){
    var e = (<HTMLSelectElement>document.getElementById("sort_menu")) 
    HomeComponent.globalSortOption = e.options[e.selectedIndex].text

    var e1 = (<HTMLSelectElement>document.getElementById("sort_order")) 
    var sortOrder = e1.options[e1.selectedIndex].text
    console.log(sortOrder)

    if(sortOrder == "Descending") {
      HomeComponent.globalSortOrder = "false"
    }
    else{
      HomeComponent.globalSortOrder = "true"
    }

    if(HomeComponent.pageIndicator == "Trash"){
      console.log("Trash Sorted")
      this.serveMe1.sortTrash(LoginComponent.globalUsername, HomeComponent.globalSortOption, HomeComponent.globalSortOrder).subscribe((data : EmailI[])=> {this.trash.sortTrash(data);console.log(TrashComponent.listOfEmails);})
    }

    else if (HomeComponent.pageIndicator == "Draft"){
      console.log("Draft Sorted")
      this.serveMe1.sortDraft(LoginComponent.globalUsername, HomeComponent.globalSortOption, HomeComponent.globalSortOrder).subscribe((data : EmailI[])=> {this.draft.sortDraft(data);console.log(DraftComponent.listOfEmails);})
    }

    else if (HomeComponent.pageIndicator == "Sent"){
      console.log("Sent Sorted")
      this.serveMe1.sortSent(LoginComponent.globalUsername, HomeComponent.globalSortOption, HomeComponent.globalSortOrder).subscribe((data : EmailI[])=> {this.sent.sortSent(data);console.log(SentComponent.listOfEmails);})
    }

    else if (HomeComponent.pageIndicator == "Inbox"){
      console.log("Inbox Sorted")
      

      this.serveMe1.sortInbox(LoginComponent.globalUsername, HomeComponent.globalSortOption, HomeComponent.globalSortOrder).subscribe((data : EmailI[])=> {this.inbox.sortInbox(data); console.log(InboxComponent.listOfEmails);})
    }

    else if (HomeComponent.pageIndicator == "Contacts"){
      console.log("Contacts Sorted")
      this.serveMe1.sortContacts(LoginComponent.globalUsername, HomeComponent.globalSortOption, HomeComponent.globalSortOrder).subscribe((data : ContactI[])=> {this.contacts.sortContacts(data);console.log(ContactsComponent.listOfContacts);})
    }

    console.log(HomeComponent.globalSortOption)
    console.log(HomeComponent.globalSortOrder)
  }

  search(){

    HomeComponent.globalSearchText = (<HTMLInputElement>document.getElementById("search_text")).value

    if(HomeComponent.pageIndicator == "Trash"){
      console.log("Trash Searched")
      this.serveMe1.searchTrash(LoginComponent.globalUsername, HomeComponent.globalSearchText).subscribe((data : EmailI[])=> {this.trash.searchTrash(data);console.log(TrashComponent.listOfEmails);})
    }

    else if (HomeComponent.pageIndicator == "Draft"){
      console.log("Draft Searched")
      this.serveMe1.searchDraft(LoginComponent.globalUsername, HomeComponent.globalSearchText).subscribe((data : EmailI[])=> {this.draft.searchDraft(data);console.log(DraftComponent.listOfEmails);})
    }

    else if (HomeComponent.pageIndicator == "Sent"){
      console.log("Sent Searched")
      this.serveMe1.searchSent(LoginComponent.globalUsername, HomeComponent.globalSearchText).subscribe((data : EmailI[])=> {this.sent.searchSent(data);console.log(SentComponent.listOfEmails);})
    }

    else if (HomeComponent.pageIndicator == "Inbox"){
      console.log("Inbox Searched")
      this.serveMe1.searchInbox(LoginComponent.globalUsername, HomeComponent.globalSearchText).subscribe((data : EmailI[])=> {console.log(data);this.inbox.searchInbox(data);console.log(InboxComponent.listOfEmails);})
    }

    else if (HomeComponent.pageIndicator == "Contacts"){
      console.log("Contacts Searched")
      this.serveMe1.searchContacts(LoginComponent.globalUsername, HomeComponent.globalSearchText).subscribe((data : ContactI[])=> {this.contacts.searchContacts(data);console.log(ContactsComponent.listOfContacts);})
    }

    console.log(HomeComponent.globalSearchText)
  }

  switchToFolders(){
    this.router.navigate(['/home/folders']);
    
  }
  switchToSendEmail(){
    this.router.navigate(['/home/sendEmail']);
  }
  switchToSent(){
    this.router.navigate(['/home/sent']);

  }
  switchToInbox(){
    this.router.navigate(['/home/inbox']);

  }
  switchToTrash(){
    this.router.navigate(['/home/trash']);

  }
  switchToDraft(){
    this.router.navigate(['/home/draft']);

  }
  switchToContacts(){
    this.router.navigate(['/home/contacts']);

  }
  logOut(){
    this.router.navigate(['']);
  }
}
