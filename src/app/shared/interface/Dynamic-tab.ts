export interface IDynamicTabColumn {
    title: string;
    name: string;
    datasource: any;
    showdeletebtnongrid: boolean;


}
export interface IDynamicTblColumn {
    title: string;
    name: string;
    tblcolumnWidth?: number;
    buttons?: IActionButton[];
    // pdfColumnWidth?: string | number; // eg. 100 , '*', 'auto'
    // excelColumnWidth?: number;

}
export interface IActionButton {
    type: ActionButtonType;
    icon?: string;
    bgColor?: string;
    click?: any;
}


export enum ActionButtonType {
    Preview = 'preview',
    Download = 'download',
    View = 'view',
    Edit = 'edit',
    Delete = 'delete',
    Print = 'print',
    Toggle = 'toggle'
}
