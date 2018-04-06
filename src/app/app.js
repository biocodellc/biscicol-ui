import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import bootstrap from 'angular-ui-bootstrap';
import ngMaterial from 'angular-material';

// todo remove the following and use only angular-ui-bootstrap
import 'jquery-ui';

// Leaflet
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';

// use async functions w/ babel
import 'babel-polyfill';

// import 'angular-material/angular-material.min.css';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'bootstrap-sass';

// this loads the css for the app
import '../style/app.scss';

import run from './app.run';
import theme from './app.theme';
import routing from './app.routes';
import router from './utils/router';
import postInterceptor from './postInterceptor';
import autofocus from './directives/autofocus.directive';
import showErrors from './directives/showErrors.directive';
import trustedHtml from './filters/html.filter';

import about from './views/about';
import fullPage from './components/full-page';
import containerPage from './components/container-page';
// import notFound from './views/not-found';
import contact from './views/contact';
import login from './views/login';
import templates from './views/templates';
import project from './views/project';
import expeditions from './views/expeditions';
import validation from './views/validation';
import query from './views/query';

import projectService from './services/project.service';
import userService from './services/user.service';

import app from './app.component';
import auth from './components/auth';
import header from './components/header';
import navigation from './components/navigation';
import alerts from './components/alerts';
// import lookup from './components/lookup';
import modals from './components/modals';
import users from './components/users';

import Exceptions from './utils/exceptions';
import Alerts from './utils/alerts';

const dependencies = [
  uirouter,
  router,
  postInterceptor,
  autofocus,
  showErrors,
  trustedHtml,
  bootstrap,
  ngMaterial,
  projectService,
  userService,
  fullPage,
  containerPage,
  header,
  navigation,
  alerts,
  about,
  contact,
  // notFound,
  login,
  query,
  auth,
  templates,
  expeditions,
  validation,
  project,
  users,
  modals,
  // lookup,
];

// attach global objects for easy access throughout app
angular.alerts = new Alerts();
const e = new Exceptions();
angular.catcher = e.catcher.bind(e);

export default angular
  .module('biscicolApp', dependencies)
  .component('app', app)
  .run(routing)
  .run(run)
  .config(theme);
