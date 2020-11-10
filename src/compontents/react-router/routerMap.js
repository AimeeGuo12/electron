//routerMap.js
import Index from '../containers';
import Detail from '../containers/detail';
import Home from '../containers/home';
import List from '../containers/list';
import Topics from '../containers/topics';
import Parents from '../containers/passValue/parents';
import Children from '../containers/passValue/children';
import Request from '../containers/ajax';
import Like from '../containers/like';
import PopModule from '../containers/popModule/popModule';
import Reduxs from '../containers/redux/redux';
import Login from '../containers/login/login';
import Workers from '../containers/worker/worker';
import IndexedDB from '../containers/indexedDB/indexedDB';

export default [
  { path: "/", name: "App", component: Index },
  { path: "/home", name: "Home", component: Home },
  { path: "/topics", name: "Topics", component: Topics },
  { path: "/detail/:id", name: "Detail", component: Detail },
  { path: "/list", name: "List", component: List },
  { path: "/parents", name: "Parents", component: Parents },
  { path: "/children", name: "Children", component: Children },
  { path: "/ajax", name: "Request", component: Request, auth: true },
  { path: "/like", name: "Like", component: Like, auth: true },
  { path: "/popModule", name: "PopModule", component: PopModule, auth: true },
  { path: "/redux", name: "Reduxs", component: Reduxs, auth: true },
  { path: "/login", name: "Login", component: Login },
  { path: "/worker", name: "Worker", component: Workers },
  { path: "/indexedDB", name: "indexedDB", component: IndexedDB }
]
