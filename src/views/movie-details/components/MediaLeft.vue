<template>
    <div class="w-full text-left">
        <div class="flex items-baseline mb-3">
            <div class="text-[22px] text-[#000] font-[500] mr-10">Media</div>

            <div class="flex gap-8">
                <div
                    class="text-[17px] text-[#000] font-[500] pb-1 cursor-pointer"
                    :class="tabIndex == 'video' ? ['border-b-4', 'border-b-solid', 'border-b-[#000]'] : ''"
                    @click="tabIndex = 'video'"
                >
                    Videos
                    <span v-if="videos.length > 0" class="opacity-60">{{ videos.length }}</span>
                </div>
                <div
                    class="text-[17px] text-[#000] font-[500] pb-1 cursor-pointer"
                    :class="tabIndex == 'backdrop' ? ['border-b-4', 'border-b-solid', 'border-b-[#000]'] : ''"
                    @click="tabIndex = 'backdrop'"
                >
                    Backdrops
                    <span v-if="backdrops.length > 0" class="opacity-60">{{ backdrops.length }}</span>
                </div>
                <div
                    class="text-[17px] text-[#000] font-[500] pb-1 cursor-pointer"
                    :class="tabIndex == 'poster' ? ['border-b-4', 'border-b-solid', 'border-b-[#000]'] : ''"
                    @click="tabIndex = 'poster'"
                >
                    Posters
                    <span v-if="posters.length > 0" class="opacity-60">{{ posters.length }}</span>
                </div>
            </div>

            <div
                class="flex-1 text-[14px] text-[rgba(1,180,228,1)] font-[600] text-right mt-4 cursor-pointer hover:opacity-60"
            >
                {{ 'View All ' + (tabIndex == 'video' ? 'Videos' : tabIndex == 'backdrop' ? 'Backdrops' : 'Posters') }}
            </div>
        </div>

        <div v-if="tabIndex == 'video'" class="w-full rounded-image overflow-hidden">
            <a-empty v-if="videos.length === 0" description="No videos" />

            <div
                v-else
                class="container-scroll relative overflow-x-scroll overflow-y-hidden"
                ref="containerScroll"
                @scroll="handleScroll"
                :style="{ '--after-opacity': afterOpacity }"
            >
                <div class="flex">
                    <div
                        v-for="video in videos.filter((ele) => ele.type === 'Trailer')"
                        :key="video.id"
                        class="flex bg-center"
                        :style="{
                            backgroundImage: `url(${getThumbnailYoutube(video.key)})`,
                            backgroundSize: '100%',
                        }"
                    >
                        <div class="w-[533px] h-[300px] flex items-center justify-center">
                            <div class="w-[66px] h-[66px] rounded-[50%] bg-[#fff] cursor-pointer">
                                <PlayCircleFilled :style="{ fontSize: '66px', color: 'rgba(0,0,0,0.7)' }" />
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 px-4 whitespace-nowrap cursor-pointer">
                        <div class="text-[#000] text-[16px] font-[600]">View More</div>
                        <ArrowRightOutlined :style="{ color: '#000' }" />
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="tabIndex == 'backdrop'" class="w-full rounded-image overflow-hidden">
            <a-empty v-if="backdrops.length === 0" description="No backdrops" />

            <div
                v-else
                class="container-scroll relative overflow-x-scroll overflow-y-hidden"
                ref="containerScroll"
                @scroll="handleScroll"
                :style="{ '--after-opacity': afterOpacity }"
            >
                <div class="flex">
                    <div v-for="backdrop in backdrops.slice(0, 6)" :key="backdrop.file_path" class="flex bg-center">
                        <div class="w-[533px] h-[300px] flex items-center justify-center">
                            <a-image
                                class="cursor-pointer"
                                :src="BASE_URL_IMAGE + backdrop.file_path"
                                :preview="false"
                            />
                        </div>
                    </div>

                    <div class="flex items-center gap-2 px-4 whitespace-nowrap cursor-pointer">
                        <div class="text-[#000] text-[16px] font-[600]">View More</div>
                        <ArrowRightOutlined :style="{ color: '#000' }" />
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="tabIndex == 'poster'" class="w-full rounded-image overflow-hidden">
            <a-empty v-if="posters.length === 0" description="No posters" />

            <div
                v-else
                class="container-scroll relative overflow-x-scroll overflow-y-hidden"
                ref="containerScroll"
                @scroll="handleScroll"
                :style="{ '--after-opacity': afterOpacity }"
            >
                <div class="flex">
                    <div v-for="poster in posters.slice(0, 6)" :key="poster.file_path" class="flex bg-center">
                        <div class="w-[200px] h-[300px] flex items-center justify-center">
                            <a-image class="cursor-pointer" :src="BASE_URL_IMAGE + poster.file_path" :preview="false" />
                        </div>
                    </div>

                    <div class="flex items-center gap-2 px-4 whitespace-nowrap cursor-pointer">
                        <div class="text-[#000] text-[16px] font-[600]">View More</div>
                        <ArrowRightOutlined :style="{ color: '#000' }" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue';
import { MovieVideo, MovieImage, getMovieVideos, getMovieImages } from '@/api/movie-detail';
import { PlayCircleFilled, ArrowRightOutlined } from '@ant-design/icons-vue';
import { getThumbnailYoutube } from '@/utils/common';
import { BASE_URL_IMAGE } from '@/configs/constants';

const props = defineProps({
    movieID: {
        type: String,
        required: true,
    },
});

const tabIndex = ref('video'); // backdrop || poster
const containerScroll = ref<HTMLElement | null>(null);
const afterOpacity = ref('1');
const videos = ref<MovieVideo[]>([]);
const backdrops = ref<MovieImage[]>([]);
const posters = ref<MovieImage[]>([]);

const handleScroll = () => {
    if (containerScroll.value) {
        const scrollLeft = containerScroll.value.scrollLeft;
        afterOpacity.value = scrollLeft === 0 ? '1' : '0';
    }
};

onMounted(async () => {
    try {
        const dataMovieVideos = await getMovieVideos(props.movieID);
        videos.value = dataMovieVideos.results;

        const dataMovieImages = await getMovieImages(props.movieID);
        backdrops.value = [...dataMovieImages.backdrops];
        posters.value = [...dataMovieImages.posters];
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
</script>
