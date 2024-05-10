import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account-service';
import { Account } from 'src/app/account/models/account';
import { Role } from 'src/app/account/models/role';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  Role = Role;
  account = this.accountService.accountValue;

  constructor( public accountService: AccountService) { }

  ngOnInit(): void {
    this.refresh();
  }
  logout() {
    this.accountService.logout();
}

refresh() {
  this.account;
}
}
