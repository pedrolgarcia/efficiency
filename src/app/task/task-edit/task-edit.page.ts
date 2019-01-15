import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../shared/alert/alert.service';
import { Task } from '../task.model';
import { ProjectService } from '../../project/project.service';
import { Project } from '../../project/project.model';
import { Category } from '../category';
import { Regex } from '../../regex';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.page.html',
  styleUrls: ['./task-edit.page.scss'],
})
export class TaskEditPage implements OnInit {

  editTaskForm: FormGroup;
  task: Task;
  projects: Project;
  categories: Category;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private router: Router,
    private regex: Regex
  ) { }

   ngOnInit() {
    this.editTaskForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, Validators.pattern(this.regex.alphabeticRegex)]),
      categoria: this.formBuilder.control('', [Validators.required]),
      projeto: this.formBuilder.control('', [Validators.required]),
      inicio: this.formBuilder.control('', [Validators.required]),
      entrega: this.formBuilder.control('', [Validators.required]),
      descricao: this.formBuilder.control('', [Validators.required]),
    });
   }

   ionViewWillEnter() {
    this.projectService.getProjects()
      .subscribe(response => {
        this.projects = response;
      });

    this.taskService.getCategories()
      .subscribe(response => {
        this.categories = response;
      });

    this.taskService.getTask(this.route.snapshot.params['id'])
      .subscribe(response => {
        this.task = response;
        this.editTaskForm.setValue({
          nome: this.task.name,
          categoria: this.task.category.id,
          projeto: this.task.project_id,
          inicio: this.task.started_at,
          entrega: this.task.ended_at,
          descricao: this.task.description
        });
      });
  }

   onSubmit() {
    const projeto = this.editTaskForm.get('projeto');
    const categoria = this.editTaskForm.get('categoria');

    this.alert.header = 'Alteração importante!';

    this.alert.buttons = [
      { text: 'Cancelar', role: 'cancel', cssClass: 'secondary' },
      { text: 'Continuar', cssClass: 'danger', handler: () => { this.editTask(); } }
    ];

    if (categoria.value !== this.task.category.id && projeto.value !== this.task.project_id) {
      this.alert.message =
        `Você está prestes a alterar a categoria e o projeto desta tarefa, deseja continuar?`;
      this.alert.presentAlert();

    } else if (categoria.value !== this.task.category.id) {
      this.alert.message =
        `Você está prestes a alterar a categoria desta tarefa, deseja continuar?`;
      this.alert.presentAlert();

    } else if (projeto.value !== this.task.project_id) {
      this.alert.message =
        `Você está prestes a alterar o projeto desta tarefa, deseja continuar?`;
      this.alert.presentAlert();

    } else {
      this.editTask();
    }
  }

   editTask() {
    this.taskService.editTask(this.route.snapshot.params['id'], this.editTaskForm.value)
    .subscribe(response => {
      this.alert.header = response.success;
      this.alert.message = response.message;
      this.alert.buttons = [{ text: 'OK', handler: () => this.router.navigate([`/task/${this.route.snapshot.params['id']}`]) }];
      this.alert.presentAlert();
    });
   }
}
