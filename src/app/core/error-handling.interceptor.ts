import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import { AccountService } from "../account/account-service";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor{

    constructor(private accountService: AccountService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(catchError(error => {
            if ([401, 403].includes(error.status) && this.accountService.accountValue) {
                // auto logout if 401 or 403 response returned from api
                this.accountService.logout();
            }
            let errorString = JSON.stringify(error.error.errors);
            let msg = this.getErrorValue(errorString);
               return throwError(() => new Error(msg));
        }));
    }
   
    private getErrorValue(message: string) {
        if (message.length > 2){
        const number = message.indexOf(":");
        
        return message.substring(number + 2, message.length - 2);
        }
        return message;
    }
}