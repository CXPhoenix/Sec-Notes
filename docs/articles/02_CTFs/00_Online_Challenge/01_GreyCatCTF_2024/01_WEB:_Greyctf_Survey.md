# Web/Greyctf Survey

## DESC

![](/articles/00_CTFs/00_Online_Challenge/01_GreyCatCTF_2024/01_WEB:_Greyctf_Survey/20240421014331.png)

Your honest feedback is appreciated :) (but if you give us a good rating we'll give you a flag)

::: details 中文翻譯
你的誠實回饋我們會非常感激 :) （但如果你給我們一個好評，我們會給你一面旗幟）
:::

> Author: jro

challenge attach link:

-   challenge website url: http://challs.nusgreyhats.org:33334/
-   file attach: https://drive.google.com/uc?export=download&id=1fvz_8s4drwOTR8z0ppvmnflq8gEzosBU

## Background Knowledge

-   對於 js 語法與內建功能的了解。
-   知道資料型態的相關知識。

## Solve

1. 本題一進場，就是一個拉霸，然後可以 submit vote。按下按鈕會往 `/vote` 送一個 POST 的 Request，然後得到資料後會用 `alert` 顯示給使用者。
   ![](/articles/00_CTFs/00_Online_Challenge/01_GreyCatCTF_2024/01_WEB:_Greyctf_Survey/20240421015150.png)
   ![](/articles/00_CTFs/00_Online_Challenge/01_GreyCatCTF_2024/01_WEB:_Greyctf_Survey/20240421015220.png)
   根據這樣的結果，我未看原始碼先猜問題就出在這個 `/vote` ，因為看起來就只有他可以注入我的惡意 payload。

2. 打開原始碼，直奔 `/vote` 那邊看過去，果然應證了我的猜測，在第 29 至第 42 行之間，顯示了出現 `flag` 的方法：讓 `score > 1` 就可以了。
   ::: code-group

    ```js:line-numbers=29 {7} [index.js]
    if(vote < 1 && vote > -1) {
         score += parseInt(vote);
         if(score > 1) {
             score = -0.42069;
             return res.status(200).json({
                 "error": false,
                 "msg": config.flag,
             });
         }
         return res.status(200).json({
             "error": false,
             "data": score,
             "msg": "Vote submitted successfully"
         });
     }
    ```

    :::

3. 已經可以從第 12 行知道 `score` 的初始值是 $-0.42069$ ，要讓他大於 1 的方法就是讓他加上 $1.43$ 就可以達成，可是在第 29 行卻擋住了我們的念想，因為 `vote` 只接受介於 -1 ~ 1 之間，還不包含上下界。
4. 不過也不是完全沒有希望，因為他在處理 `score` 與 `vote` 相加時，使用到了 `parseInt` 這個 js 內建函式，將 `vote` 轉為整數。但是眾所週知， js 這個語言的資料型別轉換，總是會出現翻車場面...。果不其然，上網搜尋了一下找到了一篇對岸的文章：

    <PreviewCard url=https://juejin.cn/post/6882254240308428807 imgsrc="/articles/00_CTFs/00_Online_Challenge/01_GreyCatCTF_2024/01_WEB:_Greyctf_Survey/20240421094351.png" title="逃離 parseInt 陷阱" />

    他很好的解釋了 `parseInt` 在轉換數字上的漏洞。

    用比較白話來說，就是在 `parseInt` 進行轉換時，由於他的原始參數只接受 `String` 這個型別，所以如果送入的型別不是 `String` 的話，會先把資料用 `toString` 的這個方法轉換成 `String` 型別，在轉換成整數。

    但是 `toString` 這個方法在處理數字時，會有一點翻車：當小數點超過一定位數，會自動轉成科學記號。可是 `parseInt` 才不管你什麼科學不科學記號，他只認「數字」，碰到非數字的東西，全部都會幹掉不管。

    因此若是送超過小數位數的資料進去時，他就會先把資料轉成 `String` 然後再轉成整數。

    文章中也說明他測試了之後只要數字只要小於 $10^{-6}$ ，那麼就會轉換成科學符號，然後最後會因為科學符號的小數點，只取最前面的一個數字轉成整數。

    例如 $0.000000143$ 這串數字，會在 `toString` 的助攻之下轉變成 `"1.43e-7"`，然後在轉換成整數的過程中，因為 `.` 不是數字，因此後面的東西通通被省略，也就留下了數字 `1` 當成被轉換後的結果。因此 `parseInt(0.000000143)` 的輸出結果會變成 `1`。

    ![](/articles/00_CTFs/00_Online_Challenge/01_GreyCatCTF_2024/01_WEB:_Greyctf_Survey/20240421021803.png)

5. 利用上面這個~~翻車~~的特性，我使用 `Hackbar` 這個 [chrome 擴展](https://chromewebstore.google.com/detail/hackbar/ginpbkfigcoaokgflihfhhmglmbchinc)，利用 `Network` 頁面將請求封包轉成 cURL 格式再餵進 `Hackbar` 中，送入精心調製的 `POST BODY` ，就得到答案了。
   ![](/articles/00_CTFs/00_Online_Challenge/01_GreyCatCTF_2024/01_WEB:_Greyctf_Survey/20240421022110.png)

    ::: warning 神奇的狀況
    我這邊使用的是 `0.0000002` 這個 payload。理所當然的可以得到答案，

    但是...

    我如果改為使用 `2e-7`，一樣可以得到答案...

    再進一步，我測試了 `1.43e-7` 是不能得到 flag 的，

    可是 `1.43e-8` 就可以了...

    是不是很神奇！！ :melting_face:

    嘔對了...改用 `0.0000000143` 一樣行得通喔...

    到現在也沒搞懂為啥...

    ![](/articles/00_CTFs/00_Online_Challenge/01_GreyCatCTF_2024/01_WEB:_Greyctf_Survey/20240421022803.png)
    :::
