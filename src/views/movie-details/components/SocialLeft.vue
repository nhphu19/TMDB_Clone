<template>
    <div class="w-full text-left">
        <div class="flex items-baseline mb-3">
            <div class="text-[22px] text-[#000] font-[500] mr-10">Social</div>

            <div class="flex gap-8">
                <div
                    class="text-[17px] text-[#000] font-[500] pb-1 cursor-pointer"
                    :class="tabIndex == 'review' ? ['border-b-4', 'border-b-solid', 'border-b-[#000]'] : ''"
                    @click="tabIndex = 'review'"
                >
                    Reviews
                    <span class="opacity-60">{{ movieReviews.length }}</span>
                </div>
            </div>
        </div>

        <div class="w-full p-5 rounded-image border border-solid border-[rgba(227,227,227,1)] shadow-cardMovie">
            <a-empty v-if="movieReviews.length === 0" />
            <div v-else>
                <div v-if="tabIndex == 'review'" class="flex items-center text-left">
                    <a-avatar :size="45" :src="BASE_URL_IMAGE + movieReviews[0].author_details.avatar_path" />
                    <div class="ml-4">
                        <div class="text-[20px] text-[#000] font-[700]">
                            {{ 'A review by ' + movieReviews[0].author }}
                        </div>
                        <div class="flex items-center mt-1">
                            <div class="flex items-center px-2 py-1.5 bg-darkBlue rounded-[6px]">
                                <StarFilled :style="{ fontSize: '12px', color: '#fff' }" />
                                <div class="text-[12px] text-[#fff] font-[500] ml-1">
                                    {{ movieReviews[0].author_details.rating * 10 }}%
                                </div>
                            </div>
                            <div class="text-[12px] text-[#000] font-[300] ml-2">
                                Written by
                                <span class="font-[500]">{{ movieReviews[0].author }}</span>
                                on
                                <span>{{ formatDate(movieReviews[0].created_at) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <p
                    class="text-[16px] text-[#000] font-[400] leading-6 mt-3 text-left"
                    v-html="movieReviews[0].content"
                ></p>
            </div>
        </div>

        <div class="text-[18px] text-[#000] font-[600] mt-4 cursor-pointer hover:opacity-60">
            {{ tabIndex == 'review' ? 'Read All Reviews' : 'Go to Discussions' }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue';
import { MovieReview, getMovieReviews } from '@/api/movie-detail';
import { StarFilled } from '@ant-design/icons-vue';
import { formatDate } from '@/utils/common';
import { BASE_URL_IMAGE } from '@/configs/constants';

const props = defineProps({
    movieID: {
        type: String,
        required: true,
    },
});

const tabIndex = ref('review'); // review || discussion
const movieReviews = ref<MovieReview[]>([]);

onMounted(async () => {
    try {
        const dataMovieKeywords = await getMovieReviews(props.movieID);
        movieReviews.value = dataMovieKeywords.results;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
</script>
