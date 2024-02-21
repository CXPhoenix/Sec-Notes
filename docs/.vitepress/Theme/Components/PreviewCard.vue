<script setup>
import { reactive, onMounted } from "vue";
import previewImg from "@imgs/web-preview-dark.webp";

const { url, title, imgsrc } = defineProps(["url", "title", "imgsrc"]);
</script>

<template>
    <div class="mx-auto flex w-full justify-center px-4 py-2">
        <a :href="url" target="_blank" class="w-full rounded-md shadow-xl">
            <div class="bg-base-100 image-full mx-auto max-w-[75%]">
                <figure>
                    <img
                        :src="imgsrc ? imgsrc : previewImg"
                        alt="Default Preview Image"
                    />
                </figure>
                <span class="pt-0 text-[8px] text-slate-100">{{ url }}</span>
                <div class="p-2 pl-4 pt-6">
                    <p class="text-slate-300">
                        {{ title ? title : url }}
                    </p>
                </div>
            </div>
        </a>
    </div>
</template>
