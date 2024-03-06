public with sharing class WeatherApiIntigration {
    public WeatherApiIntigration() {

    }
    @AuraEnabled
    public static string getWeatherData(string city){
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:WeatherApiNamedCred/current.json?q='+EncodingUtil.urlEncode(city,'UTF-8'));
        req.setMethod('GET'); 
        HttpResponse res = new HttpResponse();
        Http ht = new Http();
        System.debug('--- URL ---- '+req.getEndpoint());
        res = ht.send(req);
        System.debug('--- Weather Data ---- '+res.getBody());
        return res.getBody();
    }
}