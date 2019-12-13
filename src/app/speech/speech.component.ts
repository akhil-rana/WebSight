import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";

declare var webkitSpeechGrammarList: any;
declare var webkitSpeechRecognition: any;
@Component({
  selector: "app-speech",
  templateUrl: "./speech.component.html",
  styleUrls: ["./speech.component.css"]
})
export class SpeechComponent implements OnInit {
  static as: any;
  constructor(public as: AppService) {
    SpeechComponent.speechInput = this.speechInput1;
    SpeechComponent.as = as;
    // var synth = window.speechSynthesis;
    // var voices = synth.getVoices();
    // // var toSpeak = new SpeechSynthesisUtterance(txtInput.value);

    // synth.speak(new SpeechSynthesisUtterance("Hello, User"));
    // // var message = document.querySelector("#message");
    speechSynthesis.speak(new SpeechSynthesisUtterance("hello world"));
  }

  ngOnInit() {}
  speechInput1;
  static speechInput;

  public voiceInput() {
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
      SpeechComponent.gSearch();

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
    SpeechComponent.gSearch();
  }
}
