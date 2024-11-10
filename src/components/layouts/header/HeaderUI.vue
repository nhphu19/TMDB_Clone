<template>
    <div class="">
        <div class="w-full bg-darkBlue flex justify-center">
            <div class="w-destop px-10 py-4 flex items-center justify-between">
                <div class="flex items-center">
                    <a-image :height="20" :src="logo" />

                    <div class="flex items-center gap-5 ml-6">
                        <a-dropdown v-for="item in menusList" :key="item.id">
                            <div class="text-[#fff] text-[16px] font-[500] cursor-pointer">{{ item.name }}</div>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item v-for="subItem in item.subMenus" :key="subItem.id">
                                        <div class="text-[#333] text-[12px] font-[500] min-w-[100px]">
                                            {{ subItem.name }}
                                        </div>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </div>

                <div class="flex items-center gap-5">
                    <div class="cursor-pointer">
                        <PlusOutlined :style="{ color: '#fff', fontSize: '20px' }" />
                    </div>
                    <div class="p-1 border border-[#fff] border-solid rounded-[4px]">
                        <div class="text-[#fff] text-[12px] font-[500] uppercase">{{ lang }}</div>
                    </div>
                    <div class="cursor-pointer">
                        <BellFilled :style="{ color: '#fff', fontSize: '20px' }" />
                    </div>
                    <div class="h-8 w-8 bg-[#0177d2] rounded-[50%] flex items-center cursor-pointer">
                        <div class="text-[#fff] text-[14px] font-[500] uppercase w-full">{{ 'P' }}</div>
                    </div>
                    <div class="cursor-pointer">
                        <SearchOutlined :style="{ color: '#01b4e4', fontSize: '20px' }" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { PlusOutlined, BellFilled, SearchOutlined } from '@ant-design/icons-vue';

const lang = 'en';
const logo =
    'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg';
const menusList = ref([
    {
        id: 1,
        name: 'Movies',
        subMenus: [
            {
                id: 101,
                name: 'Popular',
            },
            {
                id: 102,
                name: 'Now Playing',
            },
            {
                id: 103,
                name: 'Upcoming',
            },
            {
                id: 104,
                name: 'Top Rated',
            },
        ],
    },
    {
        id: 2,
        name: 'TV Shows',
        subMenus: [
            {
                id: 201,
                name: 'Popular',
            },
            {
                id: 202,
                name: 'Airing Today',
            },
            {
                id: 203,
                name: 'On TV',
            },
            {
                id: 204,
                name: 'Top Rated',
            },
        ],
    },
    {
        id: 3,
        name: 'People',
        subMenus: [
            {
                id: 301,
                name: 'Popular People',
            },
        ],
    },
    {
        id: 4,
        name: 'More',
        subMenus: [
            {
                id: 401,
                name: 'Discussions',
            },
            {
                id: 402,
                name: 'Leaderboard',
            },
            {
                id: 403,
                name: 'Support',
            },
            {
                id: 404,
                name: 'API',
            },
        ],
    },
]);
</script>

<style scoped lang="scss"></style>
