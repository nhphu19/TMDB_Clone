<template>
    <div class="w-full text-left">
        <div class="text-[20px] text-[#000] font-[500]">Known For</div>

        <div
            class="container-scroll relative overflow-x-scroll overflow-y-hidden py-4"
            ref="castCardList"
            @scroll="handleScroll"
            :style="{ '--after-opacity': afterOpacity }"
        >
            <div class="flex gap-[14px]">
                <div
                    class="w-[130px] flex flex-col text-start rounded-image shadow-cardMovie border border-solid border-[#e3e3e3]"
                    v-for="cast in movieCasts"
                    :key="cast.id"
                >
                    <div class="rounded-tl-lg rounded-tr-lg overflow-hidden">
                        <a-image
                            class="cursor-pointer"
                            :width="130"
                            :height="195"
                            :src="BASE_URL_IMAGE + cast.poster_path"
                            :preview="false"
                        />
                    </div>

                    <div class="px-2 pt-2 pb-3 cursor-pointer hover:opacity-60">
                        <div class="text-[#000] text-[14px] font-[400] text-center leading-4 line-clamp-2">
                            {{ cast.title }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue';
import { CombinedCredit, getMovieCredits } from '@/api/people';
import { BASE_URL_IMAGE } from '@/configs/constants';

const props = defineProps({
    peopleID: {
        type: String,
        required: true,
    },
});
const movieCasts = ref<CombinedCredit[]>([]);
const castCardList = ref<HTMLElement | null>(null);
const afterOpacity = ref('1');

const handleScroll = () => {
    if (castCardList.value) {
        const scrollLeft = castCardList.value.scrollLeft;
        afterOpacity.value = scrollLeft === 0 ? '1' : '0';
    }
};

onMounted(async () => {
    try {
        const data = await getMovieCredits(props.peopleID);
        movieCasts.value = data.cast.filter((ele) => ele.order == 0 && ele.poster_path != null);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
</script>
