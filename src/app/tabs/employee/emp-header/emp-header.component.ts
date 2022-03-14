import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { LogoutModalComponent } from 'src/app/components/logout-modal/logout-modal.component';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-emp-header',
  templateUrl: './emp-header.component.html',
  styleUrls: ['./emp-header.component.scss'],
})
export class EmpHeaderComponent implements OnInit, OnDestroy {

  constructor(private menu: MenuController, public commonService: CommonService,
    public popoverController: PopoverController,
    private router: Router) { }
  ngOnDestroy(): void {
    debugger;

  }
  ngOnInit() { }

  navigate() {
    this.router.navigate(['/tabs/employee/profile']);

  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LogoutModalComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      dismissOnSelect: true
    });
    await popover.present();
    // const popover = await this.popoverController.create({

    //     cssClass: "TopEnd",
    //     component: LogoutModalComponent,
    //     align: "end",
    //     side: 'right',

    //   });
    //   await popover.present();
    // const { role } = await popover.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }
  toggleMenu() {
    this.menu.toggle('menuBar');
    if (this.menu.isEnabled('menuBar')) {
      this.menu.enable(true, 'menuBar');
    } else {
      this.menu.enable(false, 'menuBar');
    }
  }

}

