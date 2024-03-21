public with sharing class CustomerAction {
    public CustomerAction() {

    }
    @AuraEnabled
    public static string createCustomer(Customer__c objCustomer,string recordId){
        Customer__c objCust =new Customer__c();
        if(String.isBlank(recordId)){
            objCust.Name=objCustomer.Name;
            objCust.Email__c=objCustomer.Email__c;
            objCust.Mobile__c=objCustomer.Mobile__c;
            objCust.Status__c=objCustomer.Status__c;
            if(objCust!=null){
                insert objCust;
            }
            return objCust.Id;
        }else{
            objCust.Id=recordId;
            objCust.Name=objCustomer.Name;
            objCust.Email__c=objCustomer.Email__c;
            objCust.Mobile__c=objCustomer.Mobile__c;
            objCust.Status__c=objCustomer.Status__c;
            update objCust;
            return objCust.Id;
        }
       
    }

    @AuraEnabled(cacheable=true)
    public static string createCustomerTest(Customer__c objCustomer,string recordId){
        Customer__c objCust =new Customer__c();
        if(String.isBlank(recordId)){
            objCust.Name=objCustomer.Name;
            objCust.Email__c=objCustomer.Email__c;
            objCust.Mobile__c=objCustomer.Mobile__c;
            objCust.Status__c=objCustomer.Status__c;
            if(objCust!=null){
                insert objCust;
            }
            return objCust.Id;
        }else{
            objCust.Id=recordId;
            objCust.Name=objCustomer.Name;
            objCust.Email__c=objCustomer.Email__c;
            objCust.Mobile__c=objCustomer.Mobile__c;
            objCust.Status__c=objCustomer.Status__c;
            update objCust;
            return objCust.Id;
        }
       
    }
}