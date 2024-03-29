
import { Action, createReducer, on } from '@ngrx/store';
import { DayConfig } from 'ion2-calendar';
import * as EmpActions from './Employee.actions';

export interface IEmployee {
  loading: boolean;
  CalenderResponse: DayConfig[];
  error: any;
  AttandenceDDL: any;

  AttachmentId: any;
  AttandenceSave: any;
  SaleEntryPendingList: any;
  SaleEntryApprovedList: any;
  SalesEntryDDL: any;
  CityDDL: any,
  ProductDDL: any,
  SubProductDDL: any,
  ItemDDL: any;
  SaveEntry: any;
  DeleteEntry: any;
}

export const initialAuthState: IEmployee = {
  loading: false,
  CalenderResponse: null,
  error: null,
  AttandenceDDL: null,
  AttachmentId: null,
  AttandenceSave: null,
  SaleEntryPendingList: null,
  SaleEntryApprovedList: null,
  SalesEntryDDL: null,
  CityDDL: null,
  ProductDDL: null,
  SubProductDDL: null,
  ItemDDL: null,
  SaveEntry: null,
  DeleteEntry: null
};


export const reducer = createReducer(

  initialAuthState,

  on(EmpActions.resetAuthState,
    (state, action) => {
      return {
        ...state,

        loading: false,
        CalenderResponse: null,
        error: null,
        AttandenceDDL: null,
        AttachmentId: null,
        AttandenceSave: null,
        SaleEntryPendingList: null,
        SaleEntryApprovedList: null,
        SalesEntryDDL: null,
        CityDDL: null,
        ProductDDL: null,
        SubProductDDL: null,
        ItemDDL: null,
        SaveEntry: null

      };
    }),

  on(EmpActions.GetCalender,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(EmpActions.GetCalenderSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        CalenderResponse: action.payload
      };
    }),

  on(EmpActions.GetCalenderError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(EmpActions.GetAttandenceDDL,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(EmpActions.GetAttandenceDDLSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        AttandenceDDL: action.payload
      };
    }),

  on(EmpActions.GetAttandenceDDLError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(EmpActions.SaveAttachementImage,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(EmpActions.SaveAttachementImageSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        AttachmentId: action.payload
      };
    }),

  on(EmpActions.SaveAttachementImageError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(EmpActions.SaveAttandence,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(EmpActions.SaveAttandenceSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        AttandenceSave: action.payload
      };
    }),
  on(EmpActions.resetAttandence,
    (state, action) => {

      return {
        ...state,
        loading: false,
        AttandenceSave: null
      };
    }),

  on(EmpActions.SaveAttandenceError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(EmpActions.GetSaleEntryList,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(EmpActions.GetSaleEntryListPendingSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        SaleEntryPendingList: action.payload
      };
    }),
  on(EmpActions.GetSaleEntryListApprovedSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        SaleEntryApprovedList: action.payload
      };
    }),
  on(EmpActions.resetGetSaleEntryList,
    (state, action) => {

      return {
        ...state,
        loading: false,
        AttandenceSave: null
      };
    }),

  on(EmpActions.GetSaleEntryListError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(EmpActions.GetSalesEntryDDL,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(EmpActions.GetSalesEntryDDLSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        SalesEntryDDL: action.payload
      };
    }),

  on(EmpActions.GetSalesEntryDDLError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }), on(EmpActions.GetCityDDL,
      (state, action) => {
        return {
          ...state,
          loading: true
        };
      }),
  on(EmpActions.GetCityDDLSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        CityDDL: action.payload
      };
    }),

  on(EmpActions.GetCityDDLError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(EmpActions.GetProductDDL,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(EmpActions.GetProductDDLSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        ProductDDL: action.payload
      };
    }),

  on(EmpActions.GetProductDDLError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(EmpActions.GetSubProductDDL,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(EmpActions.GetSubProductDDLSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        SubProductDDL: action.payload
      };
    }),

  on(EmpActions.GetSubProductDDLError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(EmpActions.GetItemDDL,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(EmpActions.GetItemDDLSuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        ItemDDL: action.payload
      };
    }),

  on(EmpActions.GetItemDDLError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(EmpActions.SaveSalesEntry,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(EmpActions.SaveSalesEntrySuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        SaveEntry: action.payload
      };
    }),

  on(EmpActions.SaveSalesEntryError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }),
  on(EmpActions.resetSalesEntry,
    (state, action) => {
      return {
        ...state,
        loading: false,
        SaveEntry: null
      };
    }),
  on(EmpActions.DeleteEntry,
    (state, action) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(EmpActions.DeleteEntrySuccess,
    (state, action) => {

      return {
        ...state,
        loading: false,
        DeleteEntry: action.payload
      };
    }),

  on(EmpActions.DeleteEntryError,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    })
);

export function employeeReducer(
  state: IEmployee | undefined,
  action: Action
) {
  return reducer(state, action);
}





