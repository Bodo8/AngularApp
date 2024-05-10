import { Subscription } from "rxjs";
import { AccountService } from "src/app/account/account-service";

export function appInitializer(accountService: AccountService): () => Subscription {
    return () => {
      // attempt to refresh token on app start up to auto authenticate
      return accountService.refreshToken().subscribe();
};
}