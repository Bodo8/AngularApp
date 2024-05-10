import { Role } from "./role";

export interface AccountDto {
    id?: number;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string
    role: Role;
    created: Date;
    updated: Date;
    isVerified?: boolean;
}