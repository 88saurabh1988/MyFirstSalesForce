import { LightningElement, api, wire, track } from 'lwc';
import {fireEvent} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import getContact from '@salesforce/apex/PubsubController.getContact';
import getContactByContactId from '@salesforce/apex/PubsubController.getContactByContactId';

const col = [
    {label:'FirstName', fieldName:'FirstName', type:'text'},
    {label:'LastName', fieldName:'LastName', type:'text'},
    {label:'Phone', fieldName:'Phone', type:'phone'},
    {label:'Email', fieldName:'Email', type:'email'},
];
export default class ContactGalleryComponentDevendra extends LightningElement {
    @track preSelectedRows = [];
    @api recordId;
    accountID;
    contactData;
    column=col;
    contactGallery=true;
    contactGrid=false;

    //Get current page reference
    @wire(CurrentPageReference) pageRef;
    constructor(){
        super();
        console.log('--- connectedCallback ---');
        //registerListener("eventdetails", this.contactDetails, this);
        if(this.accountID != null && this.accountID != '' && this.accountID != undefined ){
            this.getAllContact();
        }
    }
    // contactDetails(accountId){
    //     this.accountID = accountId;
    //     console.log('----- Subscriber Account Id ----',this.accountID);
    //     this.getAllContact();
    // }
    getAllContact(){
        console.log('----- account ID -----',this.accountID)
        {
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
    
    lookupRecord(event){
        console.log('------ Selected Record from Account Lookup ------',event.detail.selectedRecord);
        if(event.detail.selectedRecord != undefined){
            console.log('------ Account Id ------',event.detail.selectedRecord.Id);
            this.accountID = event.detail.selectedRecord.Id;
            this.recordId = this.accountID;
            console.log('------ recordId ------',this.recordId);
            this.getAllContact();
        }
    }

    handleIconClick(event){
        // console.log('------ Contact Id ------',event.detail.selectedRecord.Id);
        // this.recordId = event.detail.selectedRecord.Id;
        this.recordId = event.target.getAttribute('data-recid');
        console.log('----- click ----', this.recordId);
        this.preSelectedRows = [];
        this.preSelectedRows.push(this.recordId);
        console.log('--- filter data ---',this.preSelectedRows);
        //this.getContactDetail();
        fireEvent(this.pageRef,"eventdetails",this.recordId);
    }

    preSelectedRowsList() {
        return this.contactData.filter(item => item.Id === this.recordId);
    }

    getContactDetail(){
        getContactByContactId({contactId:this.contactId})
            .then(res=>{
                console.log('------ subscribe contact -----', res);
                this.preSelectedRows = res;
            })
            .catch(err=>{
                console.error('---- subscribe Error -----', err);
            })
        }

    handleGrid(event){
        let datavalue = event.target.getAttribute('data-value');
        console.log('class name----',datavalue);
        console.log('querySelector----',this.template.querySelector('[data-value="active"]'));
        this.template.querySelector('[data-value="active"]').className='notActive';
        console.log('querySelector----',this.template.querySelector('[data-value="active"]'));
        switch(datavalue) {
            case 'active':
                this.template.querySelector('[data-value="active"]').classList.add('active');
                this.template.querySelector('[data-value="notActive"]').classList.remove('active');
                this.contactGrid=false;
                this.contactGallery=true;
               break;
            case 'notActive':
                this.template.querySelector('[data-value="notActive"]').classList.add('active'); 
                this.template.querySelector('[data-value="active"]').classList.remove('active'); 
                this.contactGallery=false;
                this.contactGrid=true;
            break;                    
           }
    }

    handleRow(event){
        let contactId = event.detail.selectedRows[0].Id;
        console.log('----- contactId -----', contactId);

        fireEvent(this.pageRef,"eventdetails",contactId); // For publish event with message
    }
}