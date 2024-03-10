import { LightningElement, api } from 'lwc';

export default class RecordPickerComponent extends LightningElement {
   @api objectApiName;
   @api filter;
   title;
   connectedCallback(){
        this.title='Record Picker('+this.objectApiName+')';
   }
    // filter = {
    //     criteria: [
    //         {
    //             fieldPath: 'Website',
    //             operator: 'eq',
    //             value: 'https://www.grenoble.fr',
    //         },
    //         {
    //             fieldPath: 'Website',
    //             operator: 'eq',
    //             value: null,
    //         },
    //         {
    //             fieldPath: 'Type',
    //             operator: 'ne',
    //             value: 'Partner',
    //         },
    //         {
    //             fieldPath: 'Parent.Name',
    //             operator: 'like',
    //             value: 'Acme%',
    //         },
    //     ],
    //     filterLogic: '(1 OR 2) AND NOT(4) AND 3',
    // };

    matchingInfo = {
        primaryField: { fieldPath: "Name" },
        //additionalFields: [{ fieldPath: "Name" }],
      };
    //   displayInfo = {
    //     additionalFields: ["Name"],
    //   };
      
    //   filter = {
    //     criteria: [
    //       {
    //         fieldPath: "Account.Name",
    //         operator: "like",
    //         value: "test modal%",
    //       },
    //     //   {
    //     //     fieldPath: 'Phone',
    //     //     operator: 'eq',
    //     //     value: "9898989898",
    //     //   }
    //     ],
    //     filterLogic: '1',
    //   };
    
      handleChange(event) {
        console.log(`Selected record: ${event.detail.recordId}`);
      }
}