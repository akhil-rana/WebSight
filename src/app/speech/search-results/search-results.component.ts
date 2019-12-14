import { Component, OnInit } from "@angular/core";
import { AppService } from "../../app.service";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"]
})
export class SearchResultsComponent implements OnInit {
  constructor(public as: AppService) {}

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
  }
}
