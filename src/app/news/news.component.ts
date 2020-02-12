import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements OnInit {
  elementRef: any;

  constructor() {}

  ngOnInit() {}
}
