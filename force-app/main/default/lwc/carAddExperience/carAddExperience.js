import { api, LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CarAddExperience extends NavigationMixin(LightningElement) {

    title
    review
    @api carRecordId;

    titleHandler(event) {
        this.title = event.target.value;
    }

    reviewHandler(event) {
        this.review = event.target.value;
    }
    reviewSubmitHandler() {

        console.log(this.carRecordId)
        console.log(this.title)
        console.log(this.review)

        var fields = { 'Car__c': this.carRecordId, 'Name': this.title, 'Experience__c': this.review }
        var objRecordInput = { 'apiName': 'Car_Experience__c', fields }

        createRecord(objRecordInput).then(result => {
            console.log(result.id)
            this.dispatchEvent(new ShowToastEvent({
                title: 'SUCCESS',
                message: 'Review Submitted',
                variant: 'success',
            }))

            const expAdded = new CustomEvent('experienceadded');
            this.dispatchEvent(expAdded);

            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: result.id,
                    objectApiName: 'Car_Experience__c', // objectApiName is optional
                    actionName: 'view'
                }
            });

        }).catch(error => {

            this.dispatchEvent(new ShowToastEvent({
                title: 'ERROR',
                message: 'Unable to Submit you review',
                variant: 'error',
            }))
        });
    }
}