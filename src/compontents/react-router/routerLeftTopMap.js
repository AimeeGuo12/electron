//routerMap.js
import FoundMusic from '../Left/components/FoundMusic/index';
import Video from '../Left/components/Video/index';
import Friends from '../Left/components/Friends/index';
import PlayNow from '../Left/components/PlayNow/index';
import FM from '../Left/components/FM/index';


export default [
  { path: "/", name: "发现音乐", component: FoundMusic },
  { path: "/foundMusic", name: "FoundMusic", component: FoundMusic },
  { path: "/video", name: "Video", component: Video },
//   { path: "/detail/:id", name: "Detail", component: Detail },
  { path: "/friends", name: "Friends", component: Friends },
  { path: "/playNow", name: "PlayNow", component: PlayNow },
  { path: "/fM", name: "FM", component: FM },
//   { path: "/ajax", name: "Request", component: Request, auth: true },
//   { path: "/like", name: "Like", component: Like, auth: true },
//   { path: "/popModule", name: "PopModule", component: PopModule, auth: true },
//   { path: "/redux", name: "Reduxs", component: Reduxs, auth: true },
//   { path: "/login", name: "Login", component: Login },
//   { path: "/worker", name: "Worker", component: Workers },
//   { path: "/indexedDB", name: "indexedDB", component: IndexedDB }
]
