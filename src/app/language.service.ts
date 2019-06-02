import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = ''

  constructor(private translate: TranslateService, private storage: Storage) { }

  setAppLanguage() {
    if(localStorage.getItem('settings')) {
      let lang = JSON.parse(localStorage.getItem('settings')).language_id == 1 ? 'pt' : 'en';

      this.translate.use(lang);
      this.selected = lang;
    } else {
      this.translate.use('pt');
      this.selected = 'pt';
    }
  }
}
