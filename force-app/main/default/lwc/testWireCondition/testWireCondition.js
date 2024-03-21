import { LightningElement, wire, api } from 'lwc';
import createCustomerTest from '@salesforce/apex/CustomerAction.createCustomerTest';
import objCust from '@salesforce/schema/Customer__c';
import Name from '@salesforce/schema/Contact.Name';
import Phone from '@salesforce/schema/Contact.Phone';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';

export default class TestWireCondition extends LightningElement {
    data;
    error;
    @api recordId;
    name= Name;
    phone = Phone;
    
    constructor(){
        super();
        objCust.Name = 'TestWire';
        objCust.Mobile__c = '123234345';
        objCust.Email__c = 'testWire@gmail.com';
        objCust.Status__c = 'True';
        console.log(objCust);
        console.log(this.recordId);
        console.log(this.name);
        console.log(this.phone);
    }
    // connectedCallback(){
    //     objCust.Name = 'TestWire';
    //     objCust.Mobile__c = '123234345';
    //     objCust.Email__c = 'testWire@gmail.com';
    //     objCust.Status__c = 'True';
    //     console.log(objCust);
    // }

    connectedCallback() {
        console.log("recordId", this.recordId);
    }

    renderedCallback() {
        console.log("renderedCallback recordId", this.recordId);
    }

    @wire(createCustomerTest,{objCustomer:'$objCust',recordId:'$recordId'})
    wirecreateCustomerTest({error,data}){
        if(data){
            this.data=data;
            console.log('---- data ----', data);
        }
        else{
            console.error('--- Error ---', error);
        }
    }

    @wire(getRecord, {recordId: '$recordId', fields: [Name]}) 
    wireUser({ error,data}) {
        if (data) {
            console.log('--- Contact Name ---',data.fields.Name.value);
        } else if (error) {
            this.error = error;
        }
    }
}