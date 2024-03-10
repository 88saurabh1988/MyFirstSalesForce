import { LightningElement, wire } from 'lwc';
import {registerListener,unregisterAllListeners} from 'c/pubsub'; // For subscribe and listen event with message
import {CurrentPageReference} from 'lightning/navigation';
import getCase from '@salesforce/apex/PubsubController.getCase';

export default class SubscriberComponent extends LightningElement {
    accountID;
    caseData;
    //Get current page reference
    @wire(CurrentPageReference) pageRef;

    connectedCallback(){
        // For subscribe and listen event with message
        registerListener("eventdetails", this.caseDetails, this);
    }

    caseDetails(accountId){
        this.accountID = accountId;
        console.log('----- Subscriber Account Id ----',this.accountID);
        this.getAllCases();
    }

    getAllCases(){
        getCase({accountId:this.accountID})
        .then(res=>{
            console.log('------ subscribe case -----', res);
            this.caseData = res;
        })
        .catch(err=>{
            console.error('---- subscribe Error -----', err);
        })
    }    
}