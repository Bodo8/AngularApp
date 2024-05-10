import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CoreModuleApp } from 'src/app/core/core-module-app.module';

@NgModule({
    imports: [
        FormsModule,
        SharedModule,
        CommonModule,
        AccountsRoutingModule,
        CoreModuleApp
    ],
    exports: [
        AddEditComponent
    ],
    declarations: [
        ListComponent,
        AddEditComponent
    ]
})
export class AccountsModule { }