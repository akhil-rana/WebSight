import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import * as $ from "jquery";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../app.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private as: AppService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.query = params.get("id");
      while (1) {
        if (this.query.includes("+")) this.query = this.query.replace("+", " ");
        else break;
      }
      this.query1 = this.query;
      this.query = this.query.replace(/ /g, "+");
      console.log(this.query);
    });
    this.newsSearchContent = this.as.GoogleNewsScrapeObject;
    this.contentSet();
  }
  newsSearchContent;
  query;
  query1;
  goBack() {
    window.history.back();
  }
  contentImgUrls = [];
  contentTitles = [];
  contentUrls = [];
  contentSet() {
    this.contentImgUrls = this.newsSearchContent.imgUrl;
    this.contentTitles = this.newsSearchContent.titles;
    this.contentUrls = this.newsSearchContent.urls;
  }
  newsOpen(i) {
    var win = window.open(this.contentUrls[i], "_blank");
    win.focus();
  }
}
