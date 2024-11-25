<template>
    <a-modal
        class="h-[80vh] rounded-[8px] overflow-hidden relative"
        v-model:open="isShowModal"
        width="auto"
        :closable="false"
        centered
        @ok="showHideModal()"
    >
        <div class="h-[80vh] overflow-auto pl-6 pr-3 py-5">
            <div class="flex flex-col px-2 py-2">
                <div class="flex flex-col">
                    <div class="flex justify-between items-start">
                        <div class="text-[28px] text-[rgb(3,37,65,1)] font-[700]">Rating</div>
                        <CloseOutlined
                            class="cursor-pointer text-[rgb(3,37,65,1)] text-[24px]"
                            @click="showHideModal()"
                        />
                    </div>

                    <div class="flex justify-between items-end">
                        <div class="text-[14px] text-[rgb(3,37,65,1)] font-[500] italic mb-4">
                            {{ `What did you think of ${movieDetail?.title}?` }}
                        </div>
                        <div class="text-[14px] text-[rgb(3,37,65,1)] font-[500]">
                            <span class="font-[700]">{{ Math.round((movieDetail?.vote_average || 0) * 10) }}%</span>
                            user score
                        </div>
                    </div>

                    <div class="w-full flex">
                        <a-slider
                            class="w-full"
                            v-model:value="percentValue"
                            :tip-formatter="(value: number) => RATING_VIBE_NAME[value]"
                            :tooltip-open="tooltipVisible"
                            :step="10"
                            :marks="marks"
                            :trackStyle="trackStyle"
                            :handleStyle="{
                                borderColor: '#108ee9',
                                backgroundColor: '#87d068',
                                marginTop: '4px',
                            }"
                            :railStyle="{
                                height: '12px',
                            }"
                            :dotStyle="{
                                display: 'none',
                            }"
                            @change="handleTooltip"
                        />
                    </div>
                </div>

                <a-divider class="h-[1px] bg-[rgb(203,213,225,1)] my-8" />

                <div class="flex flex-col">
                    <div class="text-[28px] text-[rgb(3,37,65,1)] font-[700]">Mood</div>
                    <div class="text-[14px] text-[rgb(3,37,65,1)] font-[500] italic mb-4">
                        {{ `How did ${movieDetail?.title} make you feel?` }}
                    </div>

                    <div v-for="(item, index) in emojiDefine" :key="index" class="flex flex-col">
                        <div class="flex items-center">
                            <div class="text-[16px] text-[rgb(3,37,65,1)] font-[700] min-w-28">{{ item.name }}</div>

                            <div class="flex gap-6">
                                <div
                                    v-for="(value, key) in item.emojis"
                                    :key="key"
                                    class="flex items-center h-[70px] w-[70px]"
                                    @click="selectEmoji(key)"
                                >
                                    <div
                                        class="flex items-center cursor-pointer duration-300"
                                        :class="
                                            !emojisValue.includes(key)
                                                ? [
                                                      'hover:p-1',
                                                      'hover:bg-[#fff]',
                                                      'hover:rounded-full',
                                                      'hover:scale-125',
                                                  ]
                                                : ['scale-125', 'p-1', 'bg-[#fff]', 'rounded-full']
                                        "
                                    >
                                        <a-image :height="48" :width="48" :src="value" :preview="false" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a-divider class="h-[1px] bg-[rgb(203,213,225,1)] my-5" />
                    </div>
                </div>
            </div>
        </div>

        <template #footer>
            <div
                class="absolute right-6 top-[75vh] px-4 py-2 rounded-full bg-darkBlue flex items-center cursor-pointer"
                @click="showHideModal()"
            >
                <CheckOutlined class="text-[#fff] text-[20px] mr-2" />
                <div class="text-[#fff] text-[16px] font-[700]">I'm Done</div>
            </div>
        </template>
    </a-modal>
</template>

<script lang="ts" setup>
import { computed, PropType, ref, defineProps, onMounted } from 'vue';
import { MovieDetail } from '@/api/movie-detail';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons-vue';
import { RATING_VIBE_NAME } from '@/configs/constants';
import {
    HappyEmoji,
    InterestedEmoji,
    SurprisedEmoji,
    SadEmoji,
    DisgustedEmoji,
    AfraidEmoji,
    AngryEmoji,
    EmojiKeys,
} from '@/utils/emoji';
import { useStore } from 'vuex';
import { MovieVibe } from '@/store/modules/movie-vibe';

const store = useStore();
const props = defineProps({
    movieID: {
        type: String,
        required: true,
    },
    movieDetail: {
        type: Object as PropType<MovieDetail>,
        required: false,
    },
    showModal: {
        type: Boolean,
        required: true,
    },
    showHideModal: {
        type: Function,
        required: true,
    },
});

const percentValue = ref(0);
const emojisValue = ref<EmojiKeys[]>([]);
const tooltipVisible = ref(false);
const isShowModal = computed(() => props.showModal);
const emojiDefine = [
    {
        name: 'Happy',
        emojis: HappyEmoji,
    },
    {
        name: 'Interested',
        emojis: InterestedEmoji,
    },
    {
        name: 'Surprised',
        emojis: SurprisedEmoji,
    },
    {
        name: 'Sad',
        emojis: SadEmoji,
    },
    {
        name: 'Disgusted',
        emojis: DisgustedEmoji,
    },
    {
        name: 'Afraid',
        emojis: AfraidEmoji,
    },
    {
        name: 'Angry',
        emojis: AngryEmoji,
    },
];
// Slider style
const marks: Record<number, { label: string; style: { fontSize: string; marginTop: string; color: string } }> = [
    0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
].reduce((acc, ele) => {
    acc[ele] = {
        label: ele.toString(),
        style: {
            fontSize: '14px',
            marginTop: '10px',
            color: '#B7B7B7',
        },
    };
    return acc;
}, {} as Record<number, { label: string; style: { fontSize: string; marginTop: string; color: string } }>);

const trackStyle = computed(() => {
    if (percentValue.value <= 30) {
        return {
            background: 'linear-gradient(to left, #db2360, rgb(219 35 96 / 0.3))',
            height: '12px',
        };
    } else if (percentValue.value < 70) {
        return {
            background: 'linear-gradient(to left, #d2d531, rgb(210 213 49 / 0.3))',
            height: '12px',
        };
    } else {
        return {
            background: 'linear-gradient(to left, #21d07a, rgb(33 208 122 / 0.3))',
            height: '12px',
        };
    }
});

const handleTooltip = () => {
    store.dispatch('movieVibes/saveMovieVibe', {
        movieId: props.movieID,
        movieVibe: { rating: percentValue.value, emojis: emojisValue.value },
    });
    tooltipVisible.value = true;
    setTimeout(() => {
        tooltipVisible.value = false;
    }, 1500);
};

const selectEmoji = (key: EmojiKeys) => {
    const index = emojisValue.value.indexOf(key);
    if (index < 0) {
        emojisValue.value.push(key);
    } else {
        emojisValue.value.splice(index, 1);
    }

    store.dispatch('movieVibes/saveMovieVibe', {
        movieId: props.movieID,
        movieVibe: { rating: percentValue.value, emojis: emojisValue.value },
    });
};

onMounted(() => {
    const vibe: MovieVibe = store.getters['movieVibes/getMovieVibeByMovie'](props.movieID);
    percentValue.value = vibe?.rating || 0;
    emojisValue.value = vibe?.emojis || [];
});
</script>

<style lang="scss">
.ant-modal-content {
    padding: 0 !important;
    background-color: #f4f4f5 !important;

    .ant-modal-body {
        &::after {
            position: absolute;
            height: 100px;
            width: 100%;
            content: '';
            bottom: 0;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff);
            opacity: 1;
            pointer-events: none;
            transition-duration: 300ms;
        }
    }
}
</style>
