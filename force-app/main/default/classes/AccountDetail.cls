public with sharing class AccountDetail {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountDetail(){
        List<Account> acc;
        try {
            acc = [Select Id, Name, Phone from Account];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return acc;
        //return [Select Id, Name, Phone from Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getAccountCount(){
        List<AggregateResult> accCount = [Select Count(Id) from Account];
        return accCount;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountDetailByName(String strName){
        List<Account> acc;
        
        try {
            if(String.isBlank(strName) || String.isEmpty(strName))
            {
                acc = [Select Id, Name, Phone from Account];
            }
            else{
                String param= '%'+ strName +'%';
                acc = [Select Id, Name, Phone from Account where Name like :param];
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return acc;
    }
}