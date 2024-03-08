public with sharing class DataInteraction {
    public DataInteraction() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountData(){
        return [select Id, Name, Phone, Website, AccountNumber from Account];
    }
}