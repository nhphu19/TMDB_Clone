// services/userService.ts
import { apiGet } from '../index';

export interface PeopleDetail {
    id: number;
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string;
    gender: number;
    homepage: string;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}

export interface CombinedCredit {
    id: number;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string | null;
    first_air_date: string | null;
    title: string;
    name: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    character: string;
    credit_id: string;
    order: number;
    media_type: string;
}

export const getPeopleDetails = (id: string): Promise<PeopleDetail> => {
    return apiGet<PeopleDetail>(`/person/${id}`);
};

export const getCombinedCredits = (id: string): Promise<{ cast: CombinedCredit[]; crew: CombinedCredit[] }> => {
    return apiGet<{ cast: CombinedCredit[]; crew: CombinedCredit[] }>(`/person/${id}/combined_credits`);
};

export const getMovieCredits = (id: string): Promise<{ cast: CombinedCredit[]; crew: CombinedCredit[] }> => {
    return apiGet<{ cast: CombinedCredit[]; crew: CombinedCredit[] }>(`/person/${id}/movie_credits`);
};
