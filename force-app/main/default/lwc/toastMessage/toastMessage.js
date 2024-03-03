import { LightningElement } from 'lwc';
import {ShowToastEvent} from  'lightning/platformShowToastEvent';
import ToastContainer from 'lightning/toastContainer';

export default class ToastMessage extends LightningElement {
    
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

    showErrorHandle(){
        const evt= new ShowToastEvent({
            title: 'Error',
            message: 'Error occure when click the button',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    showSuccessHandle(){
        const evt= new ShowToastEvent({
            title: 'Success',
            message: 'Button clicked successfully',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    showWarningHandle(){
        const evt= new ShowToastEvent({
            title: 'Warning',
            message: 'Before click button make sure you have import toast message',
            variant: 'warning',
            mode: 'pester'
        });
        this.dispatchEvent(evt);
    }

    showInfoHandle(){
        const evt= new ShowToastEvent({
            title: 'Info',
            message: 'Just info: Toast message is show for user confirmation.',
            variant: 'info',
            mode: 'pester'
        });
        this.dispatchEvent(evt);
    }
}