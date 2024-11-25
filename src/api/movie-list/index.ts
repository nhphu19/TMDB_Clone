// services/userService.ts
import { apiGet } from '../index';

export interface MovieItem {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface MovieListResponse {
    page: number;
    results: MovieItem[];
}

export const getPopularMovies = (): Promise<MovieListResponse> => apiGet<MovieListResponse>('/movie/popular');
