import { LightningElement, wire } from 'lwc';
import getAccountData from '@salesforce/apex/DataInteraction.getAccountData';

const col =[
  {label:'Name', fieldName:'Name'},
  {label:'Phone', fieldName:'Phone'},
  {label:'Website', fieldName:'Website'},
  {label:'AccountNumber', fieldName:'AccountNumber'},
];
//communication with 2 component without Parent-child relationship
export default class DynamicIntegrationComponent extends LightningElement {
    column = col;
    accData;
    error;
    @wire(getAccountData)
    wireAccountData({error, data}){
        if(data){
            this.accData=data;
        }
        else if(error){
            this.error=error;
        }
    }
    rowHandle(event){
        let evt = event.detail.selectedRows;
        const itemSelected = new CustomEvent("itemselected",{
            detail:{
                recordId:evt[0].Id
            }
        });
        this.dispatchEvent(itemSelected);
    }
}