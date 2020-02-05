import { Component, OnInit, ɵɵcontainerRefreshEnd } from "@angular/core";
import { AppService } from "../app.service";
declare var webkitSpeechGrammarList: any;
declare var webkitSpeechRecognition: any;

@Component({
  selector: "app-translate",
  templateUrl: "./translate.component.html",
  styleUrls: ["./translate.component.css"]
})
export class TranslateComponent implements OnInit {
  constructor(private as: AppService) {
    TranslateComponent.lang1 = this.lang;
    TranslateComponent.query1 = this.query;
    TranslateComponent.selectedInputLang1 = this.selectedInputLang;
    TranslateComponent.selectedOutputLang1 = this.selectedOutputLang;
    TranslateComponent.as1 = this.as;
    TranslateComponent.LangCode1 = this.LangCode;
    TranslateComponent.LangNames1 = this.LangNames;
    TranslateComponent.langs1 = this.langs;
  }

  ngOnInit() {
    this.onPageOpen();
    // this.selectedInputLang = this.voiceCommand;
    // console.log(this.LangNames);
    this.as.LangCode = this.LangCode;
    this.as.LangNames = this.LangNames;

    if (this.as.resultRec3 == undefined) {
      this.as.resultRec3 = this.as.resultPass3.subscribe((name: string) => {
        this.setResult();
      });
    }
  }
  lang = "English";
  query;
  selectedOutputLang = ["English"];

  selectedInputLang = ["Any"];

  static lang1;
  static query1;
  static selectedOutputLang1;
  static as1;
  static selectedInputLang1;
  // voiceCommand = "Automatic";
  Object = Object;
  static sendQuery1() {
    this.as1.query = (<HTMLInputElement>document.getElementById("text1")).value;

    this.as1.sendQuery(
      this.LangCode1[this.LangNames1.indexOf(this.selectedOutputLang1[0])]
    );
  }
  sendQuery() {
    TranslateComponent.sendQuery1();
  }
  static setResult1() {
    var result = this.as1.output.out;
    // console.log(result);
    (<HTMLInputElement>document.getElementById("output")).value = result;
    var utterThis = new SpeechSynthesisUtterance(result);
    utterThis.lang = this.LangCode1[
      this.LangNames1.indexOf(this.selectedOutputLang1[0])
    ];
    // console.log(speechSynthesis.getVoices());
    speechSynthesis.speak(utterThis);
  }
  setResult() {
    TranslateComponent.setResult1();
  }

  static langs1;
  langs = {
    auto: "Any",
    af: "Afrikaans",
    sq: "Albanian",
    am: "Amharic",
    ar: "Arabic",
    hy: "Armenian",
    az: "Azerbaijani",
    eu: "Basque",
    be: "Belarusian",
    bn: "Bengali",
    bs: "Bosnian",
    bg: "Bulgarian",
    ca: "Catalan",
    ceb: "Cebuano",
    ny: "Chichewa",
    "zh-CN": "Chinese simplified",
    "zh-TW": "Chinese traditional",
    co: "Corsican",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    nl: "Dutch",
    en: "English",
    eo: "Esperanto",
    et: "Estonian",
    tl: "Filipino",
    fi: "Finnish",
    fr: "French",
    fy: "Frisian",
    gl: "Galician",
    ka: "Georgian",
    de: "German",
    el: "Greek",
    gu: "Gujarati",
    ht: "Haitian Creole",
    ha: "Hausa",
    haw: "Hawaiian",
    he: "Hebrew",
    iw: "Hebrew",
    hi: "Hindi",
    hmn: "Hmong",
    hu: "Hungarian",
    is: "Icelandic",
    ig: "Igbo",
    id: "Indonesian",
    ga: "Irish",
    it: "Italian",
    ja: "Japanese",
    jw: "Javanese",
    kn: "Kannada",
    kk: "Kazakh",
    km: "Khmer",
    ko: "Korean",
    ku: "Kurdish ",
    ky: "Kyrgyz",
    lo: "Lao",
    la: "Latin",
    lv: "Latvian",
    lt: "Lithuanian",
    lb: "Luxembourgish",
    mk: "Macedonian",
    mg: "Malagasy",
    ms: "Malay",
    ml: "Malayalam",
    mt: "Maltese",
    mi: "Maori",
    mr: "Marathi",
    mn: "Mongolian",
    my: "Burmese",
    ne: "Nepali",
    no: "Norwegian",
    ps: "Pashto",
    fa: "Persian",
    pl: "Polish",
    pt: "Portuguese",
    pa: "Punjabi",
    ro: "Romanian",
    ru: "Russian",
    sm: "Samoan",
    gd: "Scots Gaelic",
    sr: "Serbian",
    st: "Sesotho",
    sn: "Shona",
    sd: "Sindhi",
    si: "Sinhala",
    sk: "Slovak",
    sl: "Slovenian",
    so: "Somali",
    es: "Spanish",
    su: "Sundanese",
    sw: "Swahili",
    sv: "Swedish",
    tg: "Tajik",
    ta: "Tamil",
    te: "Telugu",
    th: "Thai",
    tr: "Turkish",
    uk: "Ukrainian",
    ur: "Urdu",
    uz: "Uzbek",
    vi: "Vietnamese",
    cy: "Welsh",
    xh: "Xhosa",
    yi: "Yiddish",
    yo: "Yoruba",
    zu: "Zulu"
  };

  LangNames = Object.values(this.langs);
  LangCode = Object.keys(this.langs);
  static LangNames1;
  static LangCode1;
  voiceInputLang() {
    TranslateComponent.voiceInputLang1();
  }
  static voiceInputLang1() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var LangNames = this.LangNames1;
    var LangCode = this.LangCode1;

    var grammar = "#JSGF V1.0;";
    var recognition = new SpeechRecognition();

    var selectedInputLang = this.selectedInputLang1;
    var selectedOutputLang = this.selectedOutputLang1;
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = function(event) {
      var last = event.results.length - 1;
      var command = event.results[last][0].transcript;
      // message.textContent = "Voice Input: " + command + ".";

      if (LangNames.includes(command)) {
        selectedInputLang[0] = command;
        (<HTMLInputElement>document.getElementById("text1")).focus();
        TranslateComponent.onInputTaken();
      } else {
        selectedInputLang[0] = "Any";
        (<HTMLInputElement>document.getElementById("text1")).focus();
        TranslateComponent.onPageOpen1();
      }
      console.log(command);

      // (<HTMLInputElement>document.getElementById("langInput")).innerHTML =
      //   "Input Language: " + this.selectedInputLang;

      // this.ngOnInit();
      // refreshCom();
      // gSearch;
    };

    recognition.onspeechend = function() {
      recognition.stop();
    };
    recognition.onaudiostart = function() {
      // console.log("sound");
      var sound = new Audio();
      sound.src = "assets/sounds/didong.mp3";
      sound.play();
    };

    recognition.onerror = function(event) {
      console.log("Error occurred in recognition: " + event.error);
    };

    recognition.start();
  }
  voiceInputSpeech() {
    TranslateComponent.voiceInputSpeech1();
  }
  static voiceInputSpeech1() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var as = this.as1;
    var query = this.query1;
    var LangNames = this.LangNames1;
    var LangCode = this.LangCode1;

    var grammar = "#JSGF V1.0;";
    var recognition = new SpeechRecognition();
    var selectedInputLang = this.selectedInputLang1;
    var selectedOutputLang = this.selectedOutputLang1;
    var speechRecognitionList = new SpeechGrammarList();

    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = this.LangCode1[
      this.LangNames1.indexOf(this.selectedInputLang1[0])
    ];
    recognition.interimResults = false;

    recognition.onresult = function(event) {
      var last = event.results.length - 1;
      var command = event.results[last][0].transcript;
      // message.textContent = "Voice Input: " + command + ".";

      console.log(command);
      (<HTMLInputElement>document.getElementById("text1")).focus();

      (<HTMLInputElement>document.getElementById("text1")).value = command;
      as.query = (<HTMLInputElement>document.getElementById("text1")).value;

      as.sendQuery(LangCode[LangNames.indexOf(selectedOutputLang[0])]);
      //   "Input Language: " + this.selectedInputLang;

      // this.ngOnInit();
      // refreshCom();
      // gSearch;
    };

    recognition.onspeechend = function() {
      recognition.stop();
    };
    recognition.onaudiostart = function() {
      // console.log("sound");
      var sound = new Audio();
      sound.src = "assets/sounds/didong.mp3";
      sound.play();
    };

    recognition.onerror = function(event) {
      console.log("Error occurred in recognition: " + event.error);
    };

    recognition.start();
  }
  voiceOutputLang() {
    TranslateComponent.voiceOutputLang1();
  }
  static voiceOutputLang1() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var LangNames = this.LangNames1;
    var LangCode = this.LangCode1;

    var grammar = "#JSGF V1.0;";
    var recognition = new SpeechRecognition();

    var selectedInputLang = this.selectedInputLang1;
    var selectedOutputLang = this.selectedOutputLang1;
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = function(event) {
      var last = event.results.length - 1;
      var command = event.results[last][0].transcript;
      // message.textContent = "Voice Input: " + command + ".";

      if (LangNames.includes(command)) {
        selectedOutputLang[0] = command;
        (<HTMLInputElement>document.getElementById("outputSelect")).focus();
        TranslateComponent.onOutputLangTaken();
      } else {
        // selectedOutputLang[0] = "";
        (<HTMLInputElement>document.getElementById("outputSelect")).focus();
      }
      console.log(command);

      // (<HTMLInputElement>document.getElementById("langInput")).innerHTML =
      //   "Input Language: " + this.selectedInputLang;

      // this.ngOnInit();
      // refreshCom();
      // gSearch;
    };

    recognition.onspeechend = function() {
      recognition.stop();
    };
    recognition.onaudiostart = function() {
      // console.log("sound");
      var sound = new Audio();
      sound.src = "assets/sounds/didong.mp3";
      sound.play();
    };

    recognition.onerror = function(event) {
      console.log("Error occurred in recognition: " + event.error);
    };

    recognition.start();
  }

  onPageOpen() {
    var synth = window.speechSynthesis;
    var utterance1 = new SpeechSynthesisUtterance(
      "Hello user, Welcome to google translate!, please tell me which language do you want to translate?"
    );
    synth.speak(utterance1);
    var s = setInterval(function() {
      if (!synth.speaking) {
        clearInterval(s);
        TranslateComponent.voiceInputLang1();
      }
    }, 1000);
  }
  static onPageOpen1() {
    var synth = window.speechSynthesis;
    var utterance1 = new SpeechSynthesisUtterance(
      "Sorry I didn't get it, please tell me again?"
    );
    synth.speak(utterance1);
    var s = setInterval(function() {
      if (!synth.speaking) {
        clearInterval(s);
        TranslateComponent.voiceInputLang1();
      }
    }, 1000);
  }

  static onInputTaken() {
    var synth = window.speechSynthesis;
    var utterance1 = new SpeechSynthesisUtterance(
      "Okay, you selected " +
        TranslateComponent.selectedInputLang1[0] +
        "as your input language, now please tell me to which language do you want to translate?"
    );
    utterance1.lang = "en-IN";
    synth.speak(utterance1);
    var s = setInterval(function() {
      if (!synth.speaking) {
        clearInterval(s);
        TranslateComponent.voiceOutputLang1();
      }
    }, 1000);
  }

  static onInputTaken1() {
    var synth = window.speechSynthesis;
    var utterance1 = new SpeechSynthesisUtterance(
      "Sorry I didn't get it, please tell me again?"
    );
    synth.speak(utterance1);
    var s = setInterval(function() {
      if (!synth.speaking) {
        clearInterval(s);
        TranslateComponent.voiceOutputLang1();
      }
    }, 1000);
  }

  static onOutputLangTaken() {
    var synth = window.speechSynthesis;
    var utterance1 = new SpeechSynthesisUtterance(
      "You selected " +
        TranslateComponent.selectedOutputLang1[0] +
        "as your output lang, now please dictate your content"
    );
    synth.speak(utterance1);
    var s = setInterval(function() {
      if (!synth.speaking) {
        clearInterval(s);
        TranslateComponent.voiceInputSpeech1();
      }
    }, 1000);
  }

  goBack() {
    window.history.back();
  }
}
