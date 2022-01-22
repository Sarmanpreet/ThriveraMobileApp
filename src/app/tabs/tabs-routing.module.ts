import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { MOPListComponent } from './employee/mop-list/mop-list.component';
import { SaleEntryListComponent } from './employee/sale-entry-list/sale-entry-list.component';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      // // Tab 1
      {
        path: 'employee',
        children: [
          {
            path: '',
            loadChildren: () => import('./employee/employee.module').then(m => m.EmployeePageModule),
          },
          {

            path: 'Transaction',
            children: [
              { path: 'SaleEntryList', component: SaleEntryListComponent },
              { path: 'MOPList', component: MOPListComponent },
            ]
          },
          {
            path: 'News',
            loadChildren: () => import('./news/news.module').then(m => m.NewsPageModule)
          },


          {
            path: 'settings',
            loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      // Tab 1
      {
        path: 'routes',
        children: [
          {
            path: '',
            loadChildren: () => import('./routes/routes.module').then(m => m.RoutesPageModule)
          }
        ]
        // loadChildren: () => import('./routes/routes.module').then( m => m.RoutesPageModule)
      },
      // {
      //   path: 'savedLocation',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () => import('./saved-locations/saved-locations.module').then(m => m.SavedLocationsPageModule)

      //     }
      //   ]
      // },
      // Tab 2
      {
        path: 'gmap',
        children: [
          {
            path: '',
            loadChildren: () => import('./gmap/gmap.module').then(m => m.GMapPageModule)
          }
        ]
      },
      // Tab 3 
      {
        path: 'routes',
        children: [
          {
            path: '',
            loadChildren: () => import('./routes/routes.module').then(m => m.RoutesPageModule)

            // loadChildren: () => import('./routes/routes.module').then( m => m.RoutesPageModule)
          },
          {
            path: 'detail',
            loadChildren: () => import('../pages/client-dtl/client-dtl.module').then(m => m.ClientDtlPageModule)
          }
        ]
      },
      // Tab 4
      {
        path: 'Register',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/auth/register/register.module').then(m => m.RegisterPageModule)
          }
        ]
      },
      // {
      //   path: 'notification',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule)
      //     }
      //   ]
      // },
      // Tab 5
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
          },
          {
            path: 'settings',
            loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'employee',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'gmap',
    loadChildren: () => import('./gmap/gmap.module').then(m => m.GMapPageModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsPageModule)
  },
  {
    path: 'pend-upcoming',
    loadChildren: () => import('../pages/pend-upcom-demo-list/pend-upcom-demo-list.module').then(m => m.PendUpcomDemoListPageModule)
  },
  {
    path: 'saved-locations',
    loadChildren: () => import('./saved-locations/saved-locations.module').then(m => m.SavedLocationsPageModule)
  },
  {
    path: 'routes',
    loadChildren: () => import('./routes/routes.module').then(m => m.RoutesPageModule)
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/news',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
