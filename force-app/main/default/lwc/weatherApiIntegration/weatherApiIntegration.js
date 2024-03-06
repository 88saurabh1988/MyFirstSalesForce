import { LightningElement } from 'lwc';
import getWeatherData from '@salesforce/apex/WeatherApiIntigration.getWeatherData';

export default class WeatherApiIntegration extends LightningElement {
    city;
    weatherIcon;
    weatherText;
    cityHandle(event){
        this.city= event.target.value;
    }
    weatherForcastHandle(){
        getWeatherData({city:this.city})
        .then(res=>{
            let weatherForcast=JSON.parse(res);
            this.weatherIcon=weatherForcast.current.condition.icon;
            this.weatherText=weatherForcast.current.condition.text;
        })
        .catch(err=>{
            this.weatherText="No matching city found.";
            console.error('---- Error ---- ',JSON.stringify(err));
        })
    }

}