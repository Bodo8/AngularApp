import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { AccountService } from '../account-service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  @Input() email: string;
  @Input() password: string;
  
    loading = false;
    submitted = false;
    
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
        private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.accountService.login(this.email, this.password)
        .pipe(first())
        .subscribe({
            next: () => {
                // get return url from query parameters or default to home page
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
            },
            error: error => {
                this.messageService.error("Login or password is incorrect");
                this.loading = false;
            }
        });
}

}
