<template>
    <PageLayout>
        <div class="w-full flex justify-center">
            <div class="w-full max-w-page px-10 py-4">
                <div class="text-[#000] text-[24px] font-[600] text-left py-4">Popular Movies</div>

                <div class="flex gap-[30px]">
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
                        <div class="flex flex-wrap justify-between">
                            <div
                                class="discover-card relative flex flex-col text-start shadow-cardMovie border border-solid border-[#e3e3e3] rounded-[8px] overflow-hidden"
                                v-for="movie in movies"
                                :key="movie.id"
                            >
                                <a-image
                                    class="cursor-pointer"
                                    :src="BASE_URL_IMAGE + movie.poster_path"
                                    :preview="false"
                                    @click="gotoDetail(movie)"
                                />
                                <div class="relative px-3 pt-6 pb-4">
                                    <div
                                        class="absolute top-0 left-3 p-0.5 bg-[#081c22] rounded-[50%] translate-y-[-50%]"
                                    >
                                        <a-progress
                                            type="circle"
                                            :percent="percentMovie(movie.vote_average).percent"
                                            :size="32"
                                            :strokeColor="percentMovie(movie.vote_average).strokeColor"
                                            :trailColor="percentMovie(movie.vote_average).trailColor"
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
                                        @click="gotoDetail(movie)"
                                    >
                                        {{ movie.title }}
                                    </div>
                                    <div class="text-[#666] text-[16px] font-[400] line-clamp-2 mt-2">
                                        {{ formatDate(movie.release_date) }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="py-3 my-3 bg-[#01b3e4] text-[#fff] rounded-[8px] hover:text-[#333] cursor-pointer">
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
import { useRouter } from 'vue-router';
import { MovieItem, getPopularMovies } from '@/api/movie-list';
import { BASE_URL_IMAGE } from '@/configs/constants';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons-vue';
import { percentMovie, formatDate, formatTitle } from '@/utils/common';

const router = useRouter();
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

const gotoDetail = (movie: MovieItem) => {
    router.push(`/movie/${movie.id}-${formatTitle(movie.title)}`);
};
</script>

<style scoped lang="scss">
.discover-card {
    width: calc((100vw - 80px - 260px - var(--number-column-discover) * 30px) / var(--number-column-discover));
    max-width: calc(
        (var(--max-width-page) - 80px - 260px - var(--number-column-discover) * 30px) / var(--number-column-discover)
    );
    margin-bottom: 30px;
}
</style>
