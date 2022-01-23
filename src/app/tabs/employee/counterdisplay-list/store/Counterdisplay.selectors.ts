import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ICounterdisplay } from './Counterdisplay.reducers';
import { selectCounterdisplayState } from '../../../../shared/shared.state';


export const getCDEditListtResponse = createSelector(
    selectCounterdisplayState,
    (state: ICounterdisplay) => state.GetCDEditList
);
export const getSaveCounterDisplayResponse = createSelector(
    selectCounterdisplayState,
    (state: ICounterdisplay) => state.SaveCounterDisplay
);
export const getCDListResponse = createSelector(
    selectCounterdisplayState,
    (state: ICounterdisplay) => state.CDList
);





