<template>
    <div class="">
        <div class="w-full bg-darkBlue flex justify-center">
            <div class="p-20 flex items-start gap-8">
                <div class="relative">
                    <div class="absolute top-[-32px]">
                        <a-image :height="94" :src="logo" />
                    </div>

                    <div class="bg-[#fff] p-3 rounded-[8px] mt-[100px]">
                        <div class="text-[#01b4e4] text-[20px] font-[700] leading-[20px]">{{ 'Hi nhphu19!' }}</div>
                    </div>
                </div>

                <div class="flex flex-col items-start" v-for="item in footerInfoList" :key="item.id">
                    <div class="text-[#fff] text-[20px] font-[700] uppercase mb-2">{{ item.name }}</div>
                    <div
                        class="text-[#fff] text-[16px] font-[400] mt-1"
                        v-for="subItem in item.subMenus"
                        :key="subItem.id"
                    >
                        {{ subItem.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const logo =
    'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';
const footerInfoList = ref([
    {
        id: 1,
        name: 'The Basics',
        subMenus: [
            {
                id: 101,
                name: 'About TMDB',
            },
            {
                id: 102,
                name: 'Contact Us',
            },
            {
                id: 103,
                name: 'Support Forums',
            },
            {
                id: 104,
                name: 'API',
            },
            {
                id: 105,
                name: 'System Status',
            },
        ],
    },
    {
        id: 2,
        name: 'Get Involved',
        subMenus: [
            {
                id: 201,
                name: 'Contribution Bible',
            },
            {
                id: 202,
                name: 'Add New Movie',
            },
            {
                id: 203,
                name: 'Add New TV Show',
            },
        ],
    },
    {
        id: 3,
        name: 'Community',
        subMenus: [
            {
                id: 301,
                name: 'Guidelines',
            },
            {
                id: 302,
                name: 'Discussions',
            },
            {
                id: 303,
                name: 'Leaderboard',
            },
        ],
    },
    {
        id: 4,
        name: 'Legal',
        subMenus: [
            {
                id: 401,
                name: 'Terms of Use',
            },
            {
                id: 402,
                name: 'API Terms of Use',
            },
            {
                id: 403,
                name: 'Privacy Policy',
            },
            {
                id: 404,
                name: 'DMCA Policy',
            },
        ],
    },
]);
</script>

<style scoped lang="scss"></style>
