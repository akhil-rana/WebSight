import { Component, OnInit, EventEmitter } from "@angular/core";
import { AppService } from "../../app.service";
import { HttpClient } from "@angular/common/http";
import { NewsComponent } from "../news.component";
import * as $ from "jquery";
import { Subscription } from "rxjs/internal/Subscription";
//import { CompControlComponent } from "../comp-control/comp-control.component";
//import { setInterval } from "timers";
//import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
// import { EventEmitter } from "protractor";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"],
})
export class WeatherComponent implements OnInit {
  constructor(
    private as: AppService,
    private http: HttpClient // private ctrl: CompControlComponent, //private nc: NewsComponent
  ) {
    if (this.as.resultRec4 == undefined) {
      this.as.resultRec4 = this.as.resultPass4.subscribe((name: string) => {
        this.cityWeaRec();
        this.onPageOpen();
      });
    }
    // this.onPageOpen();
  }
  city;

  wCond;
  promises;
  flag = 0;
  flag2 = 0;
  weather;
  temperature;
  latitude;
  longitude;
  feels_like;

  static weather1;
  static temperature1;
  static latitude1;
  static longitude1;
  static feels_like1;
  static city1;

  ngOnInit() {
    if (this.as.resultRec4 == undefined) {
      this.as.resultRec4 = this.as.resultPass4.subscribe((name: string) => {
        //this.cityWeaRec();
        // this.onPageOpen();
      });
    }
    this.cityWeaPass();
    WeatherComponent.weatherWidgetTime();
    WeatherComponent.weatherWidgetDate();
    var now = new Date();
    var sec = now.getSeconds();
    var ssec = (60 - sec) * 1000;
    setTimeout(function (res) {
      WeatherComponent.weatherWidgetTime();
      setInterval(function () {
        WeatherComponent.weatherWidgetTime();
      }, 60000);
      // console.log(this.as.woutput);
      // console.log(this.as.flagger);
      return 1;
    }, ssec);

    // setTimeout(() => {
    //   let s = setInterval(function() {
    //     console.log(this.flag);
    //     console.log("present here");
    //     if (this.flag == 1) {
    //       this.onPageOpen();
    //       clearInterval(s);
    //     }
    //   });
    // }, 1000);
  }
  cityWeaPass() {
    // location.reload(true);
    var as = this.as;

    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
      var crd = pos.coords;
      as.weather(crd.longitude, crd.latitude);
    }
  }
  onPageOpen() {
    let synth = window.speechSynthesis;
    let utterance1 = new SpeechSynthesisUtterance(
      "Hello user. today's weather condition in " +
        this.city +
        "is .  . " +
        this.wCond +
        ". Temperature ," +
        this.temperature +
        "elsius. " +
        this.feels_like
    );
    synth.speak(utterance1);
    // setTimeout(() => {});

    this.as.weatherEndPass.emit();
    // console.log(1);
    this.flag2 = 1;
    //this.nc.statusFunc = 1;
    NewsComponent.speakStatWeather = 1;
    let s = setInterval(() => {
      if (!synth.speaking) {
        clearInterval(s);
        NewsComponent.afterFirstSignal1();
      }
    }, 1000);
  }

  static onPageOpen1() {
    let synth = window.speechSynthesis;
    let utterance1 = new SpeechSynthesisUtterance(
      " today's weather condition in " +
        WeatherComponent.city1 +
        "is .  . " +
        WeatherComponent.weather1 +
        ". Temperature ," +
        WeatherComponent.temperature1 +
        "elsius. " +
        WeatherComponent.feels_like1
    );
    synth.speak(utterance1);
    // setTimeout(() => {});
    NewsComponent.speakStatWeather1 = 1;
    let s = setInterval(() => {
      if (!synth.speaking) {
        clearInterval(s);
        NewsComponent.afterFirstSignal1();
      }
    }, 1000);
    // NewsComponent.afterFirstSignal1();
  }

  cityWeaRec() {
    this.weather = this.as.woutput;
    // console.log(this.weather);
    try {
      this.flag = 1;
      this.city = this.weather.name;
      this.wCond = this.weather.weather[0].main;
      // console.log(this.wCond);
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

      WeatherComponent.feels_like1 = this.feels_like;
      WeatherComponent.weather1 = this.wCond;
      WeatherComponent.temperature1 = this.temperature;
      WeatherComponent.city1 = this.city;

      //console.log(this.flag);
      // this.flag2 = 1;
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
}
