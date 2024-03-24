import { LightningElement, api, wire } from 'lwc';
import Name from '@salesforce/schema/Contact.Name';
import Phone from '@salesforce/schema/Contact.Phone';
import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import Email from '@salesforce/schema/Contact.Email';
import MailingCity from '@salesforce/schema/Contact.MailingCity';
import MailingCountry from '@salesforce/schema/Contact.MailingCountry';
import {registerListener,unregisterAllListeners} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import getContactByContactId from '@salesforce/apex/ContactDetail.getContactByContactId';
import { RefreshEvent } from "lightning/refresh";

export default class ContactGalleryRightSideComponentDevendra extends LightningElement {
    @api recordId;
    fields =[FirstName,LastName,Phone,Email,MailingCity,MailingCountry];
    //fields =[Name,Phone];
    objectApiName = 'Contact';
    name = Name;
    firstName = FirstName;
    lastName = LastName;
    phone = Phone;
    email = Email;
    mailingCity = MailingCity;
    mailingCountry = MailingCountry;
    
    contactId;
    contactData;
    viewStatus = true;
    editStatus = false;
    mapMarkers = [];
    isLoding = false;

    //Get current page reference
    @wire(CurrentPageReference) pageRef;

    connectedCallback(){
        // For subscribe and listen event with message
        registerListener("eventdetails", this.contactDetails, this);
    }

    contactDetails(contactId){
        this.viewStatus = true;
        this.editStatus = false;
        this.recordId = contactId;
        this.contactId = contactId;
        console.log('----- Subscriber contact Id ----',this.recordId);
        this.getContactDetail();
        
    }

    getContactDetail(){
        getContactByContactId({contactId:this.contactId})
            .then(res=>{
                console.log('------ subscribe contact -----', res);
                this.contactData = res;
                this.mapMarkers=[{
                    location: {
                        City: res[0].MailingCity,
                        Country: res[0].MailingCountry
                    }
                }];
            })
            .catch(err=>{
                console.error('---- subscribe Error -----', err);
            })
        }

    handleView(event){
        let datavalue = event.target.name;
        console.log('class name----',datavalue);
        if(this.recordId){
            switch(datavalue) {
            case 'View':
                this.editStatus=false;
                this.viewStatus=true;
                this.dispatchEvent(new RefreshEvent());
               break;
            case 'Edit':
                this.viewStatus=false;
                this.editStatus=true;
            break;                    
            }
        }
    }

    closeModalHandle(){
        this.editStatus = false;
    }

    saveHandle(event){
        this.isLoding = true;
        event.preventDefault();
        const evt = event.detail.field;
        this.template.querySelector('lightning-record-edit-form').submit(evt);
        this.timeoutId = setTimeout(()=>this.doExpensiveThing(), 500); // Adjust as necessary
    }
    doExpensiveThing() {
        this.isLoding = false;
        this.editStatus=false;
    }
}