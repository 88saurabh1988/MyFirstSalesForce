import { LightningElement } from 'lwc';

export default class CustomlookupResultComponent extends LightningElement {
    lookupRecord(event){
        console.log('------ Selected Record ------',event.detail.selectedRecord);
    }
}