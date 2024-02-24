<script setup>
import previewImg from "../assets/images/web-preview-dark.webp";

const { url, title, imgsrc } = defineProps(["url", "title", "imgsrc"]);
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
                    />
                </figure>
                <span class="pt-0 text-[8px] text-slate-100">{{ url }}</span>
            </div>
            <div class="p-2 py-3">
                <span class="md:text-lg">
                    {{ title ? title : url }}
                </span>
            </div>
        </a>
    </div>
</template>
