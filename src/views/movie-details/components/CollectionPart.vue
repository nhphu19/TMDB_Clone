<template>
    <div
        class="w-full h-[258px] bg-cover rounded-image"
        :style="{
            backgroundImage: `linear-gradient(to right, rgba(3,37,65,1) 0%, rgba(3,37,65,0.6) 100%), url(${
                BASE_URL_IMAGE + collection?.backdrop_path
            })`,
            backgroundPosition: '50% 50%',
        }"
    >
        <div class="w-full h-full px-5 flex flex-col text-left justify-center">
            <div class="text-[#fff] text-[30px] font-[600] line-clamp-1">
                {{ 'Part of the ' + collection?.name }}
            </div>
            <div class="text-[#fff] text-[18px] font-[400] line-clamp-1">
                {{ 'Incluces ' + collection?.parts.map((ele) => ele.title).join(', ') }}
            </div>

            <div
                class="w-[250px] flex justify-center py-3 mt-4 bg-[rgba(31.5,10.5,10.5,1)] rounded-[20px] cursor-pointer"
            >
                <div class="text-[#fff] text-[18px] font-[400]">VIEW THE COLLECTION</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue';
import { CollectionDetail, getCollectionDetails } from '@/api/collection';
import { BASE_URL_IMAGE } from '@/configs/constants';

const props = defineProps({
    collectionID: {
        type: Number,
        required: false,
    },
});

const collection = ref<CollectionDetail>();

watch(
    () => props.collectionID,
    async () => {
        try {
            if (!props.collectionID) return;
            const data = await getCollectionDetails(props.collectionID);
            collection.value = data;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    },
    { immediate: true },
);
</script>
