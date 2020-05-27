import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
//import { setInterval } from "timers";

@Component({
  selector: "app-wikipedia",
  templateUrl: "./wikipedia.component.html",
  styleUrls: ["./wikipedia.component.css"],
})
export class WikipediaComponent implements OnInit {
  constructor(private http: HttpClient) {}
  query;
  // contents = [""];
  static marker1 = 0;
  flag = 1;
  conLength;
  flag2 = 0;
  ngOnInit(): void {
    this.searchResult = { content: [] };
    this.onPageOpen();
    let s = setInterval(() => {
      if (WikipediaComponent.queryW != undefined) {
        clearInterval(s);
        this.query = WikipediaComponent.queryW;
        this.send_query();
        //    this.afterWards();
      }
    }, 1000);
  }
  // static FinalSpeaker;
  static readableString;
  static counterPara = 1;
  static paraLength;

  static ReadContent(val) {
    let synth2 = window.speechSynthesis;
    let j = 0;
    let utterance2;
    console.log(val);

    let textEdit = WikipediaComponent.readableString[val];
    let speakableText = "";
    let starter = 0;

    let s4 = setInterval(() => {
      if (textEdit == undefined) {
        clearInterval(s4);
        let synth8 = window.speechSynthesis;
        let utterance8 = new SpeechSynthesisUtterance(
          "The query is not suitable, Please say again"
        );
        synth8.speak(utterance8);
        let s3 = setInterval(() => {
          if (!synth8.speaking) {
            clearInterval(s3);
            location.reload();
          }
        }, 1000);
      }
    }, 2000);

    //  console.log("index of" + indexs);
    // console.log(textEdit);
    if (textEdit.indexOf("[") >= 1) {
      while (textEdit.indexOf("[") != -1) {
        let indexs = textEdit.indexOf("[");
        textEdit = this.setCharAt(textEdit, indexs, " ");
        speakableText = speakableText + textEdit.substring(starter, indexs);
        starter = indexs + 3;
      }
      // if (textEdit.indexOf("[") != -1) {
      console.log("reached here");
      speakableText = speakableText + textEdit.substring(starter);
      j = 1;
      // }
    } else {
      speakableText = speakableText + textEdit.substring(starter);
      j = 1;
    }
    let s1 = setInterval(() => {
      if (j == 1) {
        clearInterval(s1);
        utterance2 = new SpeechSynthesisUtterance(speakableText);
        synth2.speak(utterance2);
      }
    }, 1000);
    let s2 = setInterval(() => {
      if (!synth2.speaking) {
        clearInterval(s2);
        this.choiceMaker();
      }
    }, 1000);
    //let s1=set
  }

  static setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
  }

  tempArray;
  finalDialogue;

  // static readableString;
  afterWards() {
    console.log("reached afterwards");
    let i, j;

    let s = setInterval(() => {
      if (
        WikipediaComponent.readableString != undefined &&
        this.query != undefined
      ) {
        clearInterval(s);
        WikipediaComponent.ReadContent(1);
      }
    }, 1000);
  }

  static choiceMaker() {
    let synth3 = window.speechSynthesis;
    let utterance3 = new SpeechSynthesisUtterance(
      "Say REPEAT to repeat paragraph,Say NEXT to go to next paragraph, say BACK to go to previous paragraph, say SELECT to go to a particular paragraph, say NEW to search a new query, say QUIT to leave"
    );
    synth3.speak(utterance3);
    let s = setInterval(() => {
      if (!synth3.speaking) {
        clearInterval(s);
        WikipediaComponent.voiceInput2();
      }
    }, 1000);
  }

  static voiceInput2() {
    var recognition = new SpeechRecognition();
    recognition.lang = "en-IN";

    recognition.onresult = function (event) {
      var last = event.results.length - 1;
      var vocalOption = event.results[last][0].transcript;
      console.log(vocalOption);
      if (vocalOption.includes("next")) {
        if (
          WikipediaComponent.counterPara + 1 <=
          WikipediaComponent.paraLength
        ) {
          WikipediaComponent.counterPara = WikipediaComponent.counterPara + 1;
          WikipediaComponent.ReadContent(WikipediaComponent.counterPara);
        } else {
          let synth4 = window.speechSynthesis;
          let utterance4 = new SpeechSynthesisUtterance(
            "This is the last paragraph"
          );
          synth4.speak(utterance4);
          let s = setInterval(() => {
            if (!synth4.speaking) {
              clearInterval(s);
              WikipediaComponent.choiceMaker();
            }
          }, 1000);
        }
        //let url = "/google-speech";
        // window.open(url, "_self");
      } else if (vocalOption.includes("back")) {
        if (WikipediaComponent.counterPara - 1 >= 1) {
          WikipediaComponent.counterPara = WikipediaComponent.counterPara - 1;
          WikipediaComponent.ReadContent(WikipediaComponent.counterPara);
        } else {
          let synth5 = window.speechSynthesis;
          let utterance5 = new SpeechSynthesisUtterance(
            "This is the first paragraph"
          );
          synth5.speak(utterance5);
          let s = setInterval(() => {
            if (!synth5.speaking) {
              clearInterval(s);
              WikipediaComponent.choiceMaker();
            }
          }, 1000);
        }
      } else if (vocalOption.includes("repeat")) {
        WikipediaComponent.ReadContent(WikipediaComponent.counterPara);
      } else if (vocalOption.includes("select")) {
        let synth6 = window.speechSynthesis;
        let utterance6 = new SpeechSynthesisUtterance(
          "Say the paragraph number you want to visit"
        );
        synth6.speak(utterance6);
        let s = setInterval(() => {
          if (!synth6.speaking) {
            clearInterval(s);
            WikipediaComponent.voiceInput3();
          }
        }, 1000);
      } else if (vocalOption.includes("new")) {
        location.reload();
      } else if (vocalOption.includes("quit")) {
        window.open("../", "_self");
      } else {
        WikipediaComponent.voiceInput2();
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

  onPageOpen() {
    let synth = window.speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(
      "Say the title of the article you want to see."
    );
    synth.speak(utterance);
    let s = setInterval(function () {
      if (!synth.speaking) {
        clearInterval(s);
        WikipediaComponent.voiceInput1();
      }
    }, 1000);
  }

  static queryW;

  static voiceInput1() {
    var recognition = new SpeechRecognition();
    recognition.lang = "en-IN";

    recognition.onresult = function (event) {
      var last = event.results.length - 1;
      var vocalOption = event.results[last][0].transcript;
      WikipediaComponent.queryW = vocalOption;
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

  static voiceInput3() {
    var recognition = new SpeechRecognition();
    recognition.lang = "en-IN";

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
          "Please  say a number in the sentence"
        );
        synth4.speak(utterance4);
        setTimeout(() => {
          var s4 = setInterval(function () {
            if (!synth4.speaking) {
              clearInterval(s4);
              WikipediaComponent.voiceInput3();
            }
          }, 1000);
        }, 500);
      }
      let numb = Number(matches[0]);
      if (typeof numb == "number") {
        if (numb + 1 >= 2 && numb + 1 <= WikipediaComponent.paraLength) {
          WikipediaComponent.counterPara = numb + 1;
          WikipediaComponent.ReadContent(numb + 1);
        } else {
          let synth7 = window.speechSynthesis;
          let utterance7 = new SpeechSynthesisUtterance(
            "Please say a number within the limits"
          );
          synth7.speak(utterance7);
          let s = setInterval(() => {
            if (!synth7.speaking) {
              clearInterval(s);
              WikipediaComponent.voiceInput3();
            }
          }, 1000);
        }
      }

      // window.open(
      //   SearchComponent.contentUrls1[vocalOption],
      //   "width=200,height=100"
      // );
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

  conLengthTemp;
  goBack() {
    window.history.back();
  }
  searchResult;

  send_query() {
    let wikiquery = {
      input: this.query,
    };
    this.flag = 0;

    this.http
      .post("https://websight-backend.herokuapp.com/wikipedia", wikiquery)
      .subscribe(
        (response) => {
          this.searchResult = response;

          // WikipediaComponent.readableString = response;
          this.flag = 1;
          this.flag2 = 1;
          // console.log(this.searchResult);
          //this.conLength = WikipediaComponent.readableString.content.length;
          WikipediaComponent.readableString = this.searchResult.content;
          WikipediaComponent.paraLength =
            WikipediaComponent.readableString.length;
          console.log(WikipediaComponent.readableString[2]);
          this.afterWards();
          // this.resultPass.emit();
          // this.resultPass1.emit();

          return;
        },
        (error) => {
          console.log("error during post is ", error);
        }
      );
  }
}
