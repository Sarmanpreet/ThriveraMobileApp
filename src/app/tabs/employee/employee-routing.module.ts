import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeePage } from './employee.page';
import { MOPListComponent } from './mop-list/mop-list.component';
import { SaleEntryListComponent } from './sale-entry-list/sale-entry-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employeedashboard'
  },
  {
    path: 'employeedashboard',
    component: EmployeePage
  },
  {

    path: 'Transaction',
    children: [
      { path: 'SaleEntryList', component: SaleEntryListComponent },
      { path: 'MOPList', component: MOPListComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeePageRoutingModule { }
