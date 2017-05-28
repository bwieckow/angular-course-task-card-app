import {Component, OnInit} from '@angular/core';

import {WeatherService} from '../service/weather.service';
import { Weather } from '../model/weather'
import { WEATHER_COLORS } from '../constants/constants'

declare var Skycons: any;

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]   // We can put it in a root module (app.module.ts) but this service is only for this
                                  // one component so it can be added here. For example when we want to reuse this component
                                  // we can just add it to project - no need to remember to add it to app.module.ts
})

export class WeatherComponent implements OnInit {
    pos: Position;
    weatherData = new Weather(null, null, null, null, null);
    currentSpeedUnit = "kph";
    currentTempUnit = "fahrenheit";
    currentLocation = "";
    icons = new Skycons();  // IDE complains because this is JavaScript library which doesn't have TypeScript definition file
    dataReceived = false;
    today: number = Date.now();

    constructor(private service: WeatherService) {   // This is dependency injection -- it is just passing required parameters

    }

    ngOnInit() {
        this.getCurrentLocation();
    }

    getCurrentLocation() {
        this.service.getCurrentLocation()
            .subscribe(position => {
                    this.pos = position;
                    this.getCurrentWeather();
                    this.getLocationName();
                    this.today = Date.now();
                },
                err => console.error(err));
    }

    getCurrentWeather() {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                    this.weatherData.temp = weather["currently"]["temperature"],
                    this.weatherData.summary = weather["currently"]["summary"],
                    this.weatherData.wind = weather["currently"]["windSpeed"],
                    this.weatherData.humidity = weather["currently"]["humidity"],
                    this.weatherData.icon = weather["currently"]["icon"]
                    console.log("Weather: ", this.weatherData);
                    this.setIcon();
                    this.dataReceived = true;
                },
                err => console.error(err));
    }

    getLocationName() {
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location => {
                console.log(location);
                this.currentLocation = location["results"][3]["formatted_address"];
                console.log("Name: ", this.currentLocation);
            })
    }

    toggleUnits() {
        this.toggleTempUnits();
        this.toggleSpeedUnits();
    }

    toggleTempUnits() {
        if(this.currentTempUnit == "fahrenheit") {
            this.currentTempUnit = "celsius";
        } else {
            this.currentTempUnit = "fahrenheit";
        }
    }

    toggleSpeedUnits() {
        if(this.currentSpeedUnit == "kph") {
            this.currentSpeedUnit = "mph";
        } else {
            this.currentSpeedUnit = "kph";
        }
    }

    setIcon() {
        this.icons.add("icon", this.weatherData.icon);  // icon is an ID of canvas - element where we want to place our icon
        this.icons.play();
    }

    setStyles(): Object {
        if(this.weatherData.icon) {
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"];
            return WEATHER_COLORS[this.weatherData.icon];
        } else {
            this.icons.color = WEATHER_COLORS["default"]["color"];
            return WEATHER_COLORS["default"];
        }
    }

    refresh() {
        this.getCurrentLocation();
    }
}