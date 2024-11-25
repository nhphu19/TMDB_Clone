import { Module } from 'vuex';
import { EmojiKeys } from '@/utils/emoji';

export interface MovieVibe {
    rating: number;
    emojis: EmojiKeys[];
}

export interface MovieVibesState {
    [movieId: string]: MovieVibe;
}

const saveToLocalStorage = (movieVibe: MovieVibesState) => {
    localStorage.setItem('movieVibes', JSON.stringify(movieVibe));
};

const loadFromLocalStorage = (): MovieVibesState => {
    const savedData = localStorage.getItem('movieVibes');
    return savedData ? JSON.parse(savedData) : {};
};

const movieVibes: Module<MovieVibesState, unknown> = {
    namespaced: true,
    state: loadFromLocalStorage(),
    mutations: {
        addOrUpdateMovieVibe(state, { movieId, movieVibe }: { movieId: string; movieVibe: MovieVibe }) {
            state[movieId] = movieVibe;
            saveToLocalStorage(state);
        },
        removeMovieVibe(state, movieId: string) {
            delete state[movieId];
            saveToLocalStorage(state);
        },
    },
    actions: {
        saveMovieVibe({ commit }, payload: { movieId: string; movieVibe: MovieVibe }) {
            commit('addOrUpdateMovieVibe', payload);
        },
        deleteMovieVibe({ commit }, movieId: string) {
            commit('removeMovieVibe', movieId);
        },
    },
    getters: {
        getMovieVibes: (state) => state.movieVibe,
        getMovieVibeByMovie:
            (state) =>
            (movieId: string): MovieVibe =>
                state[movieId] || null,
    },
};

export default movieVibes;
