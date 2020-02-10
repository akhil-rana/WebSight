import { Component, OnInit } from "@angular/core";
import { AppService } from "../../app.service";
import * as $ from "jquery";
@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent implements OnInit {
  constructor(private as: AppService) {}

  ngOnInit() {
    if (this.as.resultRec4 == undefined) {
      this.as.resultRec4 = this.as.resultPass4.subscribe((name: string) => {
        this.cityWeaRec();
      });
    }
    this.cityWeaPass();
    WeatherComponent.weatherWidgetTime();
    var now = new Date();
    var sec = now.getSeconds();
    var ssec = (60 - sec) * 1000;
    setTimeout(function() {
      WeatherComponent.weatherWidgetTime();
      setInterval(function() {
        WeatherComponent.weatherWidgetTime();
      }, 60000);
    }, ssec);
  }
  city;
  wCond;
  flag = 0;
  weather;
  temperature;
  latitude;
  longitude;
  feels_like;
  cityWeaPass() {
    // location.reload(true);
    var as = this.as;

    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
      var crd = pos.coords;
      as.weather(crd.longitude, crd.latitude);
    }
  }
  cityWeaRec() {
    this.weather = this.as.woutput;
    // console.log(this.weather);
    try {
      this.flag = 1;
      this.city = this.weather.name;
      this.wCond = this.weather.weather[0].main;
      var iconcode = this.weather.weather[0].icon;
      this.feels_like =
        "Feels like:  " + Math.round(this.weather.main.feels_like) + "° C";
      var iconurl = "owi owi-" + iconcode;
      $("#wicon").attr("class", iconurl);
      $("#wicon").css("display", "inline");
      this.temperature = Math.round(this.weather.main.temp) + "° C";
    } catch (error) {
      this.flag = 0;
      console.log(error);
    }
  }

  static weatherWidgetTime() {
    var now = new Date();
    var hours = now.getHours().toString();
    var minutes = now.getMinutes().toString();
    if (hours.length != 2) {
      hours = "0" + hours;
    }
    if (minutes.length != 2) {
      minutes = "0" + minutes;
    }
    // console.log("H: " + hours + "  M: " + minutes);
  }

  goBack() {
    window.history.back();
  }
}
