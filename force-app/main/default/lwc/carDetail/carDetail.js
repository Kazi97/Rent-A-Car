import { LightningElement, track, wire } from 'lwc';
import { publish, subscribe, unsubscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import channel from '@salesforce/messageChannel/SimpleMessageChannel__c'


export default class CarDetail extends LightningElement {

    @track car;
    subscription = null;
    @wire(MessageContext)
    context
    

    connectedCallback() {
        this.subscribedMessage()
    }

    subscribedMessage() {
        if (!this.subscription) {
            this.subscription = subscribe(this.context,
                channel,
                (message) => { this.handleMessage(message) },
                { scope: APPLICATION_SCOPE });
        }
    }

    handleMessage(message) {
        this.car = message.car;
        //  = tempCar.Id;
    }

    @track selectedTabValue;
    
    tabChangeHandler(event) {
        this.selectedTabValue = event.target.value;
    }

    experienceAddHandler(){
        const carViewExperienceComp = this.template.querySelector('c-car-view-experience');
        if(carViewExperienceComp){
            carViewExperienceComp.viewExperienceHandler();
        }
    }

    // clickHandler() {
    //     console.log('From carDetail');
    //     console.log(this.car);
    // }


    disconnectedCallback() {
        this.unsubscribeMessage()
    }

    unsubscribeMessage() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}