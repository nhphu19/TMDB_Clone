import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PopularMovieView from '@/views/movie/PopularMovie.vue';
import MovieDetailsView from '@/views/movie-details/MovieDetails.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/movie',
        name: 'movie',
        component: PopularMovieView,
    },
    {
        path: '/movie/:id',
        name: 'movie-details',
        component: MovieDetailsView,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
