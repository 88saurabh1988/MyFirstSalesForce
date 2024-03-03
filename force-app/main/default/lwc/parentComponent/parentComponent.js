import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    message;
    messageFromChild;
    fName;
    lName;
    handleChange(event){
        this.message = event.target.value;
        console.log("------- Message -------"+ this.message);
    }
    handleChildMethod(event){
        //this.messageFromChild=event.detail; // when we create event in child we created detail 
        this.fName=event.detail.fName;
        this.lName=event.detail.lName;
        console.log('Parent First Name - '+this.fName);
        console.log('Parent Last Name - '+this.lName);
    }
}