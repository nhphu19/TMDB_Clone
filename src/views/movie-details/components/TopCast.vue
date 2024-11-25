<template>
    <div class="w-full text-left">
        <div class="text-[20px] text-[#000] font-[500]">Top Billed Cast</div>

        <div
            class="container-scroll relative overflow-x-scroll overflow-y-hidden py-4"
            ref="castCardList"
            @scroll="handleScroll"
            :style="{ '--after-opacity': afterOpacity }"
        >
            <div class="flex gap-[14px]">
                <div
                    class="w-[140px] flex flex-col text-start rounded-image shadow-cardMovie border border-solid border-[#e3e3e3]"
                    v-for="cast in visibleCasts"
                    :key="cast.id"
                >
                    <div class="rounded-tl-lg rounded-tr-lg overflow-hidden">
                        <a-image
                            class="cursor-pointer"
                            :width="138"
                            :height="175"
                            :src="BASE_URL_IMAGE + cast.profile_path"
                            :preview="false"
                        />
                    </div>

                    <div class="px-2 pt-3 pb-3">
                        <div class="text-[#000] text-[16px] font-[700] line-clamp-2 cursor-pointer hover:opacity-60">
                            {{ cast.name }}
                        </div>
                        <div class="text-[#333] text-[14px] font-[400] line-clamp-2 mt-2">
                            {{ cast.character }}
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-2 px-4 whitespace-nowrap cursor-pointer">
                    <div class="text-[#000] text-[16px] font-[700]">View More</div>
                    <ArrowRightOutlined :style="{ color: '#000' }" />
                </div>
            </div>
        </div>

        <div class="text-[18px] text-[#000] font-[600] mt-4 cursor-pointer hover:opacity-60">
            {{ 'Full Cast & Crew' }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref, defineProps } from 'vue';
import { MovieCredit } from '@/api/movie-detail';
import { ArrowRightOutlined } from '@ant-design/icons-vue';
import { BASE_URL_IMAGE } from '@/configs/constants';

const props = defineProps({
    movieCasts: {
        type: Object as PropType<MovieCredit[]>,
        required: false,
    },
});
const castCardList = ref<HTMLElement | null>(null);
const afterOpacity = ref('1');
const visibleCasts = computed(() => props.movieCasts?.slice(0, 9));

const handleScroll = () => {
    if (castCardList.value) {
        const scrollLeft = castCardList.value.scrollLeft;
        afterOpacity.value = scrollLeft === 0 ? '1' : '0';
    }
};
</script>
