<template>
    <div class="w-full text-left">
        <div class="text-[32px] font-[700]">{{ peopleDetail?.name }}</div>
        <div class="text-[20px] font-[600] mt-6">Biography</div>

        <a-typography-paragraph
            class="text-[16px] font-[400] mt-2 whitespace-pre-line"
            :ellipsis="ellipsis ? { rows: 5, expandable: true, symbol: 'Read more' } : false"
            :content="peopleDetail?.biography"
        />
    </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, ref } from 'vue';
import { PeopleDetail } from '@/api/people';
defineProps({
    peopleDetail: {
        type: Object as PropType<PeopleDetail>,
        required: false,
    },
});

const ellipsis = ref(true);
</script>
