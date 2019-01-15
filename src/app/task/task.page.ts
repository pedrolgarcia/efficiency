import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../shared/alert/alert.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  task: Task;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.taskService.getTask(this.route.snapshot.params['id'])
      .subscribe(response => {
        this.task = response;
      });
  }

  finishTask() {
    this.taskService.finishTask(this.route.snapshot.params['id'])
      .subscribe(response => {
        this.alert.header = response.success;
        this.alert.message = response.message;
        this.alert.buttons = ['Fechar'];
        this.alert.presentAlert();
        this.ionViewWillEnter();
      });
  }


  backToTask() {
    this.taskService.backToTask(this.route.snapshot.params['id'])
      .subscribe(response => {
        this.alert.header = response.success;
        this.alert.message = response.message;
        this.alert.buttons = ['Fechar'];
        this.alert.presentAlert();
        this.ionViewWillEnter();
      });
  }

  deleteTask(id) {
    this.alert.header = 'Deseja mesmo excluir esta tarefa?';
    this.alert.message = '';

    if (this.task.status.id === 1) {
      this.alert.header = 'Cuidado, sua tarefa está em andamento!';
      this.alert.message = 'Deseja mesmo excluir?';
    }

    this.alert.buttons = [{ text: 'Cancelar', role: 'cancel', cssClass: 'secondary' },
                          { text: 'Excluir', cssClass: 'danger', handler: () => {
                            this.taskService.deleteTask(this.route.snapshot.params['id'])
                              .subscribe(response => {
                                this.alert.header = response.success;
                                this.alert.message = response.message;
                                this.alert.buttons = [
                                  {
                                    text: 'Voltar para o projeto',
                                    handler: () => this.router.navigate([`/project/${this.task.project_id}`])
                                  }];
                                this.alert.presentAlert();
                              });
                          } }];
    this.alert.presentAlert();
  }

}
