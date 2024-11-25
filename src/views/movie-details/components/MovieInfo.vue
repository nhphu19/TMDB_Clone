<template>
    <div
        class="w-full bg-cover"
        :style="{
            backgroundImage: `url(${BASE_URL_IMAGE + movieDetail?.backdrop_path})`,
            backgroundPosition: `left calc((50vw - 170px) - 340px) top`,
        }"
    >
        <div
            class="flex justify-center"
            :style="{
                backgroundImage: `linear-gradient(to right, rgba(31, 10, 10, 1) calc((50vw - 170px) - 340px), rgba(31, 10, 10, 0.84) 50%, rgba(31, 10, 10, 0.84) 100%)`,
            }"
        >
            <div class="w-full max-w-page px-10 py-8 flex gap-10">
                <div class="rounded-image overflow-hidden h-[450px] w-[300px]">
                    <a-image class="cursor-pointer" :src="BASE_URL_IMAGE + movieDetail?.poster_path" :preview="false" />
                </div>

                <div class="flex-1 flex flex-col items-start">
                    <div class="text-[#fff] text-[35px] font-[700] line-clamp-1 cursor-pointer hover:opacity-80">
                        {{ movieDetail?.title }}
                        <span class="text-[#fff] text-[35px] font-[400] opacity-80"
                            >({{ formatDateTimeJS(getReleaseDate.date, 'YYYY') }})</span
                        >
                    </div>

                    <div class="flex gap-2 items-center">
                        <div class="p-1 border border-solid border-[rgba(255,255,255,0.6)]">
                            <div class="text-[16px] text-[rgba(255,255,255,0.6)] font-[700]">
                                {{ getReleaseDate.name }}
                            </div>
                        </div>

                        <div class="text-[16px] text-[#fff] font-[400]">
                            {{ formatDateTimeJS(getReleaseDate.date, 'MM/DD/YYYY') }}
                        </div>

                        <div class="relative flex pl-5">
                            <div
                                v-for="(genre, index) in movieDetail?.genres"
                                :key="genre.id"
                                class="text-[#fff] text-[16px] font-[400] cursor-pointer hover:opacity-80"
                                :class="{ 'dot-before': index == 0 }"
                            >
                                {{ (index != 0 ? ', ' : '') + genre.name }}
                            </div>
                        </div>
                        <div class="relative pl-5">
                            <div class="dot-before text-[#fff] text-[16px] font-[400] cursor-pointer hover:opacity-80">
                                {{ formatRuntime(movieDetail?.runtime || 0) }}
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center mt-4">
                        <div
                            class="p-1 mr-1 bg-[#081c22] rounded-[50%] transition-transform duration-300 hover:scale-110 cursor-pointer"
                        >
                            <a-progress
                                type="circle"
                                :percent="percentMovie(movieDetail?.vote_average || 0).percent"
                                :size="60"
                                :strokeColor="percentMovie(movieDetail?.vote_average || 0).strokeColor"
                                :trailColor="percentMovie(movieDetail?.vote_average || 0).trailColor"
                                :strokeWidth="8"
                            >
                                <template #format="percent">
                                    <div class="flex items-start justify-center">
                                        <span class="text-[20px] text-[#fff] font-[700]">{{ percent }}</span>
                                        <span class="text-[10px] text-[#fff] font-[500]">%</span>
                                    </div>
                                </template>
                            </a-progress>
                        </div>

                        <div class="text-[16px] text-[#fff] font-[700] leading-6 text-left">User<br />Score</div>

                        <div class="flex ml-3 items-center">
                            <div
                                class="p-1 flex items-center rounded-[50%] bg-primaryCus z-[1] hover:scale-125 hover:z-10 duration-300"
                            >
                                <a-image
                                    class="cursor-pointer"
                                    :height="28"
                                    :src="HappyEmoji.happy_01"
                                    :preview="false"
                                />
                            </div>
                            <div
                                class="p-1 flex items-center rounded-[50%] bg-primaryCus ml-[-12px] z-[2] hover:scale-125 hover:z-10 duration-300"
                            >
                                <a-image
                                    class="cursor-pointer"
                                    :height="28"
                                    :src="HappyEmoji.happy_02"
                                    :preview="false"
                                />
                            </div>
                            <div
                                class="p-1 flex items-center rounded-[50%] bg-primaryCus ml-[-12px] z-[3] hover:scale-125 hover:z-10 duration-300"
                            >
                                <a-image
                                    class="cursor-pointer"
                                    :height="28"
                                    :src="HappyEmoji.happy_03"
                                    :preview="false"
                                />
                            </div>
                        </div>

                        <div
                            v-if="!movieVibe"
                            class="flex items-center p-2.5 ml-4 bg-darkBlue rounded-full transition-transform duration-300 hover:scale-110 cursor-pointer"
                        >
                            <div class="text-[16px] text-[#fff] font-[700] mr-2" @click="showVibeModal = true">
                                What's your Vibe?
                            </div>

                            <a-tooltip placement="right" color="rgba(3, 37, 65, 1)">
                                <template #title>
                                    <span class="text-[12px] text-[#fff] leading-4 font-[500]"
                                        >Welcome to Vibes, TMDB's new rating system! For more information, visit the
                                        contribution bible.
                                    </span>
                                </template>
                                <InfoCircleFilled :style="{ color: '#fff' }" />
                            </a-tooltip>
                        </div>

                        <div
                            v-else
                            class="flex items-center p-2.5 ml-4 bg-darkBlue rounded-full transition-transform duration-300 hover:scale-110 cursor-pointer"
                            @click="showVibeModal = true"
                        >
                            <div class="text-[16px] text-[#fff] font-[700] mr-1">Your Vibe</div>

                            <div v-if="movieVibe.rating" class="text-[18px] text-[#fff] font-[700]">
                                <span
                                    :class="
                                        movieVibe.rating >= 70
                                            ? 'text-[#21d07a]'
                                            : movieVibe.rating > 30
                                            ? 'text-[#d2d531]'
                                            : 'text-[#db2360]'
                                    "
                                    >{{ movieVibe.rating }}</span
                                >
                                <span class="text-[12px]">%</span>
                            </div>

                            <a-divider
                                v-if="movieVibe.emojis?.length > 0 && movieVibe.rating"
                                class="ml-3 mr-2"
                                type="vertical"
                                style="height: 28px; width: 2px; border-color: #7cb305"
                            />

                            <div class="flex items-center">
                                <div
                                    v-for="(emoji, index) in movieVibe.emojis"
                                    :key="index"
                                    class="p-1 flex items-center rounded-[50%] bg-darkBlue z-[3] hover:scale-125 hover:z-10 duration-300"
                                    :class="index !== 0 ? 'ml-[-12px]' : ''"
                                >
                                    <a-image
                                        class="cursor-pointer"
                                        :height="28"
                                        :src="AllEmoji[emoji]"
                                        :preview="false"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-4 mt-4">
                        <div class="bg-darkBlue h-[46px] w-[46px] rounded-[50%]">
                            <a-tooltip placement="bottom" color="rgba(3, 37, 65, 1)">
                                <template #title>
                                    <span class="text-[12px] text-[#fff] font-[500]">Add to list</span>
                                </template>
                                <div class="w-full h-full flex items-center justify-center cursor-pointer">
                                    <UnorderedListOutlined :style="{ color: '#fff' }" />
                                </div>
                            </a-tooltip>
                        </div>
                        <div class="bg-darkBlue h-[46px] w-[46px] rounded-[50%]">
                            <a-tooltip placement="bottom" color="rgba(3, 37, 65, 1)">
                                <template #title>
                                    <span class="text-[12px] text-[#fff] font-[500]">Mark as favorite</span>
                                </template>
                                <div class="w-full h-full flex items-center justify-center cursor-pointer">
                                    <HeartFilled :style="{ color: '#fff' }" />
                                </div>
                            </a-tooltip>
                        </div>
                        <div class="bg-darkBlue h-[46px] w-[46px] rounded-[50%]">
                            <a-tooltip placement="bottom" color="rgba(3, 37, 65, 1)">
                                <template #title>
                                    <span class="text-[12px] text-[#fff] font-[500]">Add to your watchlist</span>
                                </template>
                                <div class="w-full h-full flex items-center justify-center cursor-pointer">
                                    <BookFilled :style="{ color: '#fff' }" />
                                </div>
                            </a-tooltip>
                        </div>

                        <div class="flex items-center gap-2 ml-4 hover:opacity-60 cursor-pointer">
                            <PlayCircleFilled :style="{ color: '#fff', fontSize: '20px' }" />
                            <div class="text-[#fff] text-[16px] font-[600]">Play Trailer</div>
                        </div>
                    </div>

                    <div class="mt-6 text-[#fff] text-[17px] font-[400] italic opacity-70">
                        {{ movieDetail?.tagline }}
                    </div>

                    <div class="text-[#fff] text-[20px] font-[600] py-2">Overview</div>
                    <div class="text-[#fff] text-[16px] leading-6 font-[400] text-left">
                        {{ movieDetail?.overview }}
                    </div>

                    <a-row class="w-full" :gutter="16">
                        <a-col class="mt-4" :span="8" v-for="item in crewsByType('Director')" :key="item.id">
                            <div class="text-[#fff] text-[16px] leading-6 font-[700] text-left">
                                {{ item?.name }}
                            </div>
                            <div class="text-[#fff] text-[14px] leading-6 font-[400] text-left">
                                {{ item?.job }}
                            </div>
                        </a-col>
                        <a-col class="mt-4" :span="8" v-for="item in crewsByType('Characters')" :key="item.id">
                            <div class="text-[#fff] text-[16px] leading-6 font-[700] text-left">
                                {{ item?.name }}
                            </div>
                            <div class="text-[#fff] text-[14px] leading-6 font-[400] text-left">
                                {{ item?.job }}
                            </div>
                        </a-col>
                        <a-col class="mt-4" :span="8" v-for="item in crewsByType('Story')" :key="item.id">
                            <div class="text-[#fff] text-[16px] leading-6 font-[700] text-left">
                                {{ item?.name }}
                            </div>
                            <div class="text-[#fff] text-[14px] leading-6 font-[400] text-left">
                                {{ item?.job }}
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </div>
    </div>

    <VibeModal
        :movieID="movieID"
        :movieDetail="movieDetail"
        :showModal="showVibeModal"
        :showHideModal="
            () => {
                showVibeModal = !showVibeModal;
            }
        "
    />
</template>

<script lang="ts" setup>
// Components
import VibeModal from '../modals/VibeModal.vue';
// ---------- //
import { computed, defineProps, PropType, ref } from 'vue';
import { MovieDetail, MovieCredit, MovieReleaseDate } from '@/api/movie-detail';
import { BASE_URL_IMAGE } from '@/configs/constants';
import {
    InfoCircleFilled,
    UnorderedListOutlined,
    HeartFilled,
    BookFilled,
    PlayCircleFilled,
} from '@ant-design/icons-vue';
import { percentMovie, formatDateTimeJS, formatRuntime } from '@/utils/common';
import { AllEmoji, HappyEmoji } from '@/utils/emoji';
import { useStore } from 'vuex';
import { MovieVibe } from '@/store/modules/movie-vibe';

const store = useStore();
const props = defineProps({
    movieID: {
        type: String,
        required: true,
    },
    movieDetail: {
        type: Object as PropType<MovieDetail>,
        required: false,
    },
    movieCrews: {
        type: Object as PropType<MovieCredit[]>,
        required: false,
    },
    movieReleaseDates: {
        type: Object as PropType<MovieReleaseDate[]>,
        required: false,
    },
});

const movieVibe = computed<MovieVibe>(() => store.getters['movieVibes/getMovieVibeByMovie'](props.movieID));
const showVibeModal = ref(false);

const crewsByType = (typeName: string) => {
    return props.movieCrews?.filter((ele) => ele.job == typeName);
};

const getReleaseDate = computed(() => {
    const releaseDate = props.movieReleaseDates?.find(
        (ele) => ele.iso_3166_1 == props.movieDetail?.production_countries[0].iso_3166_1,
    );

    if (releaseDate) {
        const data = releaseDate.release_dates.find((ele) => ele.type == 3);

        if (data) {
            return {
                name: data.certification,
                date: data.release_date,
            };
        }
    }

    return {
        name: 'US',
        date: Date.now(),
    };
});
</script>

<style scoped lang="scss">
.dot-before {
    &::before {
        font-size: 1.1em;
        line-height: 1;
        content: '•';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 7px;
        display: inline-flex;
        align-content: center;
        align-items: center;
        z-index: 1;
    }
}
</style>
