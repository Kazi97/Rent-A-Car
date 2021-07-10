import { api, LightningElement, track, wire } from 'lwc';
import { getRecord,getFieldValue  } from 'lightning/uiRecordApi';
import ID_FIELD from '@salesforce/schema/Car__c.Id';
import NAME_FIELD from '@salesforce/schema/Car__c.Name';
import PICTURE_FIELD from '@salesforce/schema/Car__c.Picture__c';
import RENT_FIELD from '@salesforce/schema/Car__c.Available_For_Rent__c';
import OWNER_FIELD from '@salesforce/schema/Car__c.Contact__r.Name';
import { NavigationMixin } from 'lightning/navigation';

const fieldArray = [ID_FIELD,NAME_FIELD,PICTURE_FIELD,RENT_FIELD,OWNER_FIELD];

export default class CarDetailTab extends NavigationMixin(LightningElement) {

    @api carRecordId;
    // cars

    @wire(getRecord, {recordId: '$carRecordId', fields: fieldArray})
    carRecord
 
    get carName(){
        // return this.cars.fields.Name.value;
        return getFieldValue(this.carRecord.data, NAME_FIELD);
    }
    get carPicture(){
        // return this.cars.fields.Picture__c.value;
        return getFieldValue(this.carRecord.data, PICTURE_FIELD);
    }
    get carOwner(){
        // return this.cars.fields.Contact__r.Name.value;
        return getFieldValue(this.carRecord.data, OWNER_FIELD);
    }
    get rentAvailablity(){
        // return this.cars.fields.Available_For_Rent__c.value;
        return getFieldValue(this.carRecord.data, RENT_FIELD);
    }
    
    clickHandler(){
        console.log('carDetailTab')
        console.log(this.carRecord.data.fields.Id.value);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId : this.carRecord.data.fields.Id.value,
                objectApiName: 'Car__c',
                actionName: 'view'
            },
        });


    }
}