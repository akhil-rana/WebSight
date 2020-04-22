import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NewsComponent } from "../news.component";
import { setInterval } from "timers";
@Component({
  selector: "app-comp-control",
  templateUrl: "./comp-control.component.html",
  styleUrls: ["./comp-control.component.css"],
})
export class CompControlComponent implements OnInit {
  constructor(private http: HttpClient, private nc: NewsComponent) {}
  ngOnInit() {
    console.log("Yes");
  }
}
