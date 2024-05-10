import { Role } from "./role";

export interface RegisterAccount{
    Title: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    AcceptTerms: boolean;
}