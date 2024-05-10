import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'src/app/core/helpers/must-match.validator';
import { MessageService } from 'src/app/core/message.service';
import { AccountService } from '../account-service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-accoun-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: UntypedFormGroup;
  loading = false;
  submitted = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.registerForm = new UntypedFormGroup({
      title: new UntypedFormControl('', [Validators.required]),
      firstName:  new UntypedFormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      lastName:  new UntypedFormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      email:  new UntypedFormControl('', [Validators.required, Validators.email]),
      password:  new UntypedFormControl('', [Validators.required, Validators.minLength(8),
         Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')]),
      confirmPassword:  new UntypedFormControl('', [Validators.required]),
      acceptTerms: new UntypedFormControl(false, [Validators.requiredTrue])
    }), {
      validator: MustMatch('password', 'confirmPassword')
      };
  }

  get f(){
    return this.registerForm.controls;
  }

  onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
        return;
    }
      this.loading = true;

      this.accountService.register(this.registerForm.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.messageService.success('Registration successful, please check your email for verification instructions');
                  this.router.navigate(['../login'], { relativeTo: this.route });
              },
              error: error => {
                  this.messageService.error("Registration failed");
                  this.loading = false;
              }
          });
  }
}
