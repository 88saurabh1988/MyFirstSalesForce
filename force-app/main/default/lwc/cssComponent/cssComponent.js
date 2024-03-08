import { LightningElement } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader';
import externalCss from '@salesforce/resourceUrl/LWCCostumCss'; //LWCCostumCss is a static resource Name

export default class CssComponent extends LightningElement {
    myName;
    fullName;
    renderedCallback(){
        Promise.all([
            loadStyle(this,externalCss)
        ]).then(()=>{
            console.log('----- File Css  ----');
        })
        .catch(error=>{
            console.error('---- Error ----', error);
        })
    }
    nameHandle(){
        this.myName="myName";
        this.fullName="";
    }
    fullNameHandle(){
        this.myName="";
        this.fullName="fullName";
    }
}