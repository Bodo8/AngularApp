import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from './account/models/role';
import { AuthGuard } from './core/helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { HoroscopeStorageComponent } from './horoscope-storage/horoscope-storage.component';
import { HoroscopeCreateComponent } from './horoscope/horoscope-create/horoscope-create.component';
import { HoroscopeHomeComponent } from './horoscope/horoscope-home/horoscope-home.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'horoscope-storage', component: HoroscopeStorageComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
    {path: 'horoscope-home', component: HoroscopeHomeComponent, canActivate: [AuthGuard] },
    {path: 'horoscope-create', component: HoroscopeCreateComponent, canActivate: [AuthGuard] },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
