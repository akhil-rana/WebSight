import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AppService } from "../../app.service";
@Component({
  selector: "app-news-navbar",
  templateUrl: "./news-navbar.component.html",
  styleUrls: ["./news-navbar.component.css"]
})
export class NewsNavbarComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private as: AppService
  ) {}

  ngOnInit(): void {
    $(".navbarSearch").click(function(e) {
      e.stopPropagation(); //stops click event from reaching document
    });
    $(document).click(function() {
      $(".navbarSearch").animate(
        {
          width: "30%"
        },
        200
      );
      $("input.lead").css("color", "white");
    });
  }
  goBack() {
    window.history.back();
  }
  searchClick() {
    $(".navbarSearch").animate(
      {
        width: "100%"
      },
      300
    );
    $("input.lead").css("color", "black");
  }
  newsQuery;
  flagSearch = 0;
  passNewsQuery() {
    this.flagSearch = 1;
    let query = {
      input: this.newsQuery
    };
    this.http
      .post("https://websight-backend.herokuapp.com/news/gnews-search", query)
      .subscribe(
        response => {
          console.log(response);
          let newsq = this.newsQuery.replace(/ /g, "+");
          let url = "/news/search/" + newsq;
          this.as.GoogleNewsScrapeObject = response;
          this.router.navigateByUrl(url);
        },
        error => {
          console.log("error", error);
        }
      );
  }
}
