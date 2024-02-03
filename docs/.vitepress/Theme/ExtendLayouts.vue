<script setup>
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import LatestUpdateCard from "@components/LatestUpdateCard.vue";
import MD5 from "crypto-js/md5";

const { Layout } = DefaultTheme;
const { frontmatter } = useData();
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <div class="space-y-6 px-[64px]">
        <div home-tags class="flex items-center justify-start gap-4">
          <Badge
            class="text-2xl"
            v-for="tag in frontmatter.hero.tags"
            :key="MD5(tag.toString()).toString()"
            :type="tag.type"
            :text="tag.name"
          />
        </div>
        <div home-latest-update class="">
          <LatestUpdateCard />
        </div>
      </div>
    </template>
  </Layout>
</template>
