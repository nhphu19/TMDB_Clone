<template>
    <div class="w-full text-left">
        <a-tabs
            v-model:activeKey="activeKey"
            type="card"
            :tabBarStyle="{ fontSize: '18px', color: '#000', fontWeight: 500 }"
        >
            <a-tab-pane key="1" tab="Acting">
                <div class="shadow-cardMovie border border-solid border-[#e3e3e3]">
                    <div class="flex items-center" v-for="acting in actings" :key="acting.id">
                        <div v-if="acting.media_type == 'movie'" class="text-[#000] text-[14px] font-[400]">
                            {{ acting.release_date ? formatDateTimeJS(acting.release_date, 'YYYY') : '--' }}
                        </div>

                        <div v-else class="text-[#000] text-[14px] font-[400]">
                            {{ acting.first_air_date ? formatDateTimeJS(acting.first_air_date, 'YYYY') : '--' }}
                        </div>

                        <div class="text-[#000] text-[14px] font-[600]">
                            {{ acting.media_type == 'movie' ? acting.title : acting.name }}
                        </div>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Production">Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="3" tab="Writing">Content of Tab Pane 3</a-tab-pane>
            <a-tab-pane key="4" tab="Creator">Content of Tab Pane 3</a-tab-pane>
        </a-tabs>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted, computed } from 'vue';
import { CombinedCredit, getCombinedCredits } from '@/api/people';
import { BASE_URL_IMAGE } from '@/configs/constants';
import { percentMovie, formatDateTimeJS, formatRuntime } from '@/utils/common';

const props = defineProps({
    peopleID: {
        type: String,
        required: true,
    },
});
const combinedCast = ref<CombinedCredit[]>([]);
const combinedCrew = ref<CombinedCredit[]>([]);
const actings = ref<CombinedCredit[]>([]);
const activeKey = ref('1');
const SortByReleaseDate = (castList: CombinedCredit[]) => {
    return castList.sort((a, b) => {
        let dateA = a.release_date || '';
        dateA = a.media_type == 'tv' ? a.first_air_date || '' : dateA;
        let dateB = b.release_date || '';
        dateB = b.media_type == 'tv' ? b.first_air_date || '' : dateB;

        if (!dateA) return -1;
        if (!dateB) return 1;

        return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
};

onMounted(async () => {
    try {
        const data = await getCombinedCredits(props.peopleID);
        combinedCast.value = data.cast;
        combinedCrew.value = data.crew;

        actings.value = SortByReleaseDate(combinedCast.value);
        console.log(actings.value);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
</script>
