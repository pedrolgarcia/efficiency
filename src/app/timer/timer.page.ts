import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {

  timerForm: FormGroup;

  cronometro: any;

  hora = 0;
  minuto = 0;
  segundo = 0;

  horaView = '00';
  minutoView = '00';
  segundoView = '00';

  tempoDaTarefa: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.timerForm = this.formBuilder.group({
      projeto: this.formBuilder.control(['']),
      tarefa: this.formBuilder.control(['']),
      cadastro: this.formBuilder.control([''])
      // tempo: this.formBuilder.control([''])
    });
  }

  play() {
    if(this.cronometro === undefined) {
      this.cronometro = setInterval(() => {
        this.segundo++;
        this.segundoView = this.doisDigitos(this.segundo);
        if(this.segundo === 60) {
          this.segundo = 0;
          this.minuto++;
          this.minutoView = this.doisDigitos(this.minuto);
          if(this.minuto === 60) {
            this.minuto = 0;
            this.hora++;
            this.horaView = this.doisDigitos(this.hora);
          }
        }
      }, 1000);
    }
  }

  doisDigitos(n) {
    return (n < 10 ? '0' : '') + n;
  }

  pause() {
    clearInterval(this.cronometro);
    this.tempoDaTarefa = {
      hora: this.hora,
      minuto: this.minuto,
      segundo: this.segundo,
    };
    console.log(this.tempoDaTarefa);
    this.cronometro = undefined;
  }


}
