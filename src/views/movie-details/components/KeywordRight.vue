<template>
    <div class="w-full mb-8 text-left">
        <div class="text-[#000] text-[18px] font-[600] mb-2">Keywords</div>
        <div class="flex flex-wrap gap-2">
            <div
                class="px-2 py-1.5 bg-[rgba(0,0,0,0.1)] rounded border border-solid border-[#d7d7d7] cursor-pointer"
                v-for="keyword in movieKeywords"
                :key="keyword.id"
            >
                <div class="text-[#000] text-[12px] font-[400]">{{ keyword.name }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue';
import { MovieKeyword, getMovieKeywords } from '@/api/movie-detail';

const props = defineProps({
    movieID: {
        type: String,
        required: true,
    },
});

const movieKeywords = ref<MovieKeyword[]>([]);

onMounted(async () => {
    try {
        const dataMovieKeywords = await getMovieKeywords(props.movieID);
        movieKeywords.value = dataMovieKeywords.keywords;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
</script>
