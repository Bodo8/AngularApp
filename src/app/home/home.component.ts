import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account-service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  account = this.accountService.accountValue;
  photoUrl = '../../assets/images/horoscopeMain.jpg';

  constructor(private accountService: AccountService) { }

}
