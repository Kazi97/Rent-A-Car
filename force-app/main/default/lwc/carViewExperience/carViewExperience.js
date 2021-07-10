import { LightningElement, api, track } from 'lwc';
// import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// import CAR_NAME_FIELD from '@salesforce/schema/Car_Experience__c.Car__r.Name'
// import TITLE_FIELD from '@salesforce/schema/Car_Experience__c.Name'
// import REVIEW_FIELD from '@salesforce/schema/Car_Experience__c.Experience__c'
// import OWNER_NAME_FIELD from '@salesforce/schema/Car_Experience__c.CreatedBy.Name'
// import DATE_FIELD from '@salesforce/schema/Car_Experience__c.CreatedDate'
import getExperiences from '@salesforce/apex/carSearchController.getExperiences'

// const fieldArray = [CAR_NAME_FIELD, TITLE_FIELD, REVIEW_FIELD, OWNER_NAME_FIELD, DATE_FIELD];
export default class CarViewExperience extends LightningElement {

    carId

    @track carExpRecord = []

    connectedCallback(){
        this.viewExperienceHandler();
    }

    @api get carRecordId(){
        return this.carId
    }

    set carRecordId(value){
        this.carId = value;
        this.viewExperienceHandler();
    }
    
    @api
    viewExperienceHandler(){

        getExperiences({carId : this.carId}).then(result =>{
            this.carExpRecord = result;
        }).catch(error=>{
            console.error(error);
        });        
    }

    // clickHandler() {
    //     console.log("View Experience")
    //     console.log(this.carId)
    //     console.log(this.carExpRecord.data)
       
    //     // console.log(this.carExpRecord.fields.CreatedById.Name.value)
    // }

    get ExpData(){
        if(this.carExpRecord.length > 0){
            return true;
        }return false;
    }

    // get ownerName(){

    //     return this.carExpRecord.fields.Created By ID.Name.value;
    // }
}