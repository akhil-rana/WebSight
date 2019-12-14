import { Component, OnInit } from "@angular/core";
import { AppService } from "../../app.service";
declare var webkitSpeechGrammarList: any;
declare var webkitSpeechRecognition: any;
@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.css"]
})
export class SearchInputComponent implements OnInit {
  static as: any;

  constructor(public as: AppService) {
    SearchInputComponent.speechInput = this.speechInput1;
    SearchInputComponent.as = as;

    speechSynthesis.speak(
      new SpeechSynthesisUtterance(
        "Hello user, Welcome to google voice search!, click on the mic to start or say 'search'"
      )
    );
    setTimeout(function() {
      SearchInputComponent.inputSearch();
    }, 6000);
  }

  ngOnInit() {
    if (this.as.resultRec1 == undefined) {
      this.as.resultRec1 = this.as.resultPass1.subscribe((name: string) => {
        this.focusE();
      });
    }
  }
  speechInput1;
  static speechInput;

  static inputSearch() {
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

    recognition.onresult = function(event) {
      var last = event.results.length - 1;
      var command = event.results[last][0].transcript;
      // message.textContent = "Voice Input: " + command + ".";
      // console.log(command);
      if (command == "search") {
        SearchInputComponent.voiceInput1();
      }

      // gSearch;
    };

    recognition.onspeechend = function() {
      recognition.stop();
    };
    recognition.onaudiostart = function() {
      // console.log("sound");
      var sound = new Audio();
      sound.src = "assets/sounds/didong.mp3";
      sound.play();
    };

    recognition.onerror = function(event) {
      console.log("Error occurred in recognition: " + event.error);
    };

    recognition.start();
  }
  static voiceInput1() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

    var grammar = "#JSGF V1.0;";
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    // recognition.continuous = true;
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = function(event) {
      var last = event.results.length - 1;
      var command = event.results[last][0].transcript;
      // message.textContent = "Voice Input: " + command + ".";
      // console.log(command);
      (<HTMLInputElement>document.getElementById("searchKey")).value = command;
      SearchInputComponent.gSearch();

      // gSearch;
    };

    recognition.onspeechend = function() {
      recognition.stop();
      (<HTMLInputElement>(
        document.getElementById("voiceButton")
      )).style.background = "RGBA(255, 64, 129, 1)";

      (<HTMLInputElement>(
        document.getElementById("voiceButton")
      )).disabled = false;
    };
    recognition.onaudiostart = function() {
      // console.log("sound");
      var sound = new Audio();
      sound.src = "assets/sounds/didong.mp3";
      sound.play();
      setTimeout(function() {
        (<HTMLInputElement>(
          document.getElementById("voiceButton")
        )).style.background = "rgb(51, 153, 102)";

        (<HTMLInputElement>(
          document.getElementById("voiceButton")
        )).disabled = true;
      }, 700);
    };

    recognition.onerror = function(event) {
      (<HTMLInputElement>(
        document.getElementById("voiceButton")
      )).style.background = "RGBA(255, 64, 129, 1)";

      (<HTMLInputElement>(
        document.getElementById("voiceButton")
      )).disabled = false;
      console.log("Error occurred in recognition: " + event.error);
    };

    recognition.start();

    // document.querySelector("#mic1").addEventListener("click", function() {
    //   recognition.start();
    // });
  }

  public static gSearch() {
    this.speechInput = (<HTMLInputElement>(
      document.getElementById("searchKey")
    )).value;
    this.as.speechInput = this.speechInput;
    this.as.gSearch();
  }
  gSearch1() {
    SearchInputComponent.gSearch();
  }
  voiceInput() {
    SearchInputComponent.voiceInput1();
  }
  focusE() {
    (<HTMLInputElement>document.getElementById("searchKey")).focus();
  }
}
