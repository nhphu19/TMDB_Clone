<template>
    <PageLayout>
        <div class="w-full">
            <TopBarUI />
            <MovieInfoUI
                :movieID="id"
                :movieDetail="movieDetail"
                :movieCrews="movieCrews"
                :movieReleaseDates="movieReleaseDates"
            />
        </div>

        <div class="w-full flex justify-center bg-[#fff]">
            <div class="w-full max-w-page px-10 py-8 flex">
                <div class="flex-1 pr-8 flex flex-col items-start">
                    <TopCastUI :movieCasts="movieCasts" />
                    <a-divider class="h-[1px] bg-[#d7d7d7] my-8" />
                    <SocialLeftUI :movieID="id" />
                    <a-divider class="h-[1px] bg-[#d7d7d7] my-8" />
                    <MediaLeftUI :movieID="id" />
                    <a-divider class="h-[1px] bg-[#d7d7d7] my-8" />
                    <CollectionPartUI :collectionID="collectionID" />
                    <a-divider class="h-[1px] bg-[#d7d7d7] my-8" />
                    <RecommendationUI :movieID="id" />
                </div>

                <div class="w-[260px] flex flex-col items-start">
                    <SocialRightUI :movieDetail="movieDetail" />
                    <KeywordRightUI :movieID="id" />
                </div>
            </div>
        </div>
    </PageLayout>
</template>

<script lang="ts" setup>
// Components
import TopBarUI from './components/TopBar.vue';
import MovieInfoUI from './components/MovieInfo.vue';
import TopCastUI from './components/TopCast.vue';
import SocialRightUI from './components/SocialRight.vue';
import SocialLeftUI from './components/SocialLeft.vue';
import KeywordRightUI from './components/KeywordRight.vue';
import MediaLeftUI from './components/MediaLeft.vue';
import CollectionPartUI from './components/CollectionPart.vue';
import RecommendationUI from './components/RecommendationUI.vue';
// ---------- //
import { onMounted, ref, defineProps } from 'vue';
import {
    MovieDetail,
    MovieCredit,
    MovieReleaseDate,
    getMovieDetails,
    getMovieCredits,
    getMovieReleaseDates,
} from '@/api/movie-detail';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const movieDetail = ref<MovieDetail>();
const movieCrews = ref<MovieCredit[]>([]);
const movieCasts = ref<MovieCredit[]>([]);
const movieReleaseDates = ref<MovieReleaseDate[]>([]);
const collectionID = ref(0);

onMounted(async () => {
    try {
        movieDetail.value = await getMovieDetails(props.id);
        collectionID.value = movieDetail.value.belongs_to_collection.id;

        const dataCredits = await getMovieCredits(props.id);
        movieCrews.value = dataCredits.crew;
        movieCasts.value = dataCredits.cast;

        const dataReleaseDates = await getMovieReleaseDates(props.id);
        movieReleaseDates.value = dataReleaseDates.results;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
</script>

<style lang="scss">
.container-scroll {
    width: calc(100vw - 80px - 268px);
    max-width: calc((var(--max-width-page) - 80px - 268px));
    &::after {
        content: '';
        width: 60px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0, #fff 100%);
        will-change: opacity;
        pointer-events: none;
        opacity: var(--after-opacity, 1);
        transition: opacity 0.3s ease;
    }
}
</style>
