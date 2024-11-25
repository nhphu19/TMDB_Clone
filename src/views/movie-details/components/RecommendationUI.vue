<template>
    <div class="w-full text-left">
        <div class="mb-3">
            <div class="text-[22px] text-[#000] font-[500] mr-10">Recommendations</div>
        </div>

        <div class="w-full rounded-image overflow-hidden">
            <a-empty v-if="videos.length === 0" description="No recommendations" />

            <div
                v-else
                class="container-scroll relative overflow-x-scroll overflow-y-hidden pb-2"
                ref="containerScroll"
                @scroll="handleScroll"
                :style="{ '--after-opacity': afterOpacity }"
            >
                <div class="flex gap-5">
                    <div v-for="video in videos" :key="video.id" class="flex flex-col gap-2">
                        <div class="w-[250px] h-[141px] rounded-image overflow-hidden">
                            <a-image
                                class="cursor-pointer"
                                :src="BASE_URL_IMAGE + video?.poster_path"
                                :preview="false"
                            />
                        </div>
                        <div class="flex justify-between">
                            <div class="text-[16px] text-[#000] font-[400] line-clamp-1 cursor-pointer">
                                {{ video.title }}
                            </div>
                            <div class="text-[16px] text-[#000] font-[400]">
                                {{ Math.round(video.vote_average * 10) }}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue';
import { MovieRecommendation, getMovieRecommendations } from '@/api/movie-detail';
import { BASE_URL_IMAGE } from '@/configs/constants';

const props = defineProps({
    movieID: {
        type: String,
        required: true,
    },
});

const containerScroll = ref<HTMLElement | null>(null);
const afterOpacity = ref('1');
const videos = ref<MovieRecommendation[]>([]);

const handleScroll = () => {
    if (containerScroll.value) {
        const scrollLeft = containerScroll.value.scrollLeft;
        afterOpacity.value = scrollLeft === 0 ? '1' : '0';
    }
};

onMounted(async () => {
    try {
        const dataMovieVideos = await getMovieRecommendations(props.movieID);
        videos.value = dataMovieVideos.results;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
</script>
