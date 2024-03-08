public with sharing class DynamicInteractionContact {
    public DynamicInteractionContact() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactData(string accountId){
        System.debug('----- rECORD ID ---- '+accountId);
       return [Select Id, Name, Phone, Email From Contact Where AccountId=:accountId];
    }
}