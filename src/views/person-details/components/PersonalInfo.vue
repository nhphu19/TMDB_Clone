<template>
    <div class="w-full flex flex-col">
        <div class="rounded-image overflow-hidden h-[450px] w-[300px]">
            <a-image :src="BASE_URL_IMAGE + peopleDetail?.profile_path" :preview="false" />
        </div>

        <div class="flex items-center my-6 gap-3">
            <FacebookFilled class="text-[28px] cursor-pointer" />
            <TwitterOutlined class="text-[28px] cursor-pointer" />
            <InstagramOutlined class="text-[28px] cursor-pointer" />
        </div>

        <div class="text-[#000] text-[16px] text-left">
            <div class="text-[18px] font-[700] mb-2">Personal Info</div>

            <div class="mb-6">
                <div class="font-[600] mb-2">Known For</div>
                <div class="font-[400]">{{ peopleDetail?.known_for_department }}</div>
            </div>
            <div class="mb-6">
                <div class="font-[600] mb-2">Known Credits</div>
                <div class="font-[400]">{{ Math.round(peopleDetail?.popularity || 0) }}</div>
            </div>
            <div class="mb-6">
                <div class="font-[600] mb-2">Gender</div>
                <div class="font-[400]">{{ peopleDetail?.gender }}</div>
            </div>
            <div class="mb-6" v-if="peopleDetail?.birthday">
                <div class="font-[600] mb-2">Birthday</div>
                <div class="font-[400]">{{ formatDate(peopleDetail.birthday) }}</div>
            </div>
            <div class="mb-6">
                <div class="font-[600] mb-2">Place of Birth</div>
                <div class="font-[400]">{{ peopleDetail?.place_of_birth }}</div>
            </div>
            <div class="mb-6">
                <div class="font-[600] mb-2">Also Known As</div>
                <div class="font-[400] mb-2" v-for="(text, index) in peopleDetail?.also_known_as" :key="index">
                    {{ text }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
import { PeopleDetail } from '@/api/people';
import { BASE_URL_IMAGE } from '@/configs/constants';
import { FacebookFilled, TwitterOutlined, InstagramOutlined } from '@ant-design/icons-vue';
import { formatDate } from '@/utils/common';
defineProps({
    peopleDetail: {
        type: Object as PropType<PeopleDetail>,
        required: false,
    },
});
</script>
