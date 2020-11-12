import Recommand from './components/Recommand/index';
import SongList from './components/SongList/index';
import Rank from './components/Rank/index';

export default [
    { path: "/foundMusic/recommand", name: "Recommand", component: Recommand },
    { path: "/foundMusic/songList", name: "SongList", component: SongList },

    { path: "/foundMusic/rank", name: "Rank", component: Rank },

  ]