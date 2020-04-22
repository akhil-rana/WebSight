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
    NewsComponent.afterFirstSignal1();
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
