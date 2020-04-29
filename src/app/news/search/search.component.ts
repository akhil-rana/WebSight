import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from "@angular/core";
import * as $ from "jquery";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../app.service";
import { NewsComponent } from "../news.component";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
  encapsulation: ViewEncapsulation.None,

  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private as: AppService
  ) {}
  confirmer;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.query = params.get("id");
      while (1) {
        if (this.query.includes("+")) this.query = this.query.replace("+", " ");
        else break;
      }
      this.query1 = this.query;
      this.query = this.query.replace(/ /g, "+");
      // console.log(this.query);
    });
    this.contentSet();

    $(".navbarSearch").click(function (e) {
      e.stopPropagation(); //stops click event from reaching document
    });
    $(document).click(function () {
      $(".navbarSearch").animate(
        {
          width: "30%",
        },
        200
      );
      $("input.lead").css("color", "white");
    });
    setTimeout(() => {
      let s = setInterval(() => {
        if (this.confirmer != undefined) {
          clearInterval(s);
          SearchComponent.choiceMaker();
        }
      }, 1000);
    }, 3000);
    // let s = setInterval(() => {
    //   if (SearchComponent.contentTitles1 != undefined) {
    //     clearInterval(s);
    //    SearchComponent.voiceList();
    //   }
    // }, 1000);
  }

  static choiceMaker() {
    let synth2 = window.speechSynthesis;
    let utterance2 = new SpeechSynthesisUtterance(
      "Say DICTATE to say the result, say OPEN to open a option, say quit to go to news page"
    );
    synth2.speak(utterance2);
    let s = setInterval(() => {
      if (!synth2.speaking) {
        clearInterval(s);
        SearchComponent.voiceInput2();
      }
    }, 1000);
  }

  static marker1 = 0;
  static voiceList() {
    let j = 0;
    let conLength = SearchComponent.contentTitles1.length;
    let synth = window.speechSynthesis;
    let utterance1;
    console.log(SearchComponent.contentTitles1);
    while (j < 3) {
      if (SearchComponent.marker1 < conLength) {
        let temp = SearchComponent.marker1 + 1;
        utterance1 = new SpeechSynthesisUtterance(
          "HeadLine  " +
            temp +
            " " +
            SearchComponent.contentTitles1[SearchComponent.marker1]
        );
        synth.speak(utterance1);
        SearchComponent.marker1 = SearchComponent.marker1 + 1;
        j++;
      } else {
        SearchComponent.marker1 = 0;
      }
    }
    SearchComponent.choiceMaker();
  }

  static voiceInput2() {
    var recognition = new SpeechRecognition();
    recognition.lang = "en-IN";

    recognition.onresult = function (event) {
      var last = event.results.length - 1;
      var vocalOption = event.results[last][0].transcript;
      console.log(vocalOption);
      if (vocalOption.includes("dictate")) {
        SearchComponent.voiceList();
      } else if (vocalOption.includes("open")) {
        // window.open(SearchComponent.contentUrls1[SearchComponent.])
        let synth3 = window.speechSynthesis;
        let utterance3 = new SpeechSynthesisUtterance(
          "Please say the number of headline to be opened"
        );
        synth3.speak(utterance3);
        let s = setInterval(() => {
          if (!synth3.speaking) {
            clearInterval(s);
            SearchComponent.voiceInput3();
          }
        }, 1000);
      } else if (vocalOption.includes("quit")) {
        window.open("/news", "_self");
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
              SearchComponent.voiceInput3();
            }
          }, 1000);
        }, 500);
      }
      let numb = Number(matches[0]);
      if (typeof numb == "number") {
        window.open(
          SearchComponent.contentUrls1[numb - 1],
          "width=200,height=100"
        );
        SearchComponent.choiceMaker();
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

  newsSearchContent;
  query;
  query1;
  goBack() {
    window.history.back();
  }
  contentImgUrls = [];
  static contentTitles1 = [];
  static contentUrls1 = [];
  contentTitles = [];
  contentUrls = [];
  contentImgUrlsUnique = [];
  contentTitlesUnique = [];
  contentUrlsUnique = [];
  flag = 0;
  contentSet() {
    this.flag = 0;
    var queryObject = {
      input: this.query,
    };
    this.http
      .post(
        "https://websight-backend.herokuapp.com/news/gnews-search",
        queryObject
      )
      .subscribe(
        (response) => {
          // console.log(response);
          // let url = "/news/search/" + this.query;
          this.newsSearchContent = response;
          var contentTitles = this.newsSearchContent.titles;
          var contentImgUrls = this.newsSearchContent.imgUrl;
          var contentUrls = this.newsSearchContent.urls;
          var contentImgUrlsUnique = [];
          var contentTitlesUnique = [];
          var contentUrlsUnique = [];
          $.each(contentImgUrls, function (i, el) {
            if ($.inArray(el, contentImgUrlsUnique) === -1) {
              contentImgUrlsUnique.push(el);
              contentTitlesUnique.push(contentTitles[i]);
              contentUrlsUnique.push(contentUrls[i]);
            }
          });
          this.contentTitlesUnique = contentTitlesUnique;
          this.contentImgUrlsUnique = contentImgUrlsUnique;
          this.contentUrlsUnique = contentUrlsUnique;
          SearchComponent.contentTitles1 = this.contentTitlesUnique;
          SearchComponent.contentUrls1 = this.contentUrlsUnique;
          this.confirmer = 1;

          let i = 0;
          while (1) {
            if (this.contentImgUrlsUnique[i] == undefined) {
              this.contentImgUrlsUnique.splice(i, 1);
              this.contentTitlesUnique.splice(i, 1);
              this.contentUrlsUnique.splice(i, 1);
              break;
            }
            if (i == 100) break;
            i++;
          }
          this.flag = 1;

          // this.router.navigateByUrl(url);
        },
        (error) => {
          console.log("error", error);
        }
      );
  }
  newsOpen(i) {
    var win = window.open(this.contentUrlsUnique[i], "_blank");
    win.focus();
  }
  newsQuery;
  passNewsQuery() {
    this.query = this.query1 = this.newsQuery;
    let newsq = this.query.replace(/ /g, "+");
    let url = "/news/search/" + newsq;
    $("#search").blur();
    this.router.navigateByUrl(url);
    this.contentSet();
    this.newsQuery = "";
    $(".navbarSearch").animate(
      {
        width: "30%",
      },
      200
    );
    $("input.lead").css("color", "white");
  }
  searchClick() {
    $(".navbarSearch").animate(
      {
        width: "100%",
      },
      300
    );
    $("input.lead").css("color", "black");
  }
}
