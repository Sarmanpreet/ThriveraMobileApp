import { MenuController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss'],
})
export class MenuIconComponent implements OnInit {

  pageTitle: any;
  @Input() set title(val: any){
    debugger;
    this.pageTitle=val;
  } 
  constructor(private menu: MenuController) { }

  ngOnInit() {}

  toggleMenu(){
    this.menu.toggle('menuBar');
    if(this.menu.isEnabled('menuBar')){
      this.menu.enable(true,'menuBar');
    }else{
      this.menu.enable(false,'menuBar');
    }
  }
}
