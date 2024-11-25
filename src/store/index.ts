import { createStore } from 'vuex';
import movieVibes from './modules/movie-vibe';

export default createStore({
    modules: {
        movieVibes,
    },
});
