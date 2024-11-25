<template>
    <div class="w-full">
        <div class="flex cursor-pointer mb-8">
            <div class="flex px-3 py-2 mr-3 bg-[#57afd5] rounded-[5px] shadow-button">
                <div class="flex items-center gap-2 cursor-pointer">
                    <PlayCircleFilled :style="{ color: '#fff', fontSize: '16px' }" />
                    <div class="text-[#fff] text-[14px] font-[600]">Play Now</div>
                </div>
            </div>

            <div class="text-[#000] font-normal text-left">
                <div class="text-[14px]">Sunny</div>
                <div class="text-[12px]">on Appy TV+</div>
            </div>
        </div>

        <div class="flex items-center mb-8 gap-3">
            <FacebookFilled :style="{ fontSize: '24px', cursor: 'pointer' }" />
            <TwitterOutlined :style="{ fontSize: '24px', cursor: 'pointer' }" />
            <InstagramOutlined :style="{ fontSize: '24px', cursor: 'pointer' }" />
            <a-divider type="vertical" style="height: 28px; background-color: #d7d7d7" />
            <LinkOutlined :style="{ fontSize: '24px', cursor: 'pointer' }" />
        </div>

        <div class="mb-8">
            <div class="text-[#000] text-[16px] text-left mb-5">
                <div class="font-[600] mb-2">Status</div>
                <div class="font-[400]">{{ movieDetail?.status }}</div>
            </div>

            <div class="text-[#000] text-[16px] text-left mb-5">
                <div class="font-[600] mb-2">Original Language</div>
                <div class="font-[400]">{{ movieDetail?.spoken_languages[0].name }}</div>
            </div>

            <div class="text-[#000] text-[16px] text-left mb-5">
                <div class="font-[600] mb-2">Budget</div>
                <div class="font-[400]">{{ formatCurrency(movieDetail?.budget || 0) }}</div>
            </div>

            <div class="text-[#000] text-[16px] text-left">
                <div class="font-[600] mb-2">Revenue</div>
                <div class="font-[400]">{{ formatCurrency(movieDetail?.revenue || 0) }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue';
import { MovieDetail } from '@/api/movie-detail';
import {
    PlayCircleFilled,
    FacebookFilled,
    TwitterOutlined,
    InstagramOutlined,
    LinkOutlined,
} from '@ant-design/icons-vue';
import { formatCurrency } from '@/utils/common';

defineProps({
    movieDetail: {
        type: Object as PropType<MovieDetail>,
        required: false,
    },
});
</script>
