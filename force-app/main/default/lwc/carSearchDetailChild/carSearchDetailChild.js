import { LightningElement, api, wire } from 'lwc';
import { MessageContext, APPLICATON_SCOPE, publish } from 'lightning/messageService';
import channel from '@salesforce/messageChannel/SimpleMessageChannel__c'

export default class CarSearchDetailChild extends LightningElement {
    @api carId

    @wire(MessageContext)
    context

    carDetailTransferHadler(event) {
        // console.log('carSearchDetailChild ')
        // console.log(this.carId)
        publish(this.context, channel, { car: this.carId });
        
    }
}