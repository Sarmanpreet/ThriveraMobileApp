import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { CounterDisplayListComponent } from './counterdisplay-list/counterdisplay-list.component';

import { EmployeePage } from './employee.page';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { MOPListComponent } from './mop-list/mop-list.component';
import { RFCListComponent } from './rfc-list/rfc-list.component';
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
      { path: 'CounterDisplayList', component: CounterDisplayListComponent },
      { path: 'RFCRequestsList', component: RFCListComponent },
      { path: 'CompetitionEntryList', component: CompetitionListComponent }
    ]
  },
  {

    path: 'Leave',
    children: [

      { path: 'AppliedLeaveList', component: LeaveListComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeePageRoutingModule { }
