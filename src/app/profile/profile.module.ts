import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DetailsProfileComponent } from "./details-profile/details-profile.component";
import { LayoutComponent } from "./layout.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProfileRoutingModule,
        FormsModule,
    ],
    declarations: [
        DetailsProfileComponent,
        UpdateProfileComponent,
        LayoutComponent
    ]
})
export class ProfileModule { }