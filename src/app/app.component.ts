import {Component} from '@angular/core';
import { AccountService } from './account/account-service';
import { Account } from './account/models/account';
import { Role } from './account/models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    '.isActive { text-decoration: underline; }'
  ]
})
export class AppComponent {

  Role = Role;
  account: Account;

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe(x => this.account = x);
  }
  
}
