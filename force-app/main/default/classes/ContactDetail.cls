public with sharing class ContactDetail {
   @AuraEnabled(Cacheable=true)
   public static List<Contact> getContact(){
      List<Contact> contactList = [Select FirstName, LastName, Phone, Email from Contact];
      return contactList;
   }
}