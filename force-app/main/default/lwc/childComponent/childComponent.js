import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api childVariable='';
    childMessage;
    firstName;
    lastName;

    handleChildChange(event){
        //this.childMessage= event.target.name;
        
        if(event.target.name==='fName'){
            this.firstName=event.target.value;
            console.log(this.fName);
        }
        else if(event.target.name==='lName'){
            this.lastName=event.target.value;
        }
        
        console.log("----- Child Message ----" +this.firstName);
        console.log("----- Child Message ----" +this.lastName);

        // let evt= CustomEvent('getchildmessage',{detail: {fName:this.firstName}});  //getChildMessage is a event name and it should be in small latter
        // this.dispatchEvent(evt);
    }

    handleClick(){
        let evt= CustomEvent('getchildmessage',{detail: {
            fName:this.firstName,lName:this.lastName
        }});  //getChildMessage is a event name and it should be in small latter
        this.dispatchEvent(evt);
    }
}