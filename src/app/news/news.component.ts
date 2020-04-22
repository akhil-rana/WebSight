import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { WeatherComponent } from "src/app/news/weather/weather.component";
import { InshortsHeadlinesComponent } from "./inshorts-headlines/inshorts-headlines.component";
//import { setInterval } from "timers";
@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class NewsComponent implements OnInit {
  elementRef: any;
  stopper;
  constructor() {}
  statusFunc = 0;
  speakStat = 0;
  static speakStatWeather = 0;
  static speakStatWeather1 = 0;

  ngOnInit() {
    //console.log(this.statusFunc);
    // this.stopper = setInterval(() => {
    //   if (this.statusFunc == 1) {
    //     console.log(this.statusFunc);
    //     this.afterFirstSignal();
    //     clearInterval(this.stopper);
    //   }
    // }, 2000);
  }
  static afterFirstSignal() {
    let synth = window.speechSynthesis;
    let utterance1 = new SpeechSynthesisUtterance(
      "Say Weather, to repeat todays weather conditions, say Headlines to read the headlines , say Search to search news"
    );
    synth.speak(utterance1);

    // setTimeout(() => {
    var s = setInterval(function () {
      if (!synth.speaking) {
        clearInterval(s);
        NewsComponent.voiceInput1();
      }
    }, 1000);
    //   }, 3000);
  }

  static afterFirstSignal1() {
    let synth1 = window.speechSynthesis;
    let utterance1 = new SpeechSynthesisUtterance(
      "Say Weather, to repeat todays weather conditions, say Headlines to read the headlines , say Search to search news"
    );
    synth1.speak(utterance1);

    setTimeout(() => {
      var s = setInterval(function () {
        if (!synth1.speaking) {
          clearInterval(s);
          NewsComponent.voiceInput1();
        }
      }, 1000);
    }, 3000);
  }

  static voiceInput1() {
    var recognition = new SpeechRecognition();
    recognition.lang = "en-IN";

    recognition.onresult = function (event) {
      var last = event.results.length - 1;
      var vocalOption = event.results[last][0].transcript;
      console.log(vocalOption);
      if (vocalOption.includes("weather")) {
        //let url = "/google-speech";
        // window.open(url, "_self");
        WeatherComponent.onPageOpen1();
      } else if (vocalOption.includes("headlines")) {
        // let url = "/news";
        // window.open(url, "_self");
        InshortsHeadlinesComponent.onPageOpen1();
      } else if (vocalOption.includes("search")) {
        // let url = "/translate";
        // window.open(url, "_self");
      }
      //  else if (vocalOption.includes("repeat")) {
      //   let temper = 1;
      //   NewsComponent.onPageOpen1(temper);
      // }
      else {
        //let temper = 2;
        NewsComponent.afterFirstSignal();
      }
    };
    recognition.onspeechend = function () {
      recognition.stop();
    };
    recognition.onaudiostart = function () {
      // console.log("sound");
      var sound = new Audio();
      sound.src = "assets/sounds/didong.mp3";
      sound.play();
      //  NewsComponent.speakStat1 = 1;
    };

    recognition.onerror = function (event) {
      console.log("Error occurred in recognition: ");
    };

    recognition.start();
  }
}
