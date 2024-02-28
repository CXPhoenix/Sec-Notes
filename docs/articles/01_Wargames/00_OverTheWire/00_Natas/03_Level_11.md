---
outline: [2, 3]
---

# Level 11 Write-up

## level 11

### Challenge Description

![](/articles/01_Wargames/00_OverTheWire/00_Natas/03_Level_11/20240228140921.png)

website: [http://natas11.natas.labs.overthewire.org/](http://natas11.natas.labs.overthewire.org/)

### Background Knowledges

-   PHP Function 概念
-   PHP network application 概念
-   XOR 的反轉概念。

### Solve {#skip-from-basic-knowledge}

#### 一、 針對網頁進行偵查，看看網頁原始碼等等。

但是根本不會有收穫（😂

#### 二、 查看提供的原始碼。

這題我們點開 `View sourcecode` 查看原始碼:

```php:line-numbers
$defaultdata = array( "showpassword"=>"no", "bgcolor"=>"#ffffff");

function xor_encrypt($in) {
    $key = '<censored>';
    $text = $in;
    $outText = '';

    // Iterate through each character
    for($i=0;$i<strlen($text);$i++) {
    $outText .= $text[$i] ^ $key[$i % strlen($key)];
    }

    return $outText;
}

function loadData($def) {
    global $_COOKIE;
    $mydata = $def;
    if(array_key_exists("data", $_COOKIE)) {
    $tempdata = json_decode(xor_encrypt(base64_decode($_COOKIE["data"])), true);
    if(is_array($tempdata) && array_key_exists("showpassword", $tempdata) && array_key_exists("bgcolor", $tempdata)) {
        if (preg_match('/^#(?:[a-f\d]{6})$/i', $tempdata['bgcolor'])) {
        $mydata['showpassword'] = $tempdata['showpassword'];
        $mydata['bgcolor'] = $tempdata['bgcolor'];
        }
    }
    }
    return $mydata;
}

function saveData($d) {
    setcookie("data", base64_encode(xor_encrypt(json_encode($d))));
}

$data = loadData($defaultdata);

if(array_key_exists("bgcolor",$_REQUEST)) {
    if (preg_match('/^#(?:[a-f\d]{6})$/i', $_REQUEST['bgcolor'])) {
        $data['bgcolor'] = $_REQUEST['bgcolor'];
    }
}

saveData($data);



?>

<h1>natas11</h1>
<div id="content">
<body style="background: <?=$data['bgcolor']?>;">
Cookies are protected with XOR encryption<br/><br/>

<?
if($data["showpassword"] == "yes") {
    print "The password for natas12 is <censored><br>";
}

?>
```

這邊分成 4 個區塊：

-   `defaultvalue` 的設定。
-   Functions 區域。
-   主要資料處理區。
-   畫面顯示判斷邏輯。

根據推斷，這邊 PHP 的程式處理順序應該是：

1. 設定 `defaultvalue` (line 1)。
2. 設定一個變數 `data` 去儲存 `defaultvalue` (line 35)。
3. 在 第二步 會去 call function `loadData` (line 16 ~ 29)。
    1. 在執行 function `loadData` 執行過程中，會去 call function `xor_encrypt` (line 3 ~ 14)。
        1. 執行 function `xor_encrypt` 會去將 `某個 key` 及參數 `in` 去 `XOR` 運算，並吐出 `XOR` 後的結果 (line 9 ~ 12)。
    2. 呈第 4 步，根據他使用 `base64_decode` 及 `json_decode` 兩個函式來看，這邊應該是將 Cookie decypt，而非加密 (line 20)。
    3. 將 decrypt 後的結果檢查是否為型別 `array` 和 包含一個 key `showpassword` 和 包含 key `bgcolor` (line 21)。
    4. 若是第 7 步條件成立，則去用 `preg_match` 進行 regex 的檢查 (line 22)。
    5. 若是第 8 步條件成立，則將 line 18 設定的變數 `mydata` 中加入 key `showpassword` 及 `bgcolor` 並且賦予其值 (line 22 ~ 24)。
    6. 若第 7 步或第 8 步不成立，則不做任何事情。
    7. return 變數 `mydata` (line 28)。
4. 判斷進來的 `REQUEST` 進來得 key 是否包含 `bgcolor` (line 37)。
5. 若是包含，就檢查 `bgcolor` 的值是否為 16 進位的 color 色票，若是，則 `data` 就加入 key `bgcolor` (line 38 ~ 39)。
6. call function `saveData` (line 43)。
   根據函式名稱猜測這應該是把處理好的資料進行儲存。
    1. 執行 function `saveData` ，利用 PHP 內建函式 `setcookie` 來傳送 cookie 到前端，其 key 為 `data` (line 32)。
    2. Cookie 的值為參數 `d`，並將其先做 `json_encode`，後做 `xor_encrypt` (參考步驟 3-1-1) 並且利用 `base64_encode` 將其轉為 base64 字串。
7. 根據剛剛解出來的 `data` ，檢查其 key `showpassword` 是否為字串 `yes` ，若是則吐出 natas12 的密碼。

根據整個 PHP 的流程，可以知道在一開始就會拿到一個 Cookie 是被加密過的。

因此我們要解開的話就會變成有以下任務：

1. 得到 `XOR` 的 key。
2. 用 PHP 利用上面的已知函式將其加密並放到 Cookie 中。
3. 重新整理後，讓網頁判斷這是正確的 Cookie 並且讓其含有 `showpassword` 的 key (value 為 `yes`)。
4. 得到 password :100:

#### 三、 取得 `XOR` 的 key。

利用 XOR 的特性，我們可以知道將原始的 value 與 XOR 後的 value 重新進行 XOR 就可以得到 key。所以我們取得原始的 value。

```php:line-numbers
<?php
$defaultdata = array( "showpassword"=>"no", "bgcolor"=>"#ffffff");

function xor_encrypt($in, $key) {
    $text = $in;
    $outText = '';

    // Iterate through each character
    for($i=0;$i<strlen($text);$i++) {
    $outText .= $text[$i] ^ $key[$i % strlen($key)];
    }

    return $outText;
}

$encrypted_value = "MGw7JCQ5OC04PT8jOSpqdmkgJ25nbCorKCEkIzlscm5oKC4qLSgubjY%3D";

$decrypt_key = xor_encrypt(json_encode($defaultdata), base64_decode($encrypted_value));

echo $decrypt_key; #OUTPUT: KNHLKNHLKNHLKNHLKNHLKNHLKNHLKNHLKNHLKNHLK
?>
```

我們利用原始的程式碼進行一點點改編，把 `base64_decode($encrypted_value)` 當作 key，把 `json_encode($defaultdata)` 當作 value 進行 XOR 運算，最後得到結果。

這邊看到有重複的字串，因為 `xor_encrypt` 的函式寫法 (line 9 ~ 11) ，可以直接取最簡的字串 `KNHL` 為 key。

#### 四、 利用取得的 key 來運算 array( "showpassword"=>"yes", "bgcolor"=>"#ffffff") 的加密 cookie

這邊我們就繼續重用原始碼中有的程式碼來進行運算。

```php:line-numbers
<?php
$defaultdata = array( "showpassword"=>"yes", "bgcolor"=>"#ffffff");

function xor_encrypt($in) {
    $key = "KNHL";
    $text = $in;
    $outText = '';

    // Iterate through each character
    for($i=0;$i<strlen($text);$i++) {
    $outText .= $text[$i] ^ $key[$i % strlen($key)];
    }

    return $outText;
}

function saveData($d) {
    return base64_encode(xor_encrypt(json_encode($d)));
}

$encrypt_cookie = saveData($defaultdata);

echo $encrypt_cookie; # OUTPUT: MGw7JCQ5OC04PT8jOSpqdmk3LT9pYmouLC0nICQ8anZpbS4qLSguKmkz
?>
```

所以我們就把原本的 `Cookie` 變成剛剛的結果，就可以得到我們要的結果了！。

![](/articles/01_Wargames/00_OverTheWire/00_Natas/03_Level_11/20240228151204.png)

### Tutorial

> [!WARNING] tl;dr
> 教學部分比較長，所以如果沒興趣，可以直接跳至 [Thoughts](#skip-from-tldr)

本題的難度其實並不難，反倒是需要很多針對 XOR 的基本概念，以及一點逆向工程的思維。

主要你必須要了解 `XOR` 的概念。

| XOR   | TRUE  | FALSE |
| ----- | :---: | :---: |
| TRUE  | FALSE | TRUE  |
| FALSE | TRUE  | FALSE |

上面是 `XOR` 的真值表，他的中文是 `互斥 OR` 。

以集合的概念來說，就是「包含 A 但不包含 B」的部分。

![](/articles/01_Wargames/00_OverTheWire/00_Natas/03_Level_11/20240228151859.png)

> src:https://zh.wikipedia.org/zh-tw/%E9%80%BB%E8%BE%91%E5%BC%82%E6%88%96

`XOR` 也是密碼學中重要的組成，在 `DES` 中，會需要搭配 `XOR` 來進行加密運算。

為什麼？因為 `XOR` 具有特殊的 `可逆性`：

::: tip **XOR 邏輯推論**
$\text{if } A \oplus B = C;$

$\hspace{1em}\text{then}$

$\hspace{2em}A \oplus C = B;$

$\hspace{2em}B \oplus C = A;$

$\text{endif}$
:::

所以根據以上邏輯推論我們可以知道，當 $\text{Plaintext } \oplus \text{Key } = \text{Ciphertext}$ 後，當然可以反過來把 $\text{Ciphertext} \oplus \text{Key } = \text{Plaintext}$

不過若是單純這樣，其實我們很容易就被攻破了，因為 $\text{Plaintext } \oplus \text{Ciphertext } = \text{Key}$ ，所以在 `DES` 對稱式加密演算法中，會加入 `Subtitution Cipher` （替代式加密），使其增加可靠性。

但是在這一題，因為沒有任何的替代或移轉，因此我們可以直接把明文及密文做 `XOR` 得到我們的 `KEY`。

### Thoughts {#skip-from-tldr}

本題主要就是考驗你能不能反推整個程式，以及知不知道 `XOR` 的特性進而找到 KEY。

算是密碼學的入門吧！

::: info 同場加映
如果你喜歡這種密碼學的東東，你也可以去打打看這一題！

<PreviewCard title="[DownUnderCTF 2023] flag art" url="https://github.com/DownUnderCTF/Challenges_2023_Public/tree/main/beginner/flag-art" />
:::

### Answer

::: details 答案
username: `natas12`

password: `YWqo0pjpcXzSIl5NMAVxg12QxeC1w9QG`
:::
