import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainPComponent } from "./main-p/main-p.component";
import { SpeechComponent } from "./speech/speech.component";
import { TranslateComponent } from "./translate/translate.component";
import { NewsComponent } from "./news/news.component";
import { WikipediaComponent } from "./wikipedia/wikipedia.component";
const routes: Routes = [
  {
    path: "",
    component: MainPComponent
  },
  {
    path: "google-speech",
    component: SpeechComponent
  },
  {
    path: "translate",
    component: TranslateComponent
  },
  {
    path: "news",
    component: NewsComponent
  },
  {
    path: "wikipedia",
    component: WikipediaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
