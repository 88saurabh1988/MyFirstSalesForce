import { LightningElement } from 'lwc';
import getAccountBySearchKey from '@salesforce/apex/AccountDetail.getAccountBySearchKey';

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