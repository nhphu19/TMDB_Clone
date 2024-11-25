// services/userService.ts
import { apiGet } from '../index';

export interface CollectionDetail {
    id: 558216;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    parts: {
        backdrop_path: string;
        id: number;
        title: string;
        original_title: string;
        overview: string;
        poster_path: string;
        media_type: string;
        adult: false;
        original_language: string;
        genre_ids: number[];
        popularity: number;
        release_date: string;
        video: false;
        vote_average: number;
        vote_count: number;
    }[];
}

export const getCollectionDetails = (id: number): Promise<CollectionDetail> => {
    return apiGet<CollectionDetail>(`/collection/${id}`);
};
