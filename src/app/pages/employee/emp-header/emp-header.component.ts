import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-emp-header',
  templateUrl: './emp-header.component.html',
  styleUrls: ['./emp-header.component.scss'],
})
export class EmpHeaderComponent implements OnInit, OnDestroy {

  constructor(private menu: MenuController, public commonService: CommonService) { }
  ngOnDestroy(): void {
    debugger;

  }
  ngOnInit() { }

  toggleMenu() {
    this.menu.toggle('menuBar');
    if (this.menu.isEnabled('menuBar')) {
      this.menu.enable(true, 'menuBar');
    } else {
      this.menu.enable(false, 'menuBar');
    }
  }

}

