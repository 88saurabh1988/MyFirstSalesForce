import { LightningElement } from 'lwc';
import createCustomer from '@salesforce/apex/CustomerAction.createCustomer';
import objCust from '@salesforce/schema/Customer__c';
import {ShowToastEvent} from  'lightning/platformShowToastEvent';
import ToastContainer from 'lightning/toastContainer';
import {NavigationMixin} from 'lightning/navigation';

export default class CreateUpdateDeleteComponent extends NavigationMixin(LightningElement) {
    recordId;
    isLoading=false;
    error;
    get statusOption(){
        return [
            {label: 'Active' , value: 'Active'},
            {label: 'InActive' , value: 'InActive'},
        ];
    }

    connectedCallback(){

        // top-left
        // top-right
        // top-center
        // bottom-left
        // bottom-right
        // bottom-center

        const toastContainer= ToastContainer.instance();
        toastContainer.maxShown = '3';
        toastContainer.toastPosition = 'top-right';
    }

    onChangeHandle(event){
        if(event.target.name==='Name'){
            objCust.Name= event.target.value;
        }else if(event.target.name==='Mobile'){
            objCust.Mobile__c= event.target.value;
        }else if(event.target.name==='Email'){
            objCust.Email__c= event.target.value;
        }else if(event.target.name==='Status'){
            objCust.Status__c= event.target.value;
        }
        console.log('---- customer value ----',objCust);
    }

    createCustomer(){
        this.isLoading=true;
        createCustomer({objCustomer:objCust,recordId:this.recordId})
        .then(res=>{
            this.isLoading=false;
            console.log(res);
            this.recordId=res;
            this.showSuccessHandle();
        })
        .catch(error=>{
            this.isLoading=false;
            this.error=error;
            console.error(error);
            this.showErrorHandle();
        });
    }

    showSuccessHandle(){
        const evt= new ShowToastEvent({
            title: 'Success',
            message: 'Customer Data Saved Successfully. Id: '+ this.recordId,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    showErrorHandle(){
        const evt= new ShowToastEvent({
            title: 'Error',
            message: 'Error occure: '+ this.error,
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    //Nevigation to view detal standard page given by salesforce
    nevigateToView(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage', // when call view page pass 'standard__recordPage'
            attributes:{
                recordId: this.recordId, // recordId is used for showing single record data
                objectApiName: 'Customer__c',
                actionName: 'view'
            }
        })
    }
    // Open standard edit page which is given by salesforce for every object
    nevigateToEdit(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage', // when call edit page pass 'standard__recordPage'
            attributes:{
                recordId: this.recordId, // recordId is used for showing single record data
                objectApiName: 'Customer__c',
                actionName: 'edit'
            }
        })
    }

    // Open standard new page which is given by salesforce for every object
    nevigateToNew(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',  // when call new page pass 'standard__objectPage'
            attributes:{
                recordId: this.recordId,  // recordId is used for showing single record data
                objectApiName: 'Customer__c',
                actionName: 'new'
            }
        })
    }

    // Open standard All reecord page which is given by salesforce for every object
    nevigateToAllRecord(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',  // when call new page pass 'standard__objectPage'
            attributes:{
                objectApiName: 'Customer__c',
                actionName: 'list'  // list for shwing all records in list
            },
            state:{
                filterName: 'Recent' // All data filtered by recent first
            }
        })
    }

    // Open standard All reecord page which is given by salesforce for every object
    nevigateToHome(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',  // when call new page pass 'standard__objectPage'
            attributes:{
                objectApiName: 'Customer__c',
                actionName: 'home'  // list for shwing all records in list
            }
        })
    }

    // Nevigate to tab
    nevigateToCustomerRegistrationTab(){
        this[NavigationMixin.Navigate]({
            type:'standard__navItemPage',
            attributes:{
                apiName: 'Customer'  // Tab apiname where need to nevigate in my case nevigate to Customer Registration page
            }
        })
    }

      // Nevigate to any URL
      nevigateToURL(){
        this[NavigationMixin.Navigate]({
            type:'standard__webPage', // Use standard__webPage for nevigate to any URL
            attributes:{
                "url": "https://www.lightningdesignsystem.com/icons/"  // nevigate to any URL
            }
        })
    }
}