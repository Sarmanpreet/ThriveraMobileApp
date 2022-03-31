import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { LoginPage } from './login/login.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'loginnew'
      },
      {
        path: 'login',
        //component: LoginPage
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'loginnew',
        component: AuthPage
        // path: 'login',
        // loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'forgot',
        loadChildren: () => import('./forgot/forgot.module').then(m => m.ForgotPageModule)
      },
      {
        path: 'reset',
        loadChildren: () => import('./reset/reset.module').then(m => m.ResetPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule { }
