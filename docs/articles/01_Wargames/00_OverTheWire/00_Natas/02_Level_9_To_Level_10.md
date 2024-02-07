---
outline: [2, 3]
---

# Level 9 To Level 10

## Level 9

### Challenge Descriptions

![](/articles/01_Wargames/00_OverTheWire/00_Natas/02_Level_9_To_Level_10/20240207164217.png)

website: [http://natas9.natas.labs.overthewire.org/](http://natas9.natas.labs.overthewire.org/)

### Background Knowledges

- PHP Command Injection 漏洞解析
- Linux 基本指令

### Solve

1. 檢查原始碼，沒啥好看的；直接進去看 php 的原始碼。
2. 這邊可以看到原始碼中的 php 的部分有兩組 `if/else`，第一組 `if/else` 主要是檢查在有沒有 `needle` 這個參數，並且存入變數 `key`。

```php:line-numbers {3-5}
<?
$key = "";

if(array_key_exists("needle", $_REQUEST)) {
    $key = $_REQUEST["needle"];
}

if($key != "") {
    passthru("grep -i $key dictionary.txt");
}
?>
```

3. 第二組 `if/else` 中出現了一個指令： `passthru`，可以查詢一下這個指令是什麼：

```php:line_numbers
<?
$key = "";

if(array_key_exists("needle", $_REQUEST)) {
    $key = $_REQUEST["needle"];
}

if($key != "") {
    passthru("grep -i $key dictionary.txt"); // [!code focus]
}
?>
```

::: info

#### [php passthru 指令](https://www.php.net/manual/zh/function.passthru.php)

![](/articles/01_Wargames/00_OverTheWire/00_Natas/02_Level_9_To_Level_10/20240207164936.png)
:::

4. 了解 `passthru` 就是執行系統命令的指令後，那我們確認了這是一個 [Command Injection](https://book.hacktricks.xyz/pentesting-web/command-injection) 的經典漏洞。有了這個漏洞，我們就可以來注入我們要查詢的指令。
5. 我們這邊可以從 [規則頁](./index.md) 找到密碼通常會藏在 `/etc/natas_webpass/natas*` 的檔案裡面，我們要去的下一關是 `level 10`，所以要找的密碼地點應該藏在 `/etc/natas_webpass/natas10` 裡面。所以我們要用 `;cat /etc/natas_webpass/natas10;` 作為注入的 payload，就可以取得 level 10 的密碼。

### Thoughts

這一關開始觸碰到 `Command Injection` 的基本漏洞。

雖然現在比較少碰到類似的，但是在某些場合還是會有這樣的漏洞存在。

通常是為了偷懶...不過也有一些是真的要 call 外部的應用程式也只能出此下策。

這邊就是要設定可以放入 payload 的白名單，會比較安全。

::: warning 補充
這一關當然不是只有這種 `payload` 可以注入。

在下一關 `Level 10` 的 payload 同樣也可以拿來這裡用！
:::

### Answer

::: details 答案
username: `natas10`

password: `D44EcsFkLxPIkAAKLosx8z3hxX1Z4MCE`
:::

## Level 10

### Challenge Description

![](/articles/01_Wargames/00_OverTheWire/00_Natas/02_Level_9_To_Level_10/20240207170451.png)

website: [http://natas10.natas.labs.overthewire.org/](http://natas10.natas.labs.overthewire.org/)

### Background Knowledges

- Linux 的指令進階應用

### Solve

> [NOTE]
> 這一題跟上一題一樣，但是要找到另一種 payload 才能處理。
> 這邊給個提示：**grep -i** 的用法很重要。

1. 跟 Level 9 相同，只是多限制了 ;/& 的使用，不能在 payload 中出現上述兩個字元。

::: details NEW PAYLOAD

```bash
.* /etc/natas_webpass/natas11 #
```

:::

### Thoughts

這才比較像是稍微真實的一點的情況，有做字元的限制，當然不會這麼少，但是至少要動動腦，換一種方式入侵。

這個最好的方法還是設定白名單，比較能保證不會出事。

> [!DANGER] 白名單太多不好設定？
> 那一開始就不要有可以下系統 command 的寫法就好了..

### Answer

::: details 答案
username: `natas11`

password: `1KFqoJXi6hRaPluAmk8ESDW4fSysRoIg`
:::
