import { LightningElement } from 'lwc';
import getIndustryPickList from '@salesforce/apex/IndustryPickListController.getIndustryPickList'
export default class MultiPicklistSearch extends LightningElement {

    options;
    selected = []; // Selected value
    selectedAll= []; // Selected values array with the lable and values
    remainingAvailable= []; // Remaining available values
    data;

    connectedCallback(){
        this.fetchIndustryPickList();
    }

    fetchIndustryPickList(){
        getIndustryPickList({objectApiName:'Account', fieldApiName:'Industry'})
        .then(res=>{
            console.log('---- data ---', res);
            this.options=res;
            this.data = res;
        })
        .catch(err=>{
            console.error('--- Error ----',err);
        })
    }

    handleAvailableSearch(event){
        let searchVal = event.target.value;
        console.log('---- searchVal ----', searchVal);
        if(searchVal){
            let newOptions = this.searchData(this.data, searchVal, false);
            console.log('--- newOptions --- ', newOptions);
            this.data.forEach(element => {
                if(this.selected.filter(e=>e===element.value).length===1){
                    newOptions.push(element);
                }
            });
            console.log('--- newOptions --- ', newOptions);
            this.options = newOptions;
        }else{
            this.options=this.data;
        }
    }
    handleSelectedSearch(event){
        let searchval = event.target.value;
        let newOptions = [];
        if(searchval){
            this.selected = this.searchData(this.selectedAll, searchval, true);
            this.data.forEach(element =>{
                if(this.selected.filter(e=>e===element.value).length===1){
                    newOptions.push(element);
                }
            });
            this.remainingAvailable.forEach(element =>{
                newOptions.push(element);
            });
            this.options = newOptions;
        }else{
            let selectedVal = [];
            this.selectedAll.forEach(element => {
                selectedVal.push(element.value);
            });
            this.selected = selectedVal;
            this.options = this.data;
        }
    }
    handleChange(event){
        try{
        this.selected = event.detail.value;
        this.selectedAll = [];

        this.data.forEach(element => {
            this.selected.forEach(selectedVal => {
                if(element.value===selectedVal && this.selectedAll.filter(e=>e.value===selectedVal).length===0){
                    this.selectedAll.push(element);
                }
            });
        });
    }catch(error){
        console.error('---- Error --', error);
    }
    }

    searchData(allData, serachValue, returnValue){
        let filterData = [];
        try{
        
        allData.forEach(element=>{
            if(element.label.toLowerCase().indexOf(serachValue.toLowerCase())!==-1){
                if(returnValue){
                    filterData.push(element.value);
                    
                }else{
                    filterData.push(element);
                }
            }
        });
    }catch(error){
        console.error('--- error --',error);
    }
        return filterData;
    }
}