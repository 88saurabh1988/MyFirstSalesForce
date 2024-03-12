public with sharing class IndustryPickListController {
    @AuraEnabled
    public static List<PicklistWrapper> getIndustryPickList(string objectApiName, string fieldApiName){
       List<PicklistWrapper> picklistWrapList = new List<PicklistWrapper>();

       Schema.SObjectType sobjectType = Schema.getGlobalDescribe().get(objectApiName);
       Schema.DescribeSObjectResult objDescribeSobject = sobjectType.getDescribe();
       Map<string,Schema.SObjectField> fields = objDescribeSobject.fields.getMap();
       Schema.DescribeFieldResult fieldResult = fields.get(fieldApiName).getDescribe();
       List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
       for(Schema.PicklistEntry picklistValue: ple){
            picklistWrapList.add(new PicklistWrapper(picklistValue.getLabel(), picklistValue.getValue()));
       }
       System.debug('----- PickList -----'+picklistWrapList);
       return picklistWrapList;
    }

    public class PicklistWrapper{
        @AuraEnabled public string label;
        @AuraEnabled public string value;
        public PicklistWrapper(string label, string value){
            this.label= label;
            this.value= value;
        }
    }
}