import { Component, OnInit } from "@angular/core";
import { AppService } from "../../app.service";
// import wordsToNumbers from "words-to-numbers";
declare var webkitSpeechGrammarList: any;
declare var webkitSpeechRecognition: any;
@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"]
})
export class SearchResultsComponent implements OnInit {
  static as: any;

  constructor(public as: AppService) {
    // console.log(wordsToNumbers("nineteen"));

    SearchResultsComponent.as = this.as;
  }

  resultObject = { titles: [], link: "", urls: [] };
  ngOnInit() {
    if (this.as.loadingRec == undefined) {
      this.as.loadingRec = this.as.loadingPass.subscribe((name: string) => {
        this.startLoading();
      });
    }
    if (this.as.resultRec == undefined) {
      this.as.resultRec = this.as.resultPass.subscribe((name: string) => {
        this.displayResults();
      });
    }
  }
  startLoading() {
    (<HTMLInputElement>document.getElementById("loading")).style.display =
      "flex";
    (<HTMLInputElement>document.getElementById("results")).style.display =
      "none";
  }
  displayResults() {
    this.resultObject = this.as.searchResult;

    (<HTMLInputElement>document.getElementById("loading")).style.display =
      "none";
    (<HTMLInputElement>document.getElementById("results")).style.display =
      "flex";
    speechSynthesis.speak(
      new SpeechSynthesisUtterance(
        this.resultObject.titles.length +
          " results found ! " +
          "Do you want me to dictate them? OR say result number 4 to open 4th result and so."
      )
    );
    setTimeout(function() {
      SearchResultsComponent.listenUser();
    }, 8000);
  }
  static listenUser() {
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
      if (
        command == "yes" ||
        command == "yeah sure" ||
        command == "sure" ||
        command == "yeah" ||
        command == "repeat"
      ) {
        SearchResultsComponent.dictateResults();
      } else if (command.includes("result number")) {
        command = command.substring(14);
        console.log(command);
        if (
          command > 0 &&
          command < SearchResultsComponent.as.searchResult.urls.length
        ) {
          SearchResultsComponent.openResult(command);
        }
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
  static dictateResults() {
    var results = SearchResultsComponent.as.searchResult;
    var a1 = window.speechSynthesis;

    for (var i = 0; i < results.urls.length; i++) {
      var siteName=results.urls[i].match(/:\/\/(.[^/]+)/)[1];
      a1.speak(
        new SpeechSynthesisUtterance(
          "Result number " + (i + 1) + ". " + results.titles[i]+"from"+siteName
        )
      );
    }

    a1.speak(
      new SpeechSynthesisUtterance(
        "If you want me to repeat results say repeat? or say result number 4 to open 4th result and so."
      )
    );
    var st = setInterval(function() {
      if (a1.pending == false && a1.speaking == false) {
        // console.log("hello");
        SearchResultsComponent.listenUser();
        clearInterval(st);
      }
    }, 1000);
  }
  static openResult(i) {
    var results = SearchResultsComponent.as.searchResult;

    var win = window.open(results.urls[i - 1], "_blank");
    win.focus();
  }
}
