import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { AccountService } from '../account-service';
import { first } from 'rxjs/operators';

enum EmailStatus {
  Verifying,
  Failed
}

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styles: [
  ]
})
export class VerifyEmailComponent implements OnInit {
  
  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.Verifying;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private messageService: MessageService
  ) { }

  ngOnInit() {
      const token = this.route.snapshot.queryParams['token'];

      // remove token from url to prevent http referer leakage
      this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

      this.accountService.verifyEmail(token)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.messageService.success('Verification successful, you can now login');
                  this.router.navigate(['../login'], { relativeTo: this.route });
              },
              error: () => {
                  this.emailStatus = EmailStatus.Failed;
              }
          });
  }

}
