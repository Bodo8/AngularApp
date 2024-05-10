import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'src/app/core/helpers/must-match.validator';
import { MessageService } from 'src/app/core/message.service';
import { AccountService } from '../account-service';
import { first } from 'rxjs/operators';

enum TokenStatus {
  Validating,
  Valid,
  Invalid
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: [
  ]
})
export class ResetPasswordComponent implements OnInit {
  TokenStatus = TokenStatus;
  tokenStatus = TokenStatus.Validating;
  token = null;
  resetForm: UntypedFormGroup;
  loading = false;
  submitted = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private messageService: MessageService
  ) { }

  ngOnInit() {
      this.resetForm = new UntypedFormGroup({
          password: new UntypedFormControl( '', [Validators.required, Validators.minLength(6)]),
          confirmPassword: new UntypedFormControl('', [Validators.required]),
      }), {
          validator: MustMatch('password', 'confirmPassword')
      };

      const token = this.route.snapshot.queryParams['token'];

      // remove token from url to prevent http referer leakage
      this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

      this.accountService.validateResetToken(token)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.token = token;
                  this.tokenStatus = TokenStatus.Valid;
              },
              error: () => {
                  this.tokenStatus = TokenStatus.Invalid;
              }
          });
  }

  get f() { return this.resetForm.controls; }

  onSubmit() {
      this.submitted = true;

      //reset alerts on submit

      // stop here if form is invalid
      if (this.resetForm.invalid) {
          return;
      }

      this.loading = true;
      this.accountService.resetPassword(this.token, this.f['password'].value, this.f['confirmPassword'].value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.messageService.success('Password reset successful, you can now login');
                  this.router.navigate(['../login'], { relativeTo: this.route });
              },
              error: error => {
                  this.messageService.error('Some went wrong');
              }
          });
  }
}
