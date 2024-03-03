import { LightningElement,wire,track } from 'lwc';
import getContact from '@salesforce/apex/ContactDetail.getContact';
import {ShowToastEvent} from  'lightning/platformShowToastEvent';
import ToastContainer from 'lightning/toastContainer';
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';

const datatablecolumns=[
    {label:'FirstName', fieldName: 'FirstName', type: 'text', sortable:'true', editable:'true'},
    {label:'LastName', fieldName: 'LastName', type: 'text', sortable:'true'},
    {label:'Phone', fieldName: 'Phone', type: 'phone', sortable:'true'},
    {label:'Email', fieldName: 'Email', type: 'email', sortable:'true'}
];
export default class LightningdataTableComponent extends LightningElement {
    columns = datatablecolumns;
    data;
    error;
    @track sortBy;
    @track sortDirection;
    @track sortdata;

    draftValues = [];

    @wire(getContact)
    contacts(res){
        console.log('------ check data -----',res);
        if(res.data){
            console.log('------ check data -----',res.data);
            this.data = res.data;
            this.error = undefined;
        }
        else{
            this.data = undefined;
            this.error = res.error;
        }
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

    doSorting(event){
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
    }

    sortData(fieldName,direction){
        let parseData = JSON.parse(JSON.stringify(this.data));
        //return the value stored in  the field
        let keyValue = (a)=>{
            return a[fieldName];
        };
        // checking revese direction
        let isReverse = direction === 'asc'?1:-1;
        //sorting data
        parseData.sort((x,y)=>{
            x = keyValue(x)?keyValue(x):''; //handnilg null value
            y = keyValue(y)?keyValue(y):'';
            // sorting value on direction
            return isReverse* ((x>y)-(y>x));
        });
        this.data = parseData;
    }

    handleSave(event){
        //convert datatable draft values into record objects
        this.draftValues = event.detail.draftValues;
        console.log('------ check draft values -----',this.draftValues);
        const inputsItem = this.draftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return {fields};
        });
        console.log('------ check inputsItem -----',inputsItem);

        try{
            // update all records in parallel
            const promises = inputsItem.map(recordInput => updateRecord(recordInput)); // import updateRecord
            Promise.all(promises).then(res => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title : 'Success',
                        message : 'Records updated successfully!!',
                        variant : 'success'
                    })
                );
                this.draftValues = [];
                return refreshApex(this.data);  // import 
            }).catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title : 'Error',
                        message : 'An error occured!! '+ error,
                        variant : 'error'
                    })
                );
            }).finally(()=>{
                this.draftValues = [];
            });
        }
        catch(error){
                console.log('------ error ----',error);
            }
    }

    // update(){
    //     const input =
    //     [
    //         {FirstName: "Devi1234", Id: "003IR00001ctpasYAA"},
    //         {FirstName: "Shanti12345", Id: "003IR00001cuUixYAE"}
    //     ];
    //     updateRecord(input);
    // }
}