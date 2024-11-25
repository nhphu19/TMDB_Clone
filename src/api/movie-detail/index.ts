// services/userService.ts
import { apiGet } from '../index';

export interface MovieDetail {
    id: number;
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    };
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieCredit {
    id: number;
    adult?: boolean;
    gender?: number;
    known_for_department?: string;
    name?: string;
    original_name?: string;
    popularity?: number;
    profile_path?: string;
    credit_id?: string;
    cast_id: number;
    character: string;
    department?: string;
    job?: string;
}

export interface MovieReleaseDate {
    iso_3166_1: string;
    release_dates: {
        certification: string;
        descriptors: string[];
        iso_639_1: string;
        note: string;
        release_date: string;
        type: number;
    }[];
}

export interface MovieKeyword {
    id: number;
    name: string;
}

export interface MovieReview {
    author: string;
    author_details: {
        name: string;
        username: string;
        avatar_path: string;
        rating: number;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
}

export interface MovieVideo {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: true;
    published_at: string;
    id: string;
}

export interface MovieImage {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

export interface MovieRecommendation {
    backdrop_path: string;
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export const getMovieDetails = (id: string): Promise<MovieDetail> => {
    return apiGet<MovieDetail>(`/movie/${id}`);
};

export const getMovieCredits = (id: string): Promise<{ cast: MovieCredit[]; crew: MovieCredit[] }> => {
    return apiGet<{ cast: MovieCredit[]; crew: MovieCredit[] }>(`/movie/${id}/credits`);
};

export const getMovieReleaseDates = (id: string): Promise<{ id: number; results: MovieReleaseDate[] }> => {
    return apiGet<{ id: number; results: MovieReleaseDate[] }>(`/movie/${id}/release_dates`);
};

export const getMovieKeywords = (id: string): Promise<{ id: number; keywords: MovieKeyword[] }> => {
    return apiGet<{ id: number; keywords: MovieKeyword[] }>(`/movie/${id}/keywords`);
};

export const getMovieReviews = (id: string): Promise<{ id: number; results: MovieReview[] }> => {
    return apiGet<{ id: number; results: MovieReview[] }>(`/movie/${id}/reviews`);
};

export const getMovieVideos = (id: string): Promise<{ id: number; results: MovieVideo[] }> => {
    return apiGet<{ id: number; results: MovieVideo[] }>(`/movie/${id}/videos`);
};

export const getMovieImages = (id: string): Promise<{ id: number; backdrops: MovieImage[]; posters: MovieImage[] }> => {
    return apiGet<{ id: number; backdrops: MovieImage[]; posters: MovieImage[] }>(`/movie/${id}/images`);
};

export const getMovieRecommendations = (id: string): Promise<{ results: MovieRecommendation[] }> => {
    return apiGet<{ results: MovieRecommendation[] }>(`/movie/${id}/recommendations`);
};
