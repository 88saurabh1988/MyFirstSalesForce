public with sharing class PubsubController {
    public PubsubController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccount(){
       return [Select Id, Name, Phone From Account];
    }

    @AuraEnabled
    public static List<Case> getCase(string accountId){
       return [Select Id, AccountId, CaseNumber, Account.Name, Status, Origin From Case Where AccountId=:accountId];
    }

    @AuraEnabled
    public static List<Contact> getContact(string accountId){
       return [Select Id, AccountId, Account.Name,FirstName, LastName, Email, Phone From Contact Where AccountId=:accountId];
    }

    @AuraEnabled
    public static List<Contact> getContactByContactId(string contactId){
       return [Select Id, AccountId, Account.Name,FirstName, LastName, Email, Phone From Contact Where Id=:contactId];
    }
}