<template>
    <div class="flex items-center justify-center gap-10">
        <a-dropdown v-for="item in menusList" :key="item.id">
            <div class="flex items-center gap-2">
                <div class="text-[#000] text-[16px] font-[400] py-3 cursor-pointer">{{ item.name }}</div>
                <CaretDownOutlined :style="{ fontSize: '14px', color: '#000' }" />
            </div>
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
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CaretDownOutlined } from '@ant-design/icons-vue';
const menusList = ref([
    {
        id: 1,
        name: 'Overview',
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
        name: 'Media',
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
        name: 'Fandom',
        subMenus: [
            {
                id: 301,
                name: 'Popular People',
            },
        ],
    },
    {
        id: 4,
        name: 'Share',
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
