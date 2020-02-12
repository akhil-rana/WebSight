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
    WeatherComponent.weatherWidgetDate();
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
      $("#WeatherWidget").css("display", "block");
      $("#wicon").attr("class", iconurl);
      $("#wicon").css("display", "inline");
      this.temperature = Math.round(this.weather.main.temp) + "° C";
      if ($("#widget").width() < 370) {
        $("#centerLine").css("border-right", "1px solid black");
        $("#centerLine").css("padding-right", "1em");
      }
    } catch (error) {
      this.flag = 0;
      console.log(error);
    }
  }

  static weatherWidgetTime() {
    let now = new Date();
    let hours = now.getHours().toString();
    let minutes = now.getMinutes().toString();
    if (hours.length != 2) {
      hours = "0" + hours;
    }
    if (minutes.length != 2) {
      minutes = "0" + minutes;
    }
    $("#hours").html(hours);
    $("#minutes").html(minutes);
  }

  static weatherWidgetDate() {
    let now = new Date();

    var month;
    switch (now.getMonth()) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
    }
    var day;
    switch (now.getDay()) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;
    }
    let date = now.getDate() + " " + month + " " + now.getFullYear();
    $("#date").html(date);
    $("#day").html(day);
  }

  goBack() {
    window.history.back();
  }
}
