import { LightningElement, api } from 'lwc';
import Name from '@salesforce/schema/Contact.Name';
import Phone from '@salesforce/schema/Contact.Phone';

export default class LightningDataServices extends LightningElement {
@api recordId;
fildes =[Name,Phone];
objectApiName = 'Contact';
name=Name;
phone=Phone;
}