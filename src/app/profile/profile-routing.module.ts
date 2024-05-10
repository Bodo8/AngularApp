import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailsProfileComponent } from "./details-profile/details-profile.component";
import { LayoutComponent } from "./layout.component";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
    
    children: [
        { path: '', component: DetailsProfileComponent },
        { path: 'update-profile', component: UpdateProfileComponent }
    ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }