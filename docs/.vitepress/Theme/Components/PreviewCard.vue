<script setup>
import { reactive, onMounted } from "vue";
import previewImg from "@imgs/web-preview-dark.webp";

const { url, title } = defineProps(["url", "title"]);

const preview_info = reactive({
    title: title,
    description: "",
    image: "",
    haveValue: false,
    error: false,
});

const previewGenURL = new URL("https://api.linkpreview.net");

onMounted(async () => {
    const body = { q: url };
    const headers = {
        "X-Linkpreview-Api-Key": "8b4c0a619e1077fae4fa8832f8512c1f",
    };
    try {
        // POST the content from url through Linkpreview API
        const resp = await fetch(previewGenURL, {
            method: "POST",
            headers,
            mode: "cors",
            body,
        });
        const data = await resp.json();
        if (data.error) {
            throw new Error("get some error");
        }
        preview_info.title = data.title;
        preview_info.description = data.description;
        preview_info.image = data.image;
        preview_info.haveValue = true;
    } catch (e) {
        preview_info.error = true;
    }
});
</script>

<template>
    <div class="mx-auto flex w-full justify-center px-4 py-2">
        <a :href="url" v-if="preview_info.error" class="w-full rounded-md">
            <div class="bg-base-100 image-full mx-auto max-w-[75%] shadow-xl">
                <figure>
                    <img :src="previewImg" alt="Default Preview Image" />
                </figure>
                <div class="flex items-center bg-slate-700/50 p-2 pl-4">
                    <p class="border-t-[0px] pt-2 text-slate-100 outline-none">
                        {{ preview_info.title ? preview_info.title : url }}
                    </p>
                </div>
            </div>
        </a>
        <a v-if="!preview_info.error" :href="url">
            <div
                v-if="!preview_info.error"
                :href="url"
                class="card md:card-side bg-base-100 shadow-xl"
            >
                <figure>
                    <img
                        :src="
                            preview_info.image === ''
                                ? previewImg
                                : preview_info.image
                        "
                        :alt="
                            preview_info.image === ''
                                ? `Default Preview Image`
                                : `URL Image`
                        "
                    />
                </figure>
                <div class="card-body">
                    <p class="card-title">
                        {{
                            preview_info.title === "" ? url : preview_info.title
                        }}
                    </p>
                    <p>
                        {{
                            preview_info.description === ""
                                ? `點此造訪這個網頁`
                                : preview_info.description
                        }}
                    </p>
                    <p
                        class="justify-end text-sm text-slate-400"
                        v-if="preview_info.description !== ''"
                    >
                        點此造訪這個網頁
                    </p>
                </div>
            </div>
        </a>
    </div>
</template>
