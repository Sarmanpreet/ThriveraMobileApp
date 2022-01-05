import { Component } from '@angular/core';
import { MenuController, Platform, ModalController, IonRouterOutlet } from '@ionic/angular';
import { interval, Subscription, Observable } from 'rxjs';

import { Howl, Howler } from 'howler';
import { MusicController, PlayerEventOptions, initialPlayerEventOptions } from '../shared/music-controller/music-controller.service';
import { Store, select } from '@ngrx/store';
import { actionMusicSetPlaying } from '../shared/music/music.actions';
import { selectMusic } from '../shared/music/music.selectors';
import { StateMusic, MusicState } from '../shared/music/music.model';
import { initialStateMusic } from '../shared/music/music.reducer';
import { SalesEntryModalComponentComponent } from '../components/new-sales-entry-modal-component/new-sales-entry-modal-component.component';
import { AttandanceModalComponentComponent } from '../components/attandance-modal-component/attandance-modal-component.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  canOpenMenu = false;
  audioDuration = 0;
  audioCurrentPosition = 0;
  audioCheckInterval = interval(200);

  showBar: boolean = true;

  player: Howl = null;
  isPlaying = false;
  progress = 0;
  music: PlayerEventOptions = initialPlayerEventOptions;

  audioSubscription: Subscription = new Subscription;
  constructor(
    private platform: Platform,

    private menu: MenuController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private musicController: MusicController,
    private store: Store
  ) { }

  scrolled(event) {
    console.log(event);
  }

  toggleMusic() {
    this.musicController.togglePlayer(this.music.isPlaying, (this.music.seek / this.music.duration) * 100);
  }

  closePlayer() {
    this.musicController.abort();
  }

  nextMusic() { }

  prevMusic() { }

  seekMusic() { }

  updateProgressMusic() { }

  tabChanged(event) {
    this.canOpenMenu = event.tab === 'profile';
  }



  async OpenSalesModal() {
    // const paramData = {
    //   custid: 2

    // }
    // const modal = await this.modalController.create({
    //   component: SalesEntryModalComponentComponent,
    //   swipeToClose: true,
    //   componentProps: paramData,
    //   // initialBreakpoint: 0.95,
    //   // breakpoints: [0, 0.5, 1]
    //   // presentingElement: await this.modalController.getTop()
    // });
    // return await modal.present();
  }
  async openAttnModal() {
    debugger;
    const paramData = {
      custid: 2

    }
    const modal = await this.modalController.create({
      component: AttandanceModalComponentComponent,
      swipeToClose: true,
      componentProps: paramData,
      initialBreakpoint: 0.95,
      breakpoints: [0, 0.5, 1]
      // presentingElement: await this.modalController.getTop()
    });
    return await modal.present();
  }
  toggleMenu() {
    this.menu.toggle('menuBar');
    if (this.menu.isEnabled('menuBar')) {
      this.menu.enable(true, 'menuBar');
    } else {
      this.menu.enable(false, 'menuBar');
    }
  }
  openMenu(): void {
    if (this.canOpenMenu) {
      this.menu.open();
    }
  }

  ngOnInit(): void {
    this.musicController.onProgress.subscribe((res) => {
      this.music = { ...this.music, ...res };
      this.progress = +(this.music.seek / this.music.duration);
    });
  }
}
