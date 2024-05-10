import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Account } from "./models/account";
import { RegisterAccount } from "./models/register-account";
import { AccountsVm } from "./models/accountsVm";
import { AccountDto } from "./models/accountDto";
import { finalize, map } from "rxjs/operators";

const baseUrl = `${environment.apiUrl}/api/Accounts`;

@Injectable({ providedIn: 'root' })
export class AccountService {

    private accountSubject: BehaviorSubject<Account>;
    public account: Observable<Account>;
    private accountDtoSubject: BehaviorSubject<AccountDto>;
    public accountDto: Observable<AccountDto>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.accountSubject = new BehaviorSubject<Account>(null);
        this.account = this.accountSubject.asObservable();
        this.accountDtoSubject = new BehaviorSubject<AccountDto>(null);
        this.accountDto = this.accountDtoSubject.asObservable();
    }

    public get accountValue(): Account {
        return this.accountSubject.value;
    }
    public get accountDtoValue(): AccountDto {
        return this.accountDtoSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${baseUrl}/Authenticate`, { email, password }, { withCredentials: true })
            .pipe(map(account => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    logout() {
        this.http.post<any>(`${baseUrl}/RevokeToken`, {}, { withCredentials: true }).subscribe();
        this.stopRefreshTokenTimer();
        this.accountSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    refreshToken(): Observable<Account> {
        return this.http.post<any>(`${baseUrl}/RefreshToken`, {}, { withCredentials: true })
            .pipe(map((account) => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    register(account: RegisterAccount) {
        return this.http.post(`${baseUrl}/Register`, account);
    }

    verifyEmail(token: string) {
        return this.http.post(`${baseUrl}/VerifyEmail`, { token });
    }
    
    forgotPassword(email: string) {
        return this.http.post(`${baseUrl}/ForgotPassword`, { email });
    }
    
    validateResetToken(token: string) {
        return this.http.post(`${baseUrl}/ValidateResetToken`, { token });
    }
    
    resetPassword(token: string, password: string, confirmPassword: string) {
        return this.http.post(`${baseUrl}/ResetPassword`, { token, password, confirmPassword });
    }

    getAll() {
        return this.http.get<AccountsVm>(baseUrl);
    }

    getById(id: number) {
        return this.http.get<AccountDto>(`${baseUrl}/${id}`);
    }
    
    create(params) {
        return this.http.post(baseUrl, params);
    }
    
    update(id, accountUp: AccountDto) {
        return this.http.put(`${baseUrl}/${id}`, accountUp)
            .pipe(map((accountReq: AccountDto) => {
                this.accountDtoSubject.next(accountReq);
                return accountReq;
            }));
    }
    
    delete(id: number) {
        return this.http.delete(`${baseUrl}/${id}`)
            .pipe(finalize(() => {
                if (id === this.accountValue.id)
                    this.logout();
            }));
    }
    
     // helper methods

     private refreshTokenTimeout;

     private startRefreshTokenTimer() {
         // parse json object from base64 encoded jwt token
         const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));
 
         // set a timeout to refresh the token a minute before it expires
         const expires = new Date(jwtToken.exp * 1000);
         const timeout = expires.getTime() - Date.now() - (60 * 1000);
         this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
     }
 
     private stopRefreshTokenTimer() {
         clearTimeout(this.refreshTokenTimeout);
     }
}