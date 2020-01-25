import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-translate",
  templateUrl: "./translate.component.html",
  styleUrls: ["./translate.component.css"]
})
export class TranslateComponent implements OnInit {
  constructor(private as: AppService) {}

  ngOnInit() {
    if (this.as.resultRec3 == undefined) {
      this.as.resultRec3 = this.as.resultPass3.subscribe((name: string) => {
        this.setResult();
      });
    }
  }
  query;
  sendQuery() {
    this.as.query = this.query;

    this.as.sendQuery();
  }
  setResult() {
    var result = this.as.output.out;
    console.log(result);
    (<HTMLInputElement>document.getElementById("output")).innerHTML = result;
    speechSynthesis.speak(new SpeechSynthesisUtterance(result));
  }
}
