import { Component, OnInit, NgZone } from "@angular/core";
import { AppService } from "../../app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NewsComponent } from "src/app/news/news.component";
import { WeatherComponent } from "src/app/news/weather/weather.component";

@Component({
  selector: "app-features",
  templateUrl: "./features.component.html",
  styleUrls: ["./features.component.css"],
})
export class FeaturesComponent implements OnInit {
  constructor(private router: Router, private ngzone: NgZone) {
    FeaturesComponent.router1 = this.router;
    FeaturesComponent.ngzone1 = this.ngzone;
  }

  ngOnInit() {
    this.onPageOpen();
  }
  vocalOption;
  onPageOpen() {
    let synth = window.speechSynthesis;
    let utterance1 = new SpeechSynthesisUtterance(
      "Hello user,  Welcome to web sight , please say the option you want, 1, Google Search, 2, News, 3, Google mail, 4, Google Translate, 5, wikipedia, 6, youtube and music, say ,'RESULT NUMBER 1' to open result 1 and so, or say 'REPEAT'"
    );
    synth.speak(utterance1);
    // setTimeout(() => {
    var s = setInterval(function () {
      if (!synth.speaking) {
        clearInterval(s);
        FeaturesComponent.voiceInput1();
      }
    }, 1000);
    //  }, 1000);
  }
  static onPageOpen1(temper) {
    let synth = window.speechSynthesis;
    console.log(temper);
    if (temper == 1) {
      let utterance1 = new SpeechSynthesisUtterance(
        "Hello user,  Welcome to web sight , please say the option you want, 1, Google Search, 2, News, 3, Google mail, 4, Google Translate, 5, wikipedia, 6, youtube and music, say ,'RESULT NUMBER 1' to open result 1 and so, or say 'REPEAT'"
      );
      synth.speak(utterance1);
    }
    if (temper == 2) {
      let utterance1 = new SpeechSynthesisUtterance(
        "Sorry! I couldn't  hear you clearly, I will repeat , please say the option you want, 1, Google Search, 2, News, 3, Google mail, 4, Google Translate, 5, wikipedia, 6, youtube and music, say ,'RESULT NUMBER 1' to open result 1 and so, or say 'REPEAT'"
      );
      synth.speak(utterance1);
    }

    setTimeout(() => {
      var s = setInterval(function () {
        if (!synth.speaking) {
          clearInterval(s);
          FeaturesComponent.voiceInput1();
        }
      });
    }, 1000);
  }

  static router1;
  static ngzone1;
  static voiceInput1() {
    var recognition = new SpeechRecognition();
    recognition.lang = "en-IN";

    recognition.onresult = function (event) {
      var last = event.results.length - 1;
      var vocalOption = event.results[last][0].transcript;
      console.log(vocalOption);
      if (vocalOption.includes("1")) {
        let url = "/google-speech";
        window.open(url, "_self");
      } else if (vocalOption.includes("2")) {
        let url = "/news";
        window.open(url, "_self");
      } else if (vocalOption.includes("4")) {
        let url = "/translate";
        window.open(url, "_self");
      } else if (vocalOption.includes("5")) {
        let url = "/wikipedia";
        window.open(url, "_self");
      } else if (vocalOption.includes("repeat")) {
        let temper = 1;
        FeaturesComponent.onPageOpen1(temper);
      } else {
        let temper = 2;
        FeaturesComponent.onPageOpen1(temper);
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
    };

    recognition.onerror = function (event) {
      console.log("Error occurred in recognition: " + event.error);
    };

    recognition.start();
  }
}
