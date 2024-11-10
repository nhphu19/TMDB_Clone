<template>
    <div>
        <a-layout>
            <!-- Header -->
            <HeaderUI />

            <!-- Body -->
            <slot />

            <!-- Footer -->
            <FooterUI />
        </a-layout>
    </div>
</template>

<script lang="ts" setup>
import HeaderUI from './header/HeaderUI.vue';
import FooterUI from './footer/FooterUI.vue';
</script>

<style scoped lang="scss"></style>
