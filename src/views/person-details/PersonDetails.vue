<template>
    <PageLayout>
        <div class="w-full bg-[#fff]">
            <TopBarUI />
        </div>

        <a-divider class="h-[1px] bg-[rgba(227,227,227,1)] m-0" />

        <div class="w-full flex justify-center bg-[#fff]">
            <div class="w-full max-w-page px-10 py-8 flex">
                <div class="w-[300px]">
                    <PersonalInfoUI :peopleDetail="peopleDetail" />
                </div>

                <div class="flex-1 pl-8 flex flex-col items-start">
                    <PersonalBioUI :peopleDetail="peopleDetail" />

                    <KnownForUI class="mt-6" :peopleID="id" />

                    <TimeLineUI class="mt-6" :peopleID="id" />
                </div>
            </div>
        </div>
    </PageLayout>
</template>

<script lang="ts" setup>
// Components
import TopBarUI from './components/TopBar.vue';
import PersonalInfoUI from './components/PersonalInfo.vue';
import PersonalBioUI from './components/PersonalBio.vue';
import KnownForUI from './components/KnownFor.vue';
import TimeLineUI from './components/TimeLine.vue';
// ---------- //
import { onMounted, ref, defineProps } from 'vue';
import { PeopleDetail, getPeopleDetails } from '@/api/people';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const peopleDetail = ref<PeopleDetail>();

onMounted(async () => {
    try {
        peopleDetail.value = await getPeopleDetails(props.id);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
</script>

<style lang="scss">
.container-scroll {
    width: calc(100vw - 80px - 332px);
    max-width: calc((var(--max-width-page) - 80px - 332px));
    &::after {
        content: '';
        width: 60px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0, #fff 100%);
        will-change: opacity;
        pointer-events: none;
        opacity: var(--after-opacity, 1);
        transition: opacity 0.3s ease;
    }
}
</style>
