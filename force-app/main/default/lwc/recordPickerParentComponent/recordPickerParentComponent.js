import { LightningElement } from 'lwc';

export default class RecordPickerParentComponent extends LightningElement {
    contactFilter = {
        criteria: [
          {
            fieldPath: "Name",
            operator: "like",
            value: "test%",
          },
        //   {
        //     fieldPath: 'Phone',
        //     operator: 'eq',
        //     value: "9898989898",
        //   }
        ],
        filterLogic: '1',
      };

      accountFilter;

      leadFilter = {
        criteria: [
          {
            fieldPath: "Account.Name",
            operator: "like",
            value: "test modal%",
          },
        //   {
        //     fieldPath: 'Phone',
        //     operator: 'eq',
        //     value: "9898989898",
        //   }
        ],
        filterLogic: '1',
      };

      opportunityFilter = {
        criteria: [
          {
            fieldPath: "Account.Name",
            operator: "like",
            value: "test modal%",
          },
        //   {
        //     fieldPath: 'Phone',
        //     operator: 'eq',
        //     value: "9898989898",
        //   }
        ],
        filterLogic: '1',
      };
}