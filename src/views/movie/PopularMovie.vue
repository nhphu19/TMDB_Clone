<template>
    <PageLayout>
        <div class="w-full flex justify-center">
            <div class="w-destop px-10 py-4">
                <div class="text-[#000] text-[24px] font-[600] text-left py-4">Popular Movies</div>

                <div class="flex gap-6">
                    <div class="flex flex-col">
                        <div class="w-[260px] border border-solid border-[#e3e3e3] rounded-[8px] shadow-cardMovie">
                            <div
                                class="flex items-center justify-between px-4 py-3 cursor-pointer"
                                @click="isShowSort = !isShowSort"
                            >
                                <div class="text-[#000] text-[18px] font-[600]">Sort</div>
                                <CaretRightOutlined v-if="!isShowSort" :style="{ fontSize: '16px', color: '#000' }" />
                                <CaretDownOutlined v-else :style="{ fontSize: '16px', color: '#000' }" />
                            </div>

                            <div v-show="isShowSort" class="px-4 py-3 border-t border-t-solid border-t-[#eee]">
                                <div class="text-[14px] text-[#333] font-[300] text-left mb-2">Sort Results By</div>

                                <a-dropdown :trigger="['click']">
                                    <div
                                        class="flex items-center justify-between bg-[#dee2e6] px-4 py-3 rounded-[6px] cursor-pointer"
                                    >
                                        <div class="text-[#212529] text-[12px] font-[500]">
                                            {{ sortListItems[sortItemID].name }}
                                        </div>
                                        <CaretDownOutlined :style="{ fontSize: '13px', color: '#212529' }" />
                                    </div>

                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item
                                                v-for="(sortItem, index) in sortListItems"
                                                :key="sortItem.id"
                                                @click="sortItemID = index"
                                                >{{ sortItem.name }}</a-menu-item
                                            >
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </div>
                        </div>
                    </div>

                    <div class="flex-1">
                        <div class="flex flex-wrap gap-6">
                            <div
                                class="relative flex flex-col text-start w-[180px] shadow-cardMovie border border-solid border-[#e3e3e3] rounded-[8px] overflow-hidden"
                                v-for="movie in movies"
                                :key="movie.id"
                            >
                                <a-image
                                    class="cursor-pointer"
                                    :width="180"
                                    :src="BASE_URL_IMAGE + movie.poster_path"
                                    :preview="false"
                                />
                                <div class="relative px-3 pt-6 pb-4">
                                    <div
                                        class="absolute top-0 left-3 p-0.5 bg-[#081c22] rounded-[50%] translate-y-[-50%]"
                                    >
                                        <a-progress
                                            type="circle"
                                            :percent="percentMovie(movie).percent"
                                            :size="32"
                                            :strokeColor="percentMovie(movie).strokeColor"
                                            :trailColor="percentMovie(movie).trailColor"
                                            :strokeWidth="10"
                                        >
                                            <template #format="percent">
                                                <div class="flex items-start justify-center">
                                                    <span class="text-[#fff] font-[700]">{{ percent }}</span>
                                                    <span class="text-[6px] text-[#fff] font-[700]">%</span>
                                                </div>
                                            </template>
                                        </a-progress>
                                    </div>

                                    <div
                                        class="text-[#000] text-[16px] font-[700] line-clamp-2 cursor-pointer hover:text-[#01b3e4]"
                                    >
                                        {{ movie.title }}
                                    </div>
                                    <div class="text-[#666] text-[16px] font-[400] line-clamp-2 mt-2">
                                        {{ formatDate(movie.release_date) }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            class="py-3 mt-6 mb-3 bg-[#01b3e4] text-[#fff] rounded-[8px] hover:text-[#333] cursor-pointer"
                        >
                            <div class="text-[24px] font-[600]">Load More</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { MovieItem, getPopularMovies } from '@/api/movie-list';
import { BASE_URL_IMAGE } from '@/configs/constants';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons-vue';

const movies = ref<MovieItem[]>([]);
const isShowSort = ref(false);
const sortItemID = ref(0);
const sortListItems = [
    {
        id: 1,
        name: 'Popularity Descending',
    },
    {
        id: 2,
        name: 'Popularity Ascending',
    },
    {
        id: 3,
        name: 'Rating Descending',
    },
    {
        id: 4,
        name: 'Rating Ascending',
    },
    {
        id: 5,
        name: 'Release Date Descending',
    },
    {
        id: 6,
        name: 'Release Date Ascending',
    },
];

onMounted(async () => {
    try {
        const data = await getPopularMovies();
        movies.value = data.results;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});

const percentMovie = (movie: MovieItem) => {
    const percent = Math.round(movie.vote_average * 10);

    if (percent >= 70) {
        return {
            percent: percent,
            strokeColor: '#21d07a',
            trailColor: '#204529',
        };
    }

    return {
        percent: percent,
        strokeColor: '#d2d531',
        trailColor: '#423d0f',
    };
};

const formatDate = (dateStr: string) => {
    const date: Date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });
};
</script>
