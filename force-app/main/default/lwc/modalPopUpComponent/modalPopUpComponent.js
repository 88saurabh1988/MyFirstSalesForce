import { LightningElement } from 'lwc';

export default class ModalPopUpComponent extends LightningElement {
    isModalOpen = false;
    isLoding = false;

    openModalHandle(){
        this.isModalOpen = true;
    }

    closeModalHandle(){
        this.isModalOpen = false;
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
        this.isModalOpen=false;
    }
}