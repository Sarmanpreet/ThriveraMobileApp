import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeePage } from './employee.page';
import { SaleEntryListComponent } from './sale-entry-list/sale-entry-list.component';

const routes: Routes = [
  {
    path: 'employeedashboard',
    component: EmployeePage
  },
  {

    path: 'Transaction',
    children: [
      { path: 'SaleEntryList', component: SaleEntryListComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeePageRoutingModule { }
