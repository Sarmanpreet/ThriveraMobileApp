
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { MapModalComponent } from './map-modal.component';

@NgModule({
    imports: [
        CommonModule,
        /* angular google map (agm/core) plugin */
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBSkijnsnCVWqaNxwjSROoB0cpJM8Nv0TI',
            libraries: ['places']
        }),
        SharedModule
    ],
    declarations: [MapModalComponent],
    exports: [MapModalComponent]
})
export class MapModalComponentModule { }
