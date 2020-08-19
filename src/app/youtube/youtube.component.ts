import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { query } from "@angular/animations";
import { title } from "process";
import { $ } from "protractor";
//import { setInterval } from "timers";

declare var webkitSpeechGrammarList: any;
declare var webkitSpeechRecognition: any;
@Component({
  selector: "app-youtube",
  templateUrl: "./youtube.component.html",
  styleUrls: ["./youtube.component.css"],
})
export class YoutubeComponent implements OnInit {
  constructor(private http: HttpClient) {}
  static vidTitle;
  static vidDesc;
  static queryV;
  query = "";
  flag1 = 1;
  flag2 = 0;
  result;
  ngOnInit(): void {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    this.onPageOpen();
    let s = setInterval(() => {
      if (YoutubeComponent.queryV != undefined) {
        clearInterval(s);
        this.query = YoutubeComponent.queryV;
        this.send_query();
        //    this.afterWards();
      }
    }, 1000);
    document.body.appendChild(tag);
  }
  goBack() {
    window.history.back();
  }
  static vidViews;
  static vidLinks;
  send_query() {
    this.flag1 = 0;
    this.flag2 = 0;

    if (this.query != "") {
      let youtubequery = {
        input: this.query,
      };
      // this.flag = 0;

      this.http
        .post("https://websight-backend.herokuapp.com/youtube", youtubequery)
        // .post("http://localhost:8080/youtube", youtubequery)

        .subscribe(
          (response) => {
            // this.searchResult = response;
            // this.flag = 1;
            // this.flag2 = 1;
            this.result = Object.values(response);
            YoutubeComponent.vidTitle = this.result[0];
            YoutubeComponent.vidDesc = this.result[3];
            YoutubeComponent.vidViews = this.result[2];
            YoutubeComponent.vidLinks = this.result[1];
            console.log(YoutubeComponent.vidTitle);
            console.log(YoutubeComponent.vidDesc);

            console.log(this.result);
            // this.resultPass.emit();
            // this.resultPass1.emit();
            this.flag1 = 1;
            this.flag2 = 1;

            return;
          },
          (error) => {
            console.log("error during post is ", error);
          }
        );
    }
  }

  onPageOpen() {
    let synth = window.speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(
      "Say the search query for the video you want to see."
    );
    synth.speak(utterance);
    let s = setInterval(function () {
      if (!synth.speaking) {
        clearInterval(s);
        //WikipediaComponent.voiceInput1();
        console.log("OnpageOpen Youtube");
        YoutubeComponent.inputSearchQuery();
      }
    }, 1000);
  }

  static inputSearchQuery() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var recognition = new SpeechRecognition();
    var grammar = "#JSGF V1.0;";

    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.lang = "en-IN";

    recognition.onresult = function (event) {
      var last = event.results.length - 1;
      var vocalOption = event.results[last][0].transcript;
      YoutubeComponent.queryV = vocalOption;
      console.log(vocalOption);

      // this.query = vocalOption;
      //console.log(this.query);
      // this.send_query();
      let s = setInterval(() => {
        if (YoutubeComponent.vidDesc != undefined) {
          clearInterval(s);
          // YoutubeComponent.titleDictate();
          YoutubeComponent.videoListExplorer();
        }
      }, 1000);
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

  static videoListExplorer() {
    let synth = window.speechSynthesis;
    let utterance1 = new SpeechSynthesisUtterance(
      "Say NEXT to select next video, say Back to go to previous video, say to REED to know the details of the current video, say open to open the selected video."
    );
    synth.speak(utterance1);
    let s = setInterval(() => {
      if (!synth.speaking) {
        clearInterval(s);
        this.titleDictate();
      }
    });
  }

  static ChoiceMaker() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var recognition = new SpeechRecognition();
    var grammar = "#JSGF V1.0;";

    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.lang = "en-IN";

    recognition.onresult = function (event) {
      var last = event.results.length - 1;
      var vocalOption = event.results[last][0].transcript;
      console.log(vocalOption);
      if (vocalOption.includes("next")) {
        if (YoutubeComponent.marker1 < YoutubeComponent.vidTitle.length) {
          console.log("reached next of choice maker");
          //YoutubeComponent.marker1 = YoutubeComponent.marker1 + 1;
          YoutubeComponent.titleDictate();
        } else {
          let synth = window.speechSynthesis;
          let utterance = new SpeechSynthesisUtterance(
            "You have reached the end of the list. Please say back. reed. or open."
          );
          synth.speak(utterance);
          let s = setInterval(() => {
            if (!synth.speaking) {
              clearInterval(s);
              YoutubeComponent.marker1 = YoutubeComponent.marker1 - 1;
              YoutubeComponent.titleDictate();
            }
          }, 1000);
        }
      } else if (vocalOption.includes("back")) {
        if (YoutubeComponent.marker1 - 1 > 0) {
          console.log("reached back of choice maker");
          YoutubeComponent.marker1 = YoutubeComponent.marker1 - 2;
          YoutubeComponent.titleDictate();
        } else {
          let synth = window.speechSynthesis;
          let utterance = new SpeechSynthesisUtterance(
            "You have reached the start of the list. Please say next. reed. or open."
          );
          synth.speak(utterance);
          let s = setInterval(() => {
            if (!synth.speaking) {
              clearInterval(s);
              YoutubeComponent.marker1 = YoutubeComponent.marker1 - 1;
              YoutubeComponent.ChoiceMaker;
            }
          }, 1000);
        }
      } else if (vocalOption.includes("read") || vocalOption.includes("reed")) {
        let synth = window.speechSynthesis;
        // YoutubeComponent.marker1 = YoutubeComponent.marker1 - 1;
        let utterance = new SpeechSynthesisUtterance(
          "Title. " +
            YoutubeComponent.vidTitle[YoutubeComponent.marker1 - 1] +
            " . Description. " +
            YoutubeComponent.vidDesc[YoutubeComponent.marker1 - 1] +
            " . Views and Date." +
            YoutubeComponent.vidViews[YoutubeComponent.marker1 - 1] +
            ". Say next. back. open. or. reed."
        );
        synth.speak(utterance);
        let s = setInterval(() => {
          if (!synth.speaking) {
            clearInterval(s);
            YoutubeComponent.ChoiceMaker();
          }
        }, 1000);
      } else if (vocalOption.includes("open")) {
        let links = YoutubeComponent.vidLinks[YoutubeComponent.marker1];
        console.log(links);
        //document.querySelectorAll(links).click();
        // $(".list-group").$().click();
        location.href = links;
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

  static marker1 = 0;
  static titleDictate() {
    let j = 0;
    let synth = window.speechSynthesis;
    let utterance1;

    while (j < 1) {
      if (YoutubeComponent.marker1 < 24) {
        let temp = YoutubeComponent.marker1 + 1;
        utterance1 = new SpeechSynthesisUtterance(
          "Title  " +
            temp +
            " " +
            YoutubeComponent.vidTitle[YoutubeComponent.marker1] +
            ". Say next. back. reed. or open."
        );
        synth.speak(utterance1);
        YoutubeComponent.marker1 = YoutubeComponent.marker1 + 1;
        j++;
      } else {
        YoutubeComponent.marker1 = 0;
      }
    }
    j;
    // YoutubeComponent.headLinesDictate();
    var s = setInterval(function () {
      if (!synth.speaking) {
        clearInterval(s);
        YoutubeComponent.ChoiceMaker();
      }
    }, 1000);

    // YoutubeComponent.voiceInputChoice();
    //NewsComponent.afterFirstSignal1();
  }
}
