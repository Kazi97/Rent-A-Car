import { LightningElement, wire, track } from 'lwc';
import { publish, subscribe, unsubscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import channel from '@salesforce/messageChannel/SimpleMessageChannel__c'
import { getRecord } from 'lightning/uiRecordApi';

const fieldArray = ['Car__c.Geolocation__Latitude__s', 'Car__c.Geolocation__Longitude__s'];

export default class CarMapLocation extends LightningElement {

    @track car
    subscription = null;


    @wire(MessageContext) 
    context

    connectedCallback(){
        this.subscribeMessage();
    }

    subscribeMessage(){
        if(!this.subscription){
            this.subscription = subscribe(this.context,
                channel,
                message => this.handleMessage(message),
                {scope: APPLICATION_SCOPE});
        }        
    }

    handleMessage(message){
        this.car = message.car;
    }

    @track  mapMarkers = []
    
    carLocation
    latitude
    longitude
    @wire(getRecord, {recordId: '$car', fields : fieldArray})
        carLocationRecords({data,error}){
            if(data){
                this.carLocation = data;
                // this.latitiude = this.carLocation.fields.Geolocation__Latitude__s.value;
                // this.longitude = this.carLocation.fields.Geolocation__Longitude__s.value;
                this.mapMarkers = [{
                    location: {
                        Latitude: this.carLocation.fields.Geolocation__Latitude__s.value,
                        Longitude: this.carLocation.fields.Geolocation__Longitude__s.value
                    }
                }];
            }else if(error){
                console.error(error);
            }
        }

    

    // showLocationhandler(){
    //     console.log('Car Map');
    //     console.log(this.car)
    //     console.log(this.carLocation)
    //     console.log(this.latitiude);
    //     console.log(this.longitude);
    // }

    disconnectedCallback() {
        this.unsubscribeMessage()
    }

    
    unsubscribeMessage() {
        unsubscribe(this.subscription);
        this.subscription = null;        
    }
}