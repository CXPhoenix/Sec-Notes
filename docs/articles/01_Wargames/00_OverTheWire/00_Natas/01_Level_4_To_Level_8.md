---
outline: [2, 3]
---

# Level 4 To Level 8 Write-ups

## Level 4

### Challenge Description

![](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207140845.png)

website: [http://natas4.natas.labs.overthewire.org/](http://natas4.natas.labs.overthewire.org/)

### Background Knowledges

-   HTTP 傳輸資料的型態
-   知道網站如何判斷你從哪裡來

### Solve

> [!NOTE]
> 本題可以使用很多方法處理。
> 可以用 `cURL`、`Burp Suite` 等等
> 但是我選用 Chrome 的 extention: [ModHeader](https://chromewebstore.google.com/detail/modheader-modify-http-hea/idgpnmonknjnojddfkpgkljpfnnfcklj?pli=1) > ![](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207141158.png)

1. 看到畫面，得知訊息：`Access disallowed. You are visiting from "" while authorized users should come only from "http://natas5.natas.labs.overthewire.org/"`，可以了解到他有在解析上一個網站的 url。
2. 藉由 [ModHeader](https://chromewebstore.google.com/detail/modheader-modify-http-hea/idgpnmonknjnojddfkpgkljpfnnfcklj?pli=1) 可以進行修改。本次修改目標是 `Header` 中的 `Referer`。
   ![](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207141444.png)
3. 重新整理後，即可得到答案。

### Thoughts

本題的提示十分明顯，但是對於網站的基礎運作原理以及 HTTP 的協定特性需要稍微的掌握。

同時本題也暴露了一個重要的資安漏洞（以前的，現在真的少見）：

**不要把 Access 的驗證機制放在 HTTP Header 裡**

### Answer

::: details 答案
username: `natas5`

password: `Z0NsrtIkJoKALBCLi5eqFfcRN82Au2oD`
:::

## Level 5

### Challenge Description

![](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207141824.png)

website: [http://natas5.natas.labs.overthewire.org/index.php](http://natas5.natas.labs.overthewire.org/index.php)

### Background Knowledges

-   了解 HTTP 對於「使用者狀態」的處理。
-   理解 `Boolean` 的數字型態。

### Solve

1. 看到訊息，知道這邊開始有驗證使用者身份（是否登入）。先檢查一下 `原始碼` 及 `HTTP 封包`，看一下怎麼驗證的：
   ![](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207142050.png)
2. 這邊他的驗證方式似乎是直接使用 `Cookie` 去驗證使用者是否登入，所以就去更改 `Cookie`。
   要改 `Cookie` 可以使用 `ModHeader` 去處理，或是用 `Dev tool` 的 `Application` 標籤下 `Cookie` 資料表中，選擇網址 (此處為 `http://natas5.natas.labs.overthewire.org`) 去看到瀏覽器儲存的 `Cookie`。
   ![](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207142432.png)
3. 確認過~~眼神~~ `Cookie`，我們就去動手修改 `loggedin` 欄位的值，這邊拿到是 `0`，那我們就試著變成 `1`。
   ![](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207142653.png)
4. 重新整理過後，就可以拿到答案。

> [!TIP] 提示
> 我們可以利用 `Dev tool` 來查看原始碼（被 [瀏覽器渲染](https://diarysophie.gitbooks.io/web-development/content/chapter5.html) 後的結果 `Elements` 以及原始碼 `Source`）。
> 要看 HTTP 封包，可以使用 `Network` 標籤。如果沒看到，重新整理就可以看到了。

### Thoughts

這一關是經典的「Cookie 驗證漏洞」。

簡單來說，由於 HTTP 是不支援「狀態紀錄」的（也就是所謂的無狀態），但是伺服器還是要驗證使用者的狀況，所以就有了用 `Cookie` 來紀錄使用者現在的狀態。

但是太過相信這個紀錄的狀態，本身就是會出問題...畢竟網路的世界都是假的，都可以被修改。

因此要特別注意網站身份驗證與權限控制的方式。

> [!IMPORTANT] 值得注意
> 不過這在網站攻防上還是值得學習，因為我們有些資訊的確會放在 `Cookie` 裡面，如果有用到 `XSS` 攻擊手法，也許可以撈出來（前提是不能被設定為 `HTTP-Only`）。

### Answer

::: details 答案
username: `natas6`

password: `fOIvE0MDtPTgRhqmmvvAOt2EfXR6uQgR`
:::

## Level 6

### Challenge Description

![](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207143628.png)

website: [http://natas6.natas.labs.overthewire.org/](http://natas6.natas.labs.overthewire.org/)

### Background Knowledge

-   程式語言的基礎知識
-   PHP 的網路語法知識
-   網路傳輸方法 (method) 的知識

### Solve

1. 一開始看到一個 `input` 要輸入東西。隨便輸入東西進去後，會發現他出現 Wrong secret。
2. 這邊他給了原始碼，所以點進去看一下。

```php:line-numbers
<html>
    <head>
        <!-- This stuff in the header has nothing to do with the level -->
        <link rel="stylesheet" type="text/css" href="http://natas.labs.overthewire.org/css/level.css">
        <link rel="stylesheet" href="http://natas.labs.overthewire.org/css/jquery-ui.css" />
        <link rel="stylesheet" href="http://natas.labs.overthewire.org/css/wechall.css" />
        <script src="http://natas.labs.overthewire.org/js/jquery-1.9.1.js"></script>
        <script src="http://natas.labs.overthewire.org/js/jquery-ui.js"></script>
        <script src=http://natas.labs.overthewire.org/js/wechall-data.js></script><script src="http://natas.labs.overthewire.org/js/wechall.js"></script>
        <script>var wechallinfo = { "level": "natas6", "pass": "<censored>" };</script>
    </head>
    <body>
        <h1>natas6</h1>
        <div id="content">

        <?

        include "includes/secret.inc";

            if(array_key_exists("submit", $_POST)) {
                if($secret == $_POST['secret']) {
                print "Access granted. The password for natas7 is <censored>";
            } else {
                print "Wrong secret";
            }
            }
        ?>

        <form method=post>
        Input secret: <input name=secret><br>
        <input type=submit name=submit>
        </form>

        <div id="viewsource"><a href="index-source.html">View sourcecode</a></div>
        </div>
    </body>
</html>
```

3. 這邊可以注意到在第 18 - 26 行中是一個 php 的程式碼內容。

```php:line-numbers=18
include "includes/secret.inc";

if(array_key_exists("submit", $_POST)) {
    if($secret == $_POST['secret']) {
    print "Access granted. The password for natas7 is <censored>";
    } else {
        print "Wrong secret";
    }
}
```

4. 在第 18 行注意到他引入了一個 `.inc` 檔案；然後再 第 21 行有一個判斷式，試圖比較變數 `secret` 和從 `POST` 方法得到的資料 `secret` 是否一致。
   但是看來看去沒有看到任何的變數 `secret`，所以看起來應該是放在 `inlcudes/secret.inc` 裡面了。

```php:line-numbers=18
include "includes/secret.inc"; // [!code focus]

if(array_key_exists("submit", $_POST)) {
    if($secret == $_POST['secret']) { // [!code focus]
    print "Access granted. The password for natas7 is <censored>";
    } else {
        print "Wrong secret";
    }
}
```

5. 打開 `/includes/secret.inc` 檔案，看到 secret 是 `FOEIUWGHFEEUHOFUOIU`，回到 `/index.php`，輸入密碼，得到答案。

### Thoughts

關卡推進到要來看看 php 原始碼的部分了。

如果對於 php 不熟的人，可能需要邊看邊查才行。

若是對程式語言都不熟的人...恐怕要回頭去練習程式設計才行；至少要能看懂 `if/else` 的結構，不然的話應該只能抓頭了...

![圖片出自`https://img.ltn.com.tw/Upload/news/600/2015/04/15/php0juDSZ.jpg`](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207145648.png)

### Answer

::: details 答案
username: `natas7`

password: `jmxSiH3SP6Sonf8dv66ng8v1cIEdjXWr`
:::

## Level 7

### Challenge Description

![](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207145807.png)

website: [http://natas7.natas.labs.overthewire.org/](http://natas7.natas.labs.overthewire.org/)

### Background Knowledges

-   基本檔案結構
-   基本 Injection 漏洞識別
-   基本的 URL 解析知識

### Solve

1. 檢查原始碼，以及按鈕按按看，會發現他的頁面控制是使用 `Query` 。
   `/index.php?page=home` --
   ![](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207150920.png)
   `/index.php?page=about` --
   ![](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207150930.png)
2. 我們嘗試看看 `?page=` 不要帶任何參數，結果出現錯誤訊息。
   ![](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207151049.png)
3. 我們可以分析錯誤碼，發現我們的參數是 php 會去 include 的檔案，所以只要在參數上帶入我們要查看的檔案，就可以攻擊成功。

```
Warning: include(): Filename cannot be empty in /var/www/natas/natas7/index.php on line 21

Warning: include(): Failed opening '' for inclusion (include_path='.:/usr/share/php') in /var/www/natas/natas7/index.php on line 21
```

4. 但是我們要查找的檔案放在哪呢？這時候看了一下原始碼（或是你看開頭的說明也可以），會看到提示。
   ![](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207151601.png)

5. 把提示放入 `?page=` 後面，就會得到答案。

### Thoughts

這一關滿考驗「情報搜集」的部分。

雖然有學生破關的方法是直接把 hint 貼上去（畢竟 hint 就在哪，實在很難忽視），但是如果以正規的攻擊手段來操作的話，我覺得滿能培養學生的情搜能力。

不過主要還是在「嘗試」的環節學生容易出問題，以及對於網路知識不熟悉，可能就無法順利破關。

### Answer

::: details 答案
username: `natas8`

password: `a6bZCNYwdKqN5cGP11ZdtPg0iImQQhAB`
:::

## Level 8

### Challenge Description

![](/articles/01_Wargames/00_OverTheWire/00_Natas/01_Level_4_To_Level_8/20240207152643.png)

website: [https://natas8.natas.labs.overthewire.org/](https://natas8.natas.labs.overthewire.org/)

### Background Knowledges

-   基本的 php 語法。
-   編解碼的基礎。

### Solve

::: info NOTE
本題和 Level 6 一樣，都是原始碼逆向。

但是這題的特點是「編解碼」的逆向，因此需要學習一下編解碼的內容。

```php:line-numbers
<?
$encodedSecret = "3d3d516343746d4d6d6c315669563362"; // [!code focus]

function encodeSecret($secret) { // [!code focus]
    return bin2hex(strrev(base64_encode($secret))); // [!code focus]
} // [!code focus]

if(array_key_exists("submit", $_POST)) {
    if(encodeSecret($_POST['secret']) == $encodedSecret) { // [!code focus]
    print "Access granted. The password for natas9 is <censored>";
    } else {
    print "Wrong secret";
    }
}
?>
```

另外針對 php 語法可能要稍微查詢一下 `strrev()`。
:::

1. 與 Level 6 一樣。檢查原始碼。
2. 這邊會發現他在 php 的原始碼中出現判斷。（見上方程式碼第 9 行）
3. 從判斷中可以掌握我們輸入的資料要轉變成跟變數 `encodedSecret` 一樣。
4. 這邊查看函式 `encodeSecret` 是如何輸出轉變編碼的，然後逆向回去。
5. 回到首頁，輸入進去結果就得到解答。

::: details 轉換的程式碼

```php:line-numbers
<?php
$encodedSecret = "3d3d516343746d4d6d6c315669563362";

print base64_decode(strrev(hex2bin($encodedSecret)));

// output result is secret.
```

:::

### Thoughts

這一題的重點就是在 `逆向編碼`，所以還是要看得懂程式語言，知道基本的函式使用，才能順利破解此關。

不過在教學實務上，我想應該可以利用現在的生成式 AI 來讓學生查詢。並且請他們報告基本的「編解碼」。

應該可以作為一堂密碼學的課程初級指引。

### Answer

::: details 答案
username: `natas9`

password: `Sda6t0vkOPkM8YeOZkAGVhFoaplvlJFd`
:::
