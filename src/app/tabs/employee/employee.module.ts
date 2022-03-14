import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeePageRoutingModule } from './employee-routing.module';

import { EmployeePage } from './employee.page';
import { EmpHeaderComponent } from './emp-header/emp-header.component';
import { CalendarModule } from 'ion2-calendar';
import { AttandanceModalComponentComponent } from 'src/app/components/attandance-modal-component/attandance-modal-component.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabHeaderComponent } from './tab-header/tab-header.component';
import { SaleEntryListComponent } from './sale-entry-list/sale-entry-list.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { SalesEntryModalComponentComponent } from 'src/app/components/new-sales-entry-modal-component/new-sales-entry-modal-component.component';
import { ModalHeaderComponent } from 'src/app/shared/modal-header/modal-header.component';
import { MOPListComponent } from './mop-list/mop-list.component';
import { MapentryModalComponent } from 'src/app/components/mapentry-modal/mapentry-modal.component';
import { CounterDisplayListComponent } from './counterdisplay-list/counterdisplay-list.component';
import { CounterdisplayentryModalComponent } from 'src/app/components/counterdisplayentry-modal/counterdisplayentry-modal.component';
import { RFCListComponent } from './rfc-list/rfc-list.component';
import { RfcEntryModalComponent } from 'src/app/components/rfc-entry-modal/rfc-entry-modal.component';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { CompetitionEntryModalComponent } from 'src/app/components/competition-entry-modal/competition-entry-modal.component';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { LeaveEntryModalComponent } from 'src/app/components/leave-entry-modal/leave-entry-modal.component';
import { ProfilePage } from './profile/profile.page';
import { LogoutModalComponent } from 'src/app/components/logout-modal/logout-modal.component';
import { TabsPageModule } from '../tabs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeePageRoutingModule,
    CalendarModule,
    SharedModule

  ],
  declarations: [EmployeePage,
    EmpHeaderComponent,
    SaleEntryListComponent, RFCListComponent,
    MOPListComponent,
    TabHeaderComponent,
    CompetitionListComponent,
    DynamicTableComponent,
    ProfilePage,
    SalesEntryModalComponentComponent,
    AttandanceModalComponentComponent,
    MapentryModalComponent, LeaveListComponent,
    CounterDisplayListComponent, CounterdisplayentryModalComponent,
    ModalHeaderComponent, RfcEntryModalComponent, CompetitionEntryModalComponent,
    LeaveEntryModalComponent, LogoutModalComponent
  ],
  entryComponents: [AttandanceModalComponentComponent,
    SalesEntryModalComponentComponent, MapentryModalComponent,
    CounterdisplayentryModalComponent, CompetitionEntryModalComponent,
    RfcEntryModalComponent, LeaveEntryModalComponent, LogoutModalComponent]
})
export class EmployeePageModule { }
