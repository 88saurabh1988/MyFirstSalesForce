import { LightningElement,wire } from 'lwc';
import {registerListener,unregisterAllListeners} from 'c/pubsub'; // For subscribe and listen event with message
import {CurrentPageReference} from 'lightning/navigation';
import getContact from '@salesforce/apex/PubsubController.getContact';

export default class ContactSubscriberComponent extends LightningElement {
    accountID;
    contactData;
    //Get current page reference
    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
        // For subscribe and listen event with message
        registerListener("eventdetails", this.contactDetails, this);
    }

    contactDetails(accountId){
        this.accountID = accountId;
        console.log('----- Subscriber Account Id ----',this.accountID);
        this.getAllContact();
    }

    getAllContact(){
        getContact({accountId:this.accountID})
        .then(res=>{
            console.log('------ subscribe contact -----', res);
            this.contactData = res;
        })
        .catch(err=>{
            console.error('---- subscribe Error -----', err);
        })
    }  

}