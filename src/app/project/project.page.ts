import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from './project.model';
import { ProjectService } from './project.service';
import { AlertService } from '../shared/alert/alert.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

  project: Project;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private alert: AlertService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.projectService.getProject(this.route.snapshot.params['id'])
      .subscribe(response => {
        this.project = response;
      });
  }

  detailTask(id) {
    this.router.navigate([`/task/${id}`]);
  }

  finishProject() {
    this.projectService.finishProject(this.route.snapshot.params['id'])
      .subscribe(response => {
        this.alert.header = response.success;
        this.alert.message = response.message;
        this.alert.buttons = ['Fechar'];
        this.alert.presentAlert();
        this.ionViewWillEnter();
      });
  }

  backToProject() {
    this.projectService.backToProject(this.route.snapshot.params['id'])
      .subscribe(response => {
        this.alert.header = response.success;
        this.alert.message = response.message;
        this.alert.buttons = ['Fechar'];
        this.alert.presentAlert();
        this.ionViewWillEnter();
      });
  }

  deleteProject(id) {
    this.alert.header = 'Deseja mesmo excluir o projeto?';

    if (this.project.status.id === 1) {
      this.alert.header = 'Cuidado, seu projeto está em andamento!';
      this.alert.message = 'Deseja mesmo excluir?';
    }

    this.alert.buttons = [{ text: 'Cancelar', role: 'cancel', cssClass: 'secondary' },
                          { text: 'Excluir', cssClass: 'danger', handler: () => {
                            this.projectService.deleteProject(this.route.snapshot.params['id'])
                              .subscribe(response => {
                                this.alert.header = response.success;
                                this.alert.message = response.message;
                                this.alert.buttons = [{ text: 'Voltar para o início', handler: () => this.router.navigate(['/']) }];
                                this.alert.presentAlert();
                              });
                          } }];
    this.alert.presentAlert();
  }

}
