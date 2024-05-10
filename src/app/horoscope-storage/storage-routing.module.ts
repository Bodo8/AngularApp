import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../core/helpers/auth.guard";
import { HoroscopeStorageComponent } from "./horoscope-storage.component";

const routes = [
    {path: 'horoscope-storage', component: HoroscopeStorageComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StorageRoutingModule { }