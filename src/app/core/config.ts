import {InjectionToken} from "@angular/core";

export interface Config{
    customerLimit: number;
    apiUrl: string;
}

export const CONFIG = new InjectionToken('app.config');