import angular from 'angular';
import { EventEmitter } from 'events';

import storageService from './storage.service';

export const PROJECT_CHANGED_EVENT = 'projectChanged';

let currentProject;
class ProjectService extends EventEmitter {
  constructor(
    $cacheFactory,
    $http,
    $timeout,
    StorageService,
    ProjectConfigService,
    REST_ROOT,
  ) {
    'ngInject';

    super();
    this.PROJECT_CACHE = $cacheFactory('projects');

    this.$http = $http;
    this.$timeout = $timeout;
    this.StorageService = StorageService;
    this.ProjectConfigService = ProjectConfigService;
    this.REST_ROOT = REST_ROOT;
  }

  /**
   * this should only be used in ui-router hooks
   */
  currentProject() {
    return currentProject;
  }

  setCurrentProject(project) {
    if (!project) {
      currentProject = undefined;
      this.emit(PROJECT_CHANGED_EVENT, currentProject);
      return Promise.resolve();
    }

    const setProjectConfig = () =>
      project.config ? Promise.resolve(project) : this.get(project.projectId);

    return setProjectConfig().then(p => {
      this.StorageService.set('projectId', project.projectId);
      currentProject = p;
      this.emit(PROJECT_CHANGED_EVENT, currentProject);
      return p;
    });
  }

  cacheProject(projectId) {
    this.StorageService.set('projectId', projectId);
  }

  get(projectId, includeConfig = true) {
    if (!projectId) {
      return Promise.resolve();
    }

    return this.all(true)
      .then(({ data }) => data.find(p => p.projectId === projectId))
      .then(project => {
        if (!project || !includeConfig) {
          return project;
        }

        return this.ProjectConfigService.get(project.projectId)
          .then(config => Object.assign({}, project, { config }))
          .catch(angular.catcher('Failed to load project configuration'));
      })
      .catch(response => angular.catcher('Failed to project')(response));
  }

  all(includePublic) {
    return this.$http
      .get(`${this.REST_ROOT}projects?includePublic=${includePublic}`, {
        cache: this.PROJECT_CACHE,
      })
      .catch(angular.catcher('Failed to load projects'));
  }

  update(project) {
    this.PROJECT_CACHE.removeAll();
    return this.$http({
      method: 'PUT',
      url: `${this.REST_ROOT}projects/${project.projectId}`,
      data: project,
      keepJson: true,
    }).catch(angular.catcher('Failed to update the project.'));
  }

  // TODO remove this
  resolveProjectId() {
    return new Promise((resolve, reject) => {
      if (currentProject) {
        resolve(currentProject.projectId);
      } else {
        reject({ data: { error: 'No project is selected' } });
      }
    });
  }

  loadFromSession(projectId) {
    if (!projectId) {
      projectId = this.StorageService.get('projectId');
    }

    return this.get(projectId);
  }
}

export default angular
  .module('fims.projectService', [storageService])
  .service('ProjectService', ProjectService).name;