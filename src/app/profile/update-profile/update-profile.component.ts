import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account-service';
import { AccountDto } from 'src/app/account/models/accountDto';
import { Role } from 'src/app/account/models/role';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profile.component.html',
  styles: [
  ]
})
export class UpdateProfileComponent implements OnInit {

  account = this.accountService.accountValue;
  accountDto: AccountDto;
    roles: Role[] = [Role.User, Role.Admin, Role.Customer];
    role: Role;
    id: number;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private messageService: MessageService
    ) {}

    

    ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.accountService.getById(this.account.id)
          .subscribe(response => this.accountDto = response);
        
    }

    getAccountById(id: number){
      this.accountService.getById(id)
  }

  onSubmit(form: NgForm) {
      this.submitted = true;

     
      this.loading = true;
      if (this.isAddMode) {
          this.createAccount(form);
      } else {
          this.updateAccount(form);
      }
  }

  private createAccount(form: NgForm) {
      let accountCreate: AccountDto = {
          id: this.id,
          title: this.accountDto.title,
          firstName: this.accountDto.firstName,
          lastName: this.accountDto.lastName,
          email: this.accountDto.email,
          role: this.role,
          password: this.accountDto.password,
          confirmPassword: this.accountDto.confirmPassword,
          created: undefined,
          updated: undefined
      }
      this.accountService.create(accountCreate)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.messageService.success('Account created successfully');
                  this.router.navigate(['../'], { relativeTo: this.route });
              },
              error: error => {
                  this.messageService.error("Something went wrong by add account");
                  this.loading = false;
              }
          });
  }

  private updateAccount(form: NgForm) {
      let pass = this.accountDto.password;
      let confirmPass = this.accountDto.confirmPassword;
      let accountUp: AccountDto = {
          id: this.id,
          title: this.accountDto.title,
          firstName: this.accountDto.firstName,
          lastName: this.accountDto.lastName,
          email: this.accountDto.email,
          role: this.accountDto.role,
          password: pass == null ? "" : pass,
          confirmPassword: confirmPass == null ? "" : confirmPass,
          created: undefined,
          updated: undefined
      }
      this.accountService.update(this.id, accountUp)
          .subscribe({
              next: () => {
                  this.messageService.success('Update successful');
                  this.router.navigate(['../../'], { relativeTo: this.route });
              },
              error: error => {
                  this.messageService.error("Something went wrong by update account");
                  this.loading = false;
              }
          });
  }    

}
