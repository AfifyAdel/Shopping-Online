import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './domain/security/authentication.guard';
import { SessionGuard } from './domain/security/session.guard';
import { LoginComponent } from './modules/shared/login/login.component';
import { NotFoundComponent } from './modules/shared/not-found/not-found.component';
import { RegisterComponent } from './modules/shared/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [SessionGuard] },
  { path: 'login', component: LoginComponent, canActivate: [SessionGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [SessionGuard] },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthenticationGuard] },
  { path: '', loadChildren: () => import('./modules/front/front.module').then(m => m.FrontModule), canActivate: [AuthenticationGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
