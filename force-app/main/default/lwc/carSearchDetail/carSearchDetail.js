import { LightningElement, wire, track } from 'lwc';
import { subscribe, unsubscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import channel from '@salesforce/messageChannel/SimpleMessageChannel__c'
import getCar from '@salesforce/apex/carSearchController.getCar'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CarSearchDetail extends LightningElement {

    @track recordId
    subscribtion = null
    @wire(MessageContext)
    context1;

    connectedCallback() {
        this.subscribedMessage();
    }

    subscribedMessage() {

        if (!this.subscribtion) {
            this.subscribtion = subscribe(this.context1, channel, (message) => this.handleMessage(message), { scope: APPLICATION_SCOPE });
        }
    }

    handleMessage(message) {

        // console.log(message)
        this.recordId = message.recordId;
    }



    // clickHandler() {
    //     console.log(this.recordId);
    // }

    // @track getCarRecords
    @track cars
    @wire(getCar, { carTypeId: '$recordId' })
    wiredCarRecords({ data, error }) {
        if (data) {
            this.cars = data
            console.log(this.cars)
        }
        else if (error) {
            this.showToast("ERROR", error.body.message, 'error')
        }
    }

    get carFound() {
        if (this.cars) {
            return true
        }
        return false
    }

    disconnectedCallback() {
        this.unsubscribeMessage();
    }

    unsubscribeMessage() {
        unsubscribe(this.subscribtion);
        this.subscribtion = null;
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        }));
    }
}