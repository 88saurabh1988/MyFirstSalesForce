import { LightningElement, wire } from 'lwc';
import {fireEvent} from 'c/pubsub'; // For publish event with message
import {CurrentPageReference} from 'lightning/navigation';
import getAccount from '@salesforce/apex/PubsubController.getAccount';
const col = [
    {label: "Name", fieldName: "Name"},
    {label: "Phone", fieldName: "Phone"}
]
export default class PublisherComponent extends LightningElement {
    column = col;
    accData;
    error;

    //Get current page reference
    @wire(CurrentPageReference) pageRef;

    @wire(getAccount)
    getAllAccount(res){
        if(res.data){
            this.accData = res.data;
            this.error = undefined;
            console.log('---- account data -----', this.accData);
        }
        else if(res.error){
            this.accData = undefined;
            this.error = res.error;
            console.error('----- Error ----',res.error);
        }
    }

    handleRow(event){
        let accountId = event.detail.selectedRows[0].Id;
        console.log('----- AccountID -----', accountId);

        fireEvent(this.pageRef,"eventdetails",accountId); // For publish event with message
    }
        
}