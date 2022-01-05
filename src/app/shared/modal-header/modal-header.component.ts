import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent implements OnInit {
  @Input() Heading: string;
  constructor(private modalController: ModalController) { }

  ngOnInit() { }
  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
