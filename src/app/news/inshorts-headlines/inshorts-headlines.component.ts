import { AppService } from "../../app.service";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
  selector: "app-inshorts-headlines",
  templateUrl: "./inshorts-headlines.component.html",
  styleUrls: ["./inshorts-headlines.component.css"]
})
export class InshortsHeadlinesComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.inshorts();
  }
  imageUrl(img) {
    return "url(" + img + ")";
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
        response => {
          //console.log(response);
          this.headLines = response;

          this.texts = this.headLines.texts;
          this.content = this.headLines.content;
          this.flag = 1;
          //this.headLines=response.map()
        },
        error => {
          console.log("error", error);
        }
      );
  }
}
