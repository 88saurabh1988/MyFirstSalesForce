public with sharing class Calculator {
    @AuraEnabled
    public static integer arithmeticOperationTest(integer a, integer b){
        return a+b;
    }
    @AuraEnabled
    public static integer arithmeticOperation(Operation objOperation){
        System.debug('---- objOperation ----- '+ objOperation);
       switch on objOperation.type {
        when 'Add'{
            return (objOperation.a + objOperation.b);
        }
        when 'Sub' {
            return (objOperation.a - objOperation.b);
        }
        when 'Mul' {
            return (objOperation.a * objOperation.b);
        }
        when 'Div' {
            return (objOperation.a / objOperation.b);
        }
        when else{
            return 0;
        }
       }
    }

    public enum OperationEnum { 
        Add, 
        Sub,
        Mul,
        Div 
    }
    
    public class Operation{
        @AuraEnabled
        public integer a { get; set; }
        @AuraEnabled
        public integer b { get; set; }
        @AuraEnabled
        public string type { get; set; }
    }
}