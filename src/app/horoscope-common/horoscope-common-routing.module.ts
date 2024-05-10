import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../core/helpers/auth.guard";
import { PlanetsInSignsComponent } from "./planets-in-signs/planets-in-signs.component";

const routes = [
    {path: 'planets-in-signs', component: PlanetsInSignsComponent, canActivate: [AuthGuard]},
];

 @NgModule({
     imports: [RouterModule.forChild(routes),
    
     ],
     exports: [RouterModule]
 })

export class HoroscopeCommonRoutingModule { }