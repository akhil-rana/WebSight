import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { WeatherComponent } from "src/app/news/weather/weather.component";
import { InshortsHeadlinesComponent } from "./inshorts-headlines/inshorts-headlines.component";
import { Router } from "@angular/router";
import { SearchComponent } from "./search/search.component";
declare var webkitSpeechGrammarList: any;
declare var webkitSpeechRecognition: any;
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
  constructor(
    public router: Router // router:Router // private wc: WeatherComponent, // private ic: InshortsHeadlinesComponent
  ) {}
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
    let s = setInterval(() => {
      if (NewsComponent.queryS != undefined) {
        let url = "news/search/" + NewsComponent.queryS;
        clearInterval(s);
        this.router.navigateByUrl(url);
        // SearchComponent.voiceList();
      }
    }, 1000);
  }
  static afterFirstSignal() {
    let synth = window.speechSynthesis;
    let utterance1 = new SpeechSynthesisUtterance(
      "Say Weather, to repeat todays weather conditions, say Headlines to read the headlines , say Search to search news, say quit to go to homepage"
    );
    synth.speak(utterance1);

    //setTimeout(() => {
    let s = setInterval(function () {
      if (!synth.speaking) {
        clearInterval(s);
        NewsComponent.voiceInput1(this.router);
      }
    }, 2000);
    // }, 3000);
  }

  static afterFirstSignal1() {
    let synth1 = window.speechSynthesis;
    let utterance1 = new SpeechSynthesisUtterance(
      "Say Weather, to repeat todays weather conditions, say Headlines to read the headlines , say Search to search news, say quit to go to homepage"
    );
    synth1.speak(utterance1);

    setTimeout(() => {
      var s1 = setInterval(function () {
        if (!synth1.speaking) {
          clearInterval(s1);
          NewsComponent.voiceInput1(this.router);
        }
      }, 1000);
    }, 3000);
  }

  static queryS;
  static voiceInput1(router) {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

    var grammar = "#JSGF V1.0;";
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    //  var recognition = new SpeechRecognition();
    recognition.lang = "en-IN";

    recognition.onresult = function (event) {
      var last = event.results.length - 1;
      var vocalOption = event.results[last][0].transcript;
      console.log(vocalOption);
      if (vocalOption.includes("weather")) {
        //let url = "/google-speech";
        // window.open(url, "_self");
        WeatherComponent.onPageOpen1();
      } else if (vocalOption.includes("headline")) {
        // let url = "/news";
        // window.open(url, "_self");
        InshortsHeadlinesComponent.onPageOpen1();
      } else if (vocalOption.includes("search")) {
        // let url = "/translate";
        // router.navigateByUrl("/news/search/world");
        // window.open("/search/world", "_self");
        //NewsComponent.queryS = "world";
        NewsComponent.inputQuery();
      } else if (vocalOption.includes("quit")) {
        window.open("../", "_self");
      } else {
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

  static voiceInput2() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

    var grammar = "#JSGF V1.0;";
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    // var recognition = new SpeechRecognition();
    recognition.lang = "en-IN";

    recognition.onresult = function (event) {
      var last = event.results.length - 1;
      var vocalOption = event.results[last][0].transcript;
      console.log(vocalOption);
      NewsComponent.queryS = vocalOption;
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

  static inputQuery() {
    let synth2 = window.speechSynthesis;
    let utterance2 = new SpeechSynthesisUtterance(
      "Please say the query to search"
    );
    synth2.speak(utterance2);
    let s = setInterval(() => {
      if (!synth2.speaking) {
        clearInterval(s);
        NewsComponent.voiceInput2();
      }
    }, 1000);
  }
}
