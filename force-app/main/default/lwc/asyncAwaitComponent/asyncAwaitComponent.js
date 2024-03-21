import { LightningElement } from 'lwc';
import getAccountBySearchKey from '@salesforce/apex/AccountDetail.getAccountBySearchKey';
import USER_ID from '@salesforce/user/Id';
import USER_ID_FIELD from '@salesforce/schema/User.Id';
import USER_FIRST_NAME_FIELD from '@salesforce/schema/User.FirstName';

const col = [
    {label:'Name', fieldName:'Name', type:'text'},
    {label:'Phone', fieldName:'Phone', type:'Phone'},
    {label:'Website', fieldName:'Website', type:'url'},
    {label:'Fax', fieldName:'Fax', type:'Phone'},
];
export default class AsyncAwaitComponent extends LightningElement {
    column=col;
    data;
    connectedCallback(){
        console.log('----- Current UserID ----',USER_ID);
        console.log('----- Current UserID ----',USER_ID_FIELD);
        console.log('----- Current USER_FIRST_NAME_FIELD ----',USER_FIRST_NAME_FIELD); 
        
        this.handleLoad();
    }
    
    async handleLoad(){
        let param = 'test';
        try{
            let getData = await getAccountBySearchKey({'searchkey':param});
            this.data = getData;
            console.log('--- Data ---', this.data);
        }
        catch(err){
            console.error('---- Error ----',err);
        }
    }
}