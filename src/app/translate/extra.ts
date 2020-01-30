import { TranslateComponent } from "./translate.component";
export class extra {
  constructor(private tc: TranslateComponent) {}

  voiceInputLang() {
    this.tc.voiceInputLang();
  }
}
