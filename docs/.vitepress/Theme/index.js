import DefaultTheme from "vitepress/theme";
import "@style";

import PreviewCard from "@components/PreviewCard.vue";

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component("preview-card", PreviewCard);
    },
};
