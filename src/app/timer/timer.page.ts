import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project/project.service';
import { TaskService } from '../task/task.service';
import { AlertService } from '../shared/alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {

  timerForm: FormGroup;
  projects: any;
  tasks: any;

  cronometro: any;

  hora = 0;
  minuto = 0;
  segundo = 0;

  horaView = '00';
  minutoView = '00';
  segundoView = '00';

  tempoAntigoDaTarefa: any;
  tempoDaTarefa: any;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private taskService: TaskService,
    private alert: AlertService,
    private alertFinalize: AlertService,
    private alertFinalized: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.timerForm = this.formBuilder.group({
      projeto: this.formBuilder.control('', [Validators.required]),
      tarefa: this.formBuilder.control('', [Validators.required]),
      tempo: this.formBuilder.control('')
    });

    this.projectService.getProjects()
      .subscribe(response => {
        this.projects = response;
      });
  }

  setTasksOptions(e) {
    this.timerForm.controls['tarefa'].setValue('');
    if (this.projects) {
      this.tasks = this.projects.filter(project => project.id === e.target.value).map(tasks => tasks.tasks);
      this.tasks = this.tasks[0].filter(task => task.status_id !== 2);
      console.log(this.tasks);
    }
  }

  save() {
    const taskId = this.timerForm.get('tarefa').value;
    this.pause();
    this.timerForm.setValue({
      'projeto': this.timerForm.get('projeto').value,
      'tarefa': this.timerForm.get('tarefa').value,
      'tempo': this.tempoDaTarefa,
    });

    this.taskService.getTask(taskId).subscribe(response => {
      this.tempoAntigoDaTarefa = response.time;

      this.alert.header = this.tempoAntigoDaTarefa ?
                              'Deseja adicionar este tempo na tarefa?' :
                              'Deseja salvar este tempo na tarefa?';
      this.alert.message = this.tempoAntigoDaTarefa ?
                              `Sua tarefa já possui um tempo de ${this.tempoAntigoDaTarefa} e
                              você acabou de cronometrar ${this.tempoDaTarefa}.` :
                              `Você demorou ${this.tempoDaTarefa} nesta tarefa.`;
      this.alert.buttons = [{
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Salvar',
          handler: () => {
            this.taskService.setTime(taskId, this.timerForm.value).subscribe();
            this.alertFinalize.header = 'Deseja finalizar a tarefa?';
            this.alertFinalize.message = '';
            this.alertFinalize.buttons = [{
              text: 'Finalizar',
              handler: () => {
                this.taskService.finishTask(taskId).subscribe(data => {
                  this.alertFinalized.header = data.success;
                  this.alertFinalized.message = data.message;
                  this.alertFinalized.buttons = [{ text: 'Fechar', handler: () => this.router.navigate(['/task/', taskId])}];
                  this.alertFinalized.presentAlert();
                });
              },
            }, {
              text: 'Manter em andamento',
              handler: () => {
                this.router.navigate(['/task/', taskId]);
              }
            }];
            this.alertFinalize.presentAlert();
          }
        }];
        this.alert.presentAlert();
     });
  }

  clear() {
    this.timerForm.controls['projeto'].setValue('');
    this.timerForm.controls['tarefa'].setValue('');
    this.tasks = null;
    this.reset();
  }

  reset() {
    this.tempoDaTarefa = null;
    this.hora = 0;
    this.minuto = 0;
    this.segundo = 0;
    this.horaView = '00';
    this.minutoView = '00';
    this.segundoView = '00';
    this.pause();
  }

  play() {
    if (this.cronometro === undefined) {
      this.cronometro = setInterval(() => {
        this.segundo++;
        this.segundoView = this.doisDigitos(this.segundo);
        if (this.segundo === 60) {
          this.segundo = 0;
          this.minuto++;
          this.minutoView = this.doisDigitos(this.minuto);
          if (this.minuto === 60) {
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
    this.tempoDaTarefa = `${this.horaView}:${this.minutoView}:${this.segundoView}`;

    this.cronometro = undefined;
  }


}
