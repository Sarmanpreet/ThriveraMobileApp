import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { CalendarModule } from "ion2-calendar";
import { AuthGuard } from './shared/services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)

  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'settings',
  //   loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  // },
  // {
  //   path: 'bookmarks',
  //   loadChildren: () => import('./pages/bookmarks/bookmarks.module').then(m => m.BookmarksPageModule)
  // },
  // {
  //   path: 'stories', 
  //   loadChildren: () => import('./pages/stories/stories.module').then(m => m.StoriesPageModule)
  // },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./tabs/employee/employee.module').then(m => m.EmployeePageModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'client-list',
  //   loadChildren: () => import('./pages/client-list/client-list.module').then(m => m.ClientListPageModule)
  // },
  // {
  //   path: 'client-dtl',
  //   loadChildren: () => import('./pages/client-dtl/client-dtl.module').then(m => m.ClientDtlPageModule)
  // },
  // {
  //   path: 'pend-upcom-demo-list',
  //   loadChildren: () => import('./pages/pend-upcom-demo-list/pend-upcom-demo-list.module').then(m => m.PendUpcomDemoListPageModule)
  // },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
