import { LightningElement, wire, api } from 'lwc';
import getContactData from '@salesforce/apex/DynamicInteractionContact.getContactData';

const col =[
  {label:'Name', fieldName:'Name'},
  {label:'Phone', fieldName:'Phone'},
  {label:'Email', fieldName:'Email'}
];
//communication with 2 component without Parent-child relationship
export default class DynamicIntegrationContactComponent extends LightningElement {
    column = col;
    contactData;
    error;
    _recordId;

    @api get recordId(){
        return this._recordId;
    }
    set recordId(value){
        if(value){
            this._recordId=value;
        }
    }

    @wire(getContactData,{accountId:'$recordId'})
    wireAccountData({error, data}){
        if(data){
            this.contactData=data;
            console.log('--- data --', data);
        }
        else if(error){
            this.error=error;
        }
    }
}