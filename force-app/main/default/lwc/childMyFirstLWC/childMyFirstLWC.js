import { LightningElement, api } from 'lwc';

export default class ChildMyFirstLWC extends LightningElement {
    @api clildMessage = 'Hi I am Shlok.';
    @api parentMessage;
    details = "";

    disconnectedCallback(){
        console.log("Disconnected callback -- Child");
     }

    @api
    childText(event){
        this.details="My fathers name is Kumar Saurabh Das";
        return this.details;
    }
}