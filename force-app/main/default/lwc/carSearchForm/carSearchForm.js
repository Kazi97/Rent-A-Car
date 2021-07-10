import { LightningElement, wire, track } from 'lwc';
import getCarType from '@salesforce/apex/carSearchController.getCarType'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation'
import {MessageContext, APPLICATON_SCOPE, publish} from 'lightning/messageService';
import channel from '@salesforce/messageChannel/SimpleMessageChannel__c'
export default class CarSearchForm extends NavigationMixin(LightningElement) {

    @track carTypes

    @wire(getCarType)
    wiredCarType({ data, error }) {
        if (data) {
            this.carTypes = [{ label: 'All Types', value: '' }]
            data.forEach(element => {
                const carType = {};
                carType.label = element.Name;
                carType.value = element.Id;
                this.carTypes.push(carType);
            });
        }
        else if (error) {
            this.dispatchEvent(new ShowToastEvent({
                title: "ERROR",
                message: error.body.message,
                variant: 'error'
            }));
            console.error.error
        }
    }

    createNewCarHandler() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:{
                objectApiName:'Car_Type__c',
                actionName: 'new'
            }
        });
    }

    @wire(MessageContext)
    context;

    carTypeSelectHandler(event){

        const payload = {recordId: event.detail.value};
        // console.log(payload);
        publish(this.context,channel,payload);

    }
}