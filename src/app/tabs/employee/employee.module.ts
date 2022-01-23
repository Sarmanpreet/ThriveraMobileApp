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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeePageRoutingModule,
    CalendarModule,
    SharedModule,

  ],
  declarations: [EmployeePage,
    EmpHeaderComponent,
    SaleEntryListComponent,
    MOPListComponent,
    TabHeaderComponent,
    DynamicTableComponent,
    SalesEntryModalComponentComponent, AttandanceModalComponentComponent,
    MapentryModalComponent,
    ModalHeaderComponent
  ],
  entryComponents: [AttandanceModalComponentComponent, SalesEntryModalComponentComponent, MapentryModalComponent]
})
export class EmployeePageModule { }
