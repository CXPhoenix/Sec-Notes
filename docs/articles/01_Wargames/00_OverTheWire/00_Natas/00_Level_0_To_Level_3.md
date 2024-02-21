---
outline: [2, 3]
---

# Level 0 To Level 3

## Level 0

### Challenge Description

![](/articles/01_Wargames/00_OverTheWire/00_Natas/00_Level_0_To_Level_3/20240207131446.png)

website: [http://natas0.natas.labs.overthewire.org](http://natas0.natas.labs.overthewire.org)

### Background Knowledges

-   如何使用瀏覽器檢查原始碼。

### Solve

1. 打開 `原始碼` 或 `Dev tools (Inspector)`
   ![](/articles/01_Wargames/00_OverTheWire/00_Natas/00_Level_0_To_Level_3/20240207132311.png)
2. 有答案了...

### Thoughts

標準的 comment leak。

雖然很蠢，但是也真的碰過這麼蠢的。

> [!WARNING] 現代的新蠢法
> 現在工程師真的比較少蠢到會有 comment leak 的問題。
> 但是現在的新蠢法就是 .git leak
> 有興趣可以看這一篇 [HackeTricks -- Git](https://book.hacktricks.xyz/network-services-pentesting/pentesting-web/git)

### Answer

::: details 答案
username: `natas1`

password: `g9D9cREhslqBKtcA2uocGHPfMZVzeFK6`
:::

## Level 1

### Challenge Description

![](/articles/01_Wargames/00_OverTheWire/00_Natas/00_Level_0_To_Level_3/20240207132548.png)

website: [http://natas1.natas.labs.overthewire.org](http://natas1.natas.labs.overthewire.org)

### Background Knowledges

-   如何使用瀏覽器檢查原始碼。
-   如何不用「右鍵」查看原始碼。

### Solve

> [!NOTE]
> 本題提示說「右鍵被鎖住」，但是...看原始碼誰說一定要右鍵？

1. 同 `Level 0` 解法

### Thoughts

現在雖然真的比較沒人這麼玩了...

但是真的不要以為把右鍵鎖起來就萬事大吉了...

包含鎖 dev-tool 等等...

最好的防禦就是：不要蠢到把機敏資料放到前端。

### Answer

::: details 答案
username: `natas2`

password: `h4ubbcXrWqsTo7GGnnUMLppXbOogfBZ7`
:::

## Level 2

### Challenge Description

![](/articles/01_Wargames/00_OverTheWire/00_Natas/00_Level_0_To_Level_3/20240207132828.png)

website: [http://natas2.natas.labs.overthewire.org](http://natas2.natas.labs.overthewire.org)

### Background Knowledges

-   網站的結構與路徑。

### Solve

1. 本題說：這個頁面沒有任何東西，但是我們還是翻一下原始碼。
2. 我們可以看到有一個圖片在 `/files/` 資料夾中。
   ![](/articles/01_Wargames/00_OverTheWire/00_Natas/00_Level_0_To_Level_3/20240207133046.png)
   ![](/articles/01_Wargames/00_OverTheWire/00_Natas/00_Level_0_To_Level_3/20240207133102.png)
3. 我們檢查看看是否可以訪問 `/files/` 這個資料夾內容，結論是可以。
   `http://natas2.natas.labs.overthewire.org/files/` ![](/articles/01_Wargames/00_OverTheWire/00_Natas/00_Level_0_To_Level_3/20240207133149.png)
4. 點入 `user.txt` 就可以看到答案。

### Thoughts

這個關卡的重點在於能不能了解「路徑」的權限問題。

我們在架設靜態網站時，常常會忘記處理「目錄顯示」的權限，也因此有些不能公開的資源被容易檢視。

### Answer

::: details 答案
username: `natas3`

password: `G6ctbMJ5Nb4cbFwhpMPSvxGHhQ7I6W8Q`
:::

## Level 3

### Challenge Description

![](/articles/01_Wargames/00_OverTheWire/00_Natas/00_Level_0_To_Level_3/20240207133627.png)

website: [http://natas3.natas.labs.overthewire.org](http://natas3.natas.labs.overthewire.org)

### Background Knowledges

-   Google 爬蟲的爬取機制
-   網站檔案訪問

### Solve

> [!NOTE]
> 本題狀況跟 Level 2 一樣，只是要找的地方不同。

> [!TIP]
> 注意他的原始碼提到 `Not even Google will find it this time...`
> 在什麼情況什麼設定下，Google 都無法找到頁面呢？
> 那自然就是設定了 `robots.txt` 的狀況囉！
> ![](/articles/01_Wargames/00_OverTheWire/00_Natas/00_Level_0_To_Level_3/20240207133937.png)

1. 同 Level 2 解法。

### Thoughts

`robots.txt` 固然可以防範爬蟲爬到這個資料夾，避免被 Google Hacking。

::: tip 想了解更多？
如果你想對於 `robots.txt` 了解更多，可以看這一篇：

<ClientOnly>
<preview-card url="https://www.techbang.com/posts/113231-robotstxt-internet-ai-balance" title="一份君子協議的robots.txt維持了網際網路30年來的秩序，但AI的出現破壞了這種信任和平衡" />
</ClientOnly>
:::

但是忘記鎖權限...那就無解了..

所以，記得要把不用到的東西上鎖。

### Answer

::: details 答案
username: `natas4`

password: `tKOcJIbzM4lTs8hbCmzn5Zr4434fGZQm`
:::
