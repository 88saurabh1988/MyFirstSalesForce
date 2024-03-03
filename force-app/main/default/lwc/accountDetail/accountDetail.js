import { LightningElement, wire } from 'lwc';
import getAccountDetail from '@salesforce/apex/AccountDetail.getAccountDetail';
import getAccountDetailByName from '@salesforce/apex/AccountDetail.getAccountDetailByName';

export default class AccountDetail extends LightningElement {

    accountDetailData;
    error;
    accFilterValue='';


    //@wire(getAccountDetail)getAccountDetailsWire;

    @wire(getAccountDetailByName,{strName:'$accFilterValue'})
    getAccountDetailsWireByName({data,error}){
        console.log(data);
        if(data){
            console.log(data);
            this.accountDetailData=data;
        }else{
            console.log(error);
            this.error=error;
        }
    }

    connectedCallback(){
        // On load
        //this.getAccountDetails();
    }

    getAccountDetails(){

        getAccountDetail({})
        .then(result =>{
            this.accountDetailData=result;
        })
        .catch(error =>{
        this.error=error;
        });
    }

    filterAccount(event){
        this.accFilterValue = event.target.value;
        //this.filteredAcc();
    }

    // filteredAcc(){
    //     getAccountDetailByName({strName:this.accFilterValue})
    //     .then(result =>{
    //         console.log(result);
    //         this.accountDetailData=result;
    //     })
    //     .catch(error =>{
    //     this.error=error;
    //     });
    // }
}