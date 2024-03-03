import { LightningElement, wire, track } from 'lwc';
import getAccountDetail from '@salesforce/apex/AccountDetail.getAccountDetail';
import getAccountCount from '@salesforce/apex/AccountDetail.getAccountCount';
import Template1 from './myFirstLWC.html';
import Template2 from './Template2.html';

export default class MyFirstLWC extends LightningElement {
    parentMessage="";
    childMessage="";
    childDetail="";
    isNext = false;
    isPrevious=false;
    error;
    stack;

    @track writeValue;
    @wire(getAccountDetail)getAccountList;
    @wire(getAccountCount)getAccountCount;

    constructor(){
        super();
        console.log("Constructor -- Parent");
    }

    connectedCallback(){
        console.log("connected Callback-- Parent");
    }
    renderedCallback(){
        console.log("rendered Callback-- Parent");
    }
    render(){
        console.log(this.isNext);
        if(this.isNext){
            if(this.isPrevious){
                this.isNext = false;
                this.isPrevious = false;
                console.log(this.isNext);
                return Template1;
            }
            return Template2;
        }
        else{
            return Template1;
        }
    }
    disconnectedCallback(){
       console.log("Disconnected callback -- Parent");
    }

    errorCallback(error,stack){
        console.log("Error callback -- Parent");
        this.error=error;
        this.stack=stack;
    }


    parentDetails(event){
        this.parentMessage = 'Hi I am Saurabh.';
    }

    childDetails(event){
        this.childMessage = this.template.querySelector('c-child-my-first-l-w-c').clildMessage;
    }

    childMethod(event){
        this.childDetail = this.template.querySelector('c-child-my-first-l-w-c').childText();
    }

    textOnchange(event){
        this.writeValue = event.target.value;
    }
    next(){
        this.isNext=true;
    }
    previous(){
        this.isPrevious=true;
        console.log(this.isPrevious);
    }
}