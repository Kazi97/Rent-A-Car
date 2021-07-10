public with sharing class carSearchController {
    
    @AuraEnabled(cacheable=true)
    public static List<Car_Type__c> getCarType(){
         return [SELECT Id,Name FROM Car_Type__c];
    }

    @AuraEnabled(cacheable=true)
    public static List<Car__c> getCar(String carTypeId){

        if(String.isEmpty(carTypeId)){
            return [SELECT Id,Name,Picture__c,Contact__r.Name,Geolocation__latitude__s, Geolocation__longitude__s,Car_Type__r.Name,Description__c,Mileage__c,Per_Day_Rent__c,Available_For_Rent__c,	Build_Year__c FROM Car__c 
            WHERE Available_For_Rent__c = true];
        }else{
            return [SELECT Id, Name, Picture__c, Contact__r.Name,
                    Geolocation__latitude__s, Geolocation__longitude__s,Car_Type__r.Name,Description__c,Mileage__c,Per_Day_Rent__c,Available_For_Rent__c,Build_Year__c
                    FROM Car__c 
                    WHERE Available_For_Rent__c = true 
                    AND Car_type__c =: carTypeId];
        }
    }

    @AuraEnabled
    public static List<Car_Experience__c> getExperiences(String carId){
        return [SELECT Id,Car__r.Name,
                    Name,
                    Experience__c,
                    LastModifiedDate,
                    CreatedDate,
                    CreatedBy.Name,
                    CreatedBy.SmallPhotoUrl,
                    CreatedBy.CompanyName
               FROM Car_Experience__c
               WHERE Car__c  = :carId
               ORDER BY CreatedDate DESC];
    }
}