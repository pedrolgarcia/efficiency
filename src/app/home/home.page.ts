import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/project.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from '../settings/settings.service';
import { Settings } from '../settings/settings.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  settings: Settings;

  projects: Project;
  noProject = null;
  searchForm: FormGroup;
  filter: string;
  searchText: string;

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: this.formBuilder.control('')
    });

    // this.searchForm.get('search').valueChanges
    //   .pipe(
    //     debounceTime(300),
    //     switchMap(value => {
    //       this.searchText = value;
    //       return this.projectService.filter({ filter: this.filter, text: this.searchText });
    //     })
    //   )
    //   .subscribe(response => {
    //     this.projects = response;
    //     this.noProject = null;
    //   }, error => {
    //     this.noProject = error.error.message;
    //     this.projects = null;
    //   });
  }

  ionViewWillEnter() {
    this.projectService.getProjects().subscribe(response => {
        this.projects = response;
      });

      this.settings = this.settingsService.getSettingsFromStorage();
  }

  onFilter(e) {
    this.filter = e.target.value;
    if (this.filter !== '0') {
      this.projectService.filter(this.filter)
      .subscribe(response => {
        this.projects = response;
        this.noProject = null;
      }, error => {
        this.noProject = error.error.message;
        this.projects = null;
      });
    } else {
      this.projectService.getProjects().subscribe(response => {
        this.projects = response;
      });
    }
  }

}
