import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainPComponent } from "./main-p/main-p.component";
import { SpeechComponent } from "./speech/speech.component";

const routes: Routes = [
  {
    path: "",
    component: MainPComponent
  },
  {
    path: "google-speech",
    component: SpeechComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
