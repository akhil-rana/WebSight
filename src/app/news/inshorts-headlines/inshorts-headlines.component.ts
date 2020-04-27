import { AppService } from "../../app.service";
import { Component, OnInit, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs/internal/Subscription";
import { NewsComponent } from "../news.component";
// import { WeatherComponent } from "../weather/weather.component";
@Component({
  selector: "app-inshorts-headlines",
  templateUrl: "./inshorts-headlines.component.html",
  styleUrls: ["./inshorts-headlines.component.css"],
})
export class InshortsHeadlinesComponent implements OnInit {
  constructor(private http: HttpClient, private as: AppService) {}
  // flag = 0;
  // weatherEnd = this.wc.weatherEndRec;
  marker = 0;
  temText;
  temContent;
  static marker1 = 0;
  static texts1;
  static content1;
  static errorCond = 0;
  ngOnInit() {
    //if (this.as.weatherEndRec == undefined) {
    // console.log("hello");
    // console.log(this.wc.weatherEndRec);
    if (this.headLines == undefined) {
      this.inshorts();
      this.temText = this.texts;
      //  InshortsHeadlinesComponent.texts1 = this.texts;
      console.log("Reached inshorts");
      // this.onPageOpen(this.texts);
    }
    // }
  }
  imageUrl(img) {
    return "url(" + img + ")";
  }
  onPageOpen() {
    let j = 0;
    let synth = window.speechSynthesis;
    let utterance1;
    console.log(this.texts);
    while (j < 3) {
      if (this.marker < 24) {
        let temp = this.marker + 1;
        utterance1 = new SpeechSynthesisUtterance(
          "HeadLine  " + temp + " " + this.texts[this.marker]
        );
        synth.speak(utterance1);
        this.marker = this.marker + 1;
        j++;
      } else {
        this.marker = 0;
      }
    }
    j;
  }

  static onPageOpen1() {
    let j = 0;
    let synth = window.speechSynthesis;
    let utterance1;
    console.log(InshortsHeadlinesComponent.texts1);
    while (j < 3) {
      if (InshortsHeadlinesComponent.marker1 < 24) {
        let temp = InshortsHeadlinesComponent.marker1 + 1;
        utterance1 = new SpeechSynthesisUtterance(
          "HeadLine  " +
            temp +
            " " +
            InshortsHeadlinesComponent.texts1[
              InshortsHeadlinesComponent.marker1
            ]
        );
        synth.speak(utterance1);
        InshortsHeadlinesComponent.marker1 =
          InshortsHeadlinesComponent.marker1 + 1;
        j++;
      } else {
        InshortsHeadlinesComponent.marker1 = 0;
      }
    }
    j;
    // InshortsHeadlinesComponent.headLinesDictate();
    var s = setInterval(function () {
      if (!synth.speaking) {
        clearInterval(s);
        InshortsHeadlinesComponent.ChoiceMaker();
      }
    }, 1000);

    // InshortsHeadlinesComponent.voiceInputChoice();
    //NewsComponent.afterFirstSignal1();
  }

  static headLinesDictate() {
    let synth1 = window.speechSynthesis;
    let utterance1;
    console.log("HeadLines Dictate");
    utterance1 = new SpeechSynthesisUtterance(
      "Please say which headlines content do you want me to read ?"
    );
    synth1.speak(utterance1);
    var s = setInterval(function () {
      if (!synth1.speaking) {
        clearInterval(s);
        InshortsHeadlinesComponent.voiceInput1();
      }
    }, 1000);
  }

  static voiceInput1() {
    var recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    let synth2 = window.speechSynthesis;
    let utterance2;
    recognition.onresult = function (event) {
      var last = event.results.length - 1;
      var vocalOption = event.results[last][0].transcript;
      console.log(vocalOption);
      let matches = vocalOption.match(/(\d+)/);
      if (TypeError && matches == null) {
        let synth4 = window.speechSynthesis;
        let utterance4;
        console.log(TypeError);
        //TypeError.
        utterance4 = new SpeechSynthesisUtterance(
          "Please a say number in the sentence"
        );
        synth4.speak(utterance4);
        setTimeout(() => {
          var s4 = setInterval(function () {
            if (!synth4.speaking) {
              clearInterval(s4);
              InshortsHeadlinesComponent.voiceInput1();
            }
          }, 1000);
        }, 500);
      }
      let numb = matches[0];
      let numbn = Number(numb);
      let temp;
      if (typeof numbn == "number") {
        temp = numbn - 1;
        utterance2 = new SpeechSynthesisUtterance(
          "HeadLine  " +
            numbn +
            " " +
            InshortsHeadlinesComponent.texts1[temp] +
            " " +
            InshortsHeadlinesComponent.content1[temp]
        );
        synth2.speak(utterance2);
        setTimeout(() => {
          let s3 = setInterval(function () {
            if (!synth2.speaking) {
              clearInterval(s3);
              console.log("Entered the regular way");
              InshortsHeadlinesComponent.ChoiceMaker();
            }
          });
        }, 2000);
      }
      //  else {
      //   utterance2 = new SpeechSynthesisUtterance("Please say the number only");
      //   synth2.speak(utterance2);
      //   setTimeout(() => {
      //     var s1 = setInterval(function () {
      //       if (!synth2.speaking) {
      //         clearInterval(s1);
      //         InshortsHeadlinesComponent.voiceInput1();
      //       }
      //     }, 1000);
      //   }, 2000);
      // }
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
      InshortsHeadlinesComponent.errorCond = 3;
    };

    recognition.start();
  }

  static voiceInputChoice() {
    var recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    // synth5.speak(utterance5);
    recognition.onresult = function (event) {
      var last = event.results.length - 1;
      var vocalOption = event.results[last][0].transcript;
      console.log(vocalOption);
      if (vocalOption.includes("next")) {
        InshortsHeadlinesComponent.onPageOpen1();
      } else if (vocalOption.includes("read")) {
        InshortsHeadlinesComponent.headLinesDictate();
      } else if (vocalOption.includes("quit")) {
        NewsComponent.afterFirstSignal1();
      } else {
        InshortsHeadlinesComponent.ChoiceMaker();
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

  static ChoiceMaker() {
    let synth5 = window.speechSynthesis;
    let utterance5 = new SpeechSynthesisUtterance(
      "Please say NEXT to listen the next set of headlines, say READ to listen the headline in details, say QUIT to leave"
    );
    synth5.speak(utterance5);
    var s = setInterval(function () {
      if (!synth5.speaking) {
        clearInterval(s);
        InshortsHeadlinesComponent.voiceInputChoice();
      }
    }, 1000);
  }

  headLines;
  nothing;
  flag = 0;
  texts;
  content;
  inshorts() {
    this.http
      .post(
        "https://websight-backend.herokuapp.com/news/newsLetter",
        this.nothing
      )
      .subscribe(
        (response) => {
          //console.log(response);
          this.headLines = response;

          this.texts = this.headLines.texts;
          this.content = this.headLines.content;
          this.flag = 1;
          InshortsHeadlinesComponent.texts1 = this.headLines.texts;
          InshortsHeadlinesComponent.content1 = this.headLines.content;
          //this.temText = this.temText;
          //console.log(this.texts);
          //this.headLines=response.map()
          // this.onPageOpen();
        },
        (error) => {
          console.log("error", error);
        }
      );
  }
}
