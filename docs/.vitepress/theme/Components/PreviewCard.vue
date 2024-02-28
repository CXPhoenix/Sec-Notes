<script setup>
import previewImg from "../assets/images/web-preview-dark.webp";

const { url, title, imgsrc, desc } = defineProps([
    "url",
    "title",
    "imgsrc",
    "desc",
]);
</script>

<template>
    <div
        class="mx-auto w-full max-w-[90%] rounded-md border-2 border-slate-400/10 p-2 shadow-xl"
    >
        <a
            :href="url"
            target="_blank"
            class="flext w-full flex-col items-start gap-3"
        >
            <div>
                <figure>
                    <img
                        :src="imgsrc ? imgsrc : previewImg"
                        alt="Default Preview Image"
                        class="mx-auto max-h-80"
                    />
                </figure>
                <span class="pt-0 text-[8px] text-slate-100">{{ url }}</span>
            </div>
            <div class="flex flex-col items-start p-2 py-3">
                <span class="text-lg underline underline-offset-2 md:text-xl">
                    {{ title ? title : url }}
                </span>
                <span class="desc-style text-xs text-purple-100 md:text-base">
                    {{ desc ? desc : "" }}
                </span>
            </div>
        </a>
    </div>
</template>

<style scoped>
.vp-doc a {
    text-decoration: none;
}
</style>
