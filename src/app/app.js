import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import bootstrap from 'angular-ui-bootstrap';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';
import filter from 'angular-filter';

// this loads the css for the app
import '../style/bootstrap.scss';
import '../style/app.scss';

import run from './app.run';
import theme from './app.theme';
import routing from './app.routes';
import router from './utils/router';
import postInterceptor from './postInterceptor';
import autofocus from './directives/autofocus.directive';
import textOverflowTooltip from './directives/textOverflowTooltip.directive';
import showErrors from './directives/showErrors.directive';
import mdPopover from './directives/mdPopover.directive';
import mdSticky from './directives/mdSticky.directive';
import mdHint from './directives/mdHint.directive';
import mdAutocomplete from './directives/mdAutocomplete.directive';
import ngImageGallery from './directives/ngImageGallery.directive';
import ngEnter from './directives/ngEnter.directive';
import formValidators from './directives/formValidators.directive';
import trustedHtml from './filters/html.filter';
import excludeFilter from './filters/exclude.filter';

import about from './views/about';
import home from './views/home';
import containerPage from './components/container-page';
import notFound from './views/not-found';
import forbidden from './views/forbidden';
import contact from './views/contact';
import login from './views/login';
import register from './views/register';
import templates from './views/templates';
import project from './views/project';
import createProject from './views/create-project';
import projectConfig from './views/project-config';
import expeditions from './views/expeditions';
import validation from './views/validation';
import query from './views/query';
import overview from './views/overview';
import dashboard from './views/dashboard';
import record from './views/record';
import photoUpload from './views/photo-upload';
import sraUpload from './views/sra-upload';
import plateViewer from './views/plate-viewer';

import projectService from './services/project.service';
import projectConfigurationService from './services/projectConfiguration.service';
import networkConfigurationService from './services/networkConfiguration.service';
import networkService from './services/network.service';
import userService from './services/user.service';

import app from './app.component';
import auth from './components/auth';
import header from './components/header';
import navigation from './components/navigation';
import mdFileUpload from './components/md-file-upload';
// import lookup from './components/lookup';
import users from './components/users';
import projectSelectorDialog from './components/project-selector-dialog';
import collaboration from './components/tk-labels/collaboration-label';
import attribution from './components/tk-labels/attribution-label';
import notice from './components/tk-labels/notice-label';

import catcher from './utils/exceptions';
import Toaster from './utils/toaster';
import projectViewHook from './projectView.hook';
import analyticsHook from './analytics.hook';
import fimsMdDialog from './utils/fimsMdDialog';

const dependencies = [
  uirouter,
  router,
  postInterceptor,
  autofocus,
  textOverflowTooltip,
  showErrors,
  mdPopover,
  mdSticky,
  mdHint,
  mdAutocomplete,
  ngImageGallery,
  ngEnter,
  formValidators,
  trustedHtml,
  excludeFilter,
  bootstrap,
  ngMaterial,
  ngAnimate,
  ngMessages,
  filter,
  projectService,
  projectConfigurationService,
  networkConfigurationService,
  networkService,
  userService,
  containerPage,
  header,
  navigation,
  mdFileUpload,
  about,
  home,
  contact,
  forbidden,
  notFound,
  login,
  register,
  query,
  overview,
  dashboard,
  record,
  photoUpload,
  sraUpload,
  plateViewer,
  auth,
  templates,
  expeditions,
  validation,
  project,
  createProject,
  projectConfig,
  users,
  projectSelectorDialog,
  collaboration,
  attribution,
  notice,
  // lookup,
];

// attach global objects for easy access throughout app
angular.catcher = catcher;

// allow hot module replacement for development
if (module.hot) {
  module.hot.accept();
}

export default angular
  .module('biscicolApp', dependencies)
  .component('app', app)
  .run(analyticsHook)
  .run(
    /* ngInject */ $mdToast => {
      angular.toaster = Toaster($mdToast);
    },
  )
  .run(() => {
    // Load custom tracking code lazily, so it's non-blocking.
    import('./fims-analytics.js').then(analytics => analytics.init());
  })
  .run(routing)
  .run(run)
  .run(projectViewHook)
  .config(fimsMdDialog)
  .config(theme);
