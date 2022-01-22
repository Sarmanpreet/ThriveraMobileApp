import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IMop } from './Mop.reducers';
import { selectMopState } from '../../../../shared/shared.state';


export const getMOPProductListResponse = createSelector(
    selectMopState,
    (state: IMop) => state.GetMOPList
);
export const getSaveMopResponse = createSelector(
    selectMopState,
    (state: IMop) => state.SaveMop
);




