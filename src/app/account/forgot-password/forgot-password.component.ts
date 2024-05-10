import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/core/message.service';
import { AccountService } from '../account-service';
import { finalize, first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [
  ]
})
export class ForgotPasswordComponent implements OnInit {
  
  loading: boolean = false;
  submitted = false;
  email: string;

  constructor(
      private accountService: AccountService,
      private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
      this.submitted = true;
      this.loading = true;
      this.accountService.forgotPassword(this.email)
          .pipe(first())
          .pipe(finalize(() => this.loading = false))
          .subscribe({
              next: () => this.messageService.success('Please check your email for password reset instructions'),
              error: error => this.messageService.error("Somthing went wrong!")
          });
  }
}
