import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account-service';

@Component({
  selector: 'app-details-profil',
  templateUrl: './details-profile.component.html',
  styles: [
  ]
})
export class DetailsProfileComponent {
  account = this.accountService.accountValue;

  constructor(private accountService: AccountService) { }
}
