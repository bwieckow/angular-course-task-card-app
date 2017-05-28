"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var observable_1 = require('rxjs/observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var constants_1 = require('../constants/constants');
var WeatherService = (function () {
    function WeatherService(jsonp, http) {
        this.jsonp = jsonp;
        this.http = http;
    }
    WeatherService.prototype.getCurrentLocation = function () {
        if (navigator.geolocation) {
            return observable_1.Observable.create(function (observer) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    observer.next(pos); // next piece of data I wanna make observable whatever we put in brackets
                }),
                    function (err) {
                        return observable_1.Observable.throw(err);
                    };
            });
        }
        else {
            return observable_1.Observable.throw("Geolocation is not available.");
        }
    };
    // Observables are useful when we want to stream data (many queries) -- (enables to)provides data, subscriber watch/observe if there is new data
    // Promises are useful when we have one query
    WeatherService.prototype.getCurrentWeather = function (lat, long) {
        var url = constants_1.FORECAST_ROOT + constants_1.FORECAST_KEY + "/" + lat + "," + long;
        var queryParams = "?callback=JSONP_CALLBACK";
        return this.jsonp.get(url + queryParams)
            .map(function (data) { return data.json(); }) // map() takes the response data from the call and then transform in some way and provide it via Observable -- this how we get the response type of Observable
            .catch(function (err) {
            console.error("Unable to get weather data - ", err);
            return observable_1.Observable.throw(err.json());
        });
    };
    WeatherService.prototype.getLocationName = function (lat, long) {
        var url = constants_1.GOOGLE_ROOT;
        var queryParams = "?latlng=" + lat + "," + long + "&key=" + constants_1.GOOGLE_KEY;
        return this.http.get(url + queryParams) // We can use http.get because cross origin resource sharing (CORS) - depends on API if it has enabled possibility to get data via http
            .map(function (loc) { return loc.json(); })
            .catch(function (err) {
            console.error("Unable to get location", err);
            return observable_1.Observable.throw(err);
        });
    };
    WeatherService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp, http_1.Http])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;
//# sourceMappingURL=weather.service.js.map