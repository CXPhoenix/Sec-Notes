# Over The Wire -- Natas Challenges

Natas teaches the basics of serverside web-security.

Each level of natas consists of its own website located at `http://natasX.natas.labs.overthewire.org`, where X is the level number. There is no SSH login. To access a level, enter the username for that level (e.g. natas0 for level 0) and its password.

Each level has access to the password of the next level. Your job is to somehow obtain that next password and level up. All passwords are also stored in /etc/natas_webpass/. E.g. the password for natas5 is stored in the file /etc/natas_webpass/natas5 and only readable by natas4 and natas5.

::: details 中文翻譯
(翻譯自 [ChatGPT](https://chat.openai.com/share/8d80a937-3c00-4fc9-966a-7fe77f4e395e))

Natas 教授伺服器端網站安全的基礎知識。

Natas 的每個等級都有其專屬網站，位於 `http://natasX.natas.labs.overthewire.org`，其中 X 代表等級號碼。這裡不需要 SSH 登入。要進入某個等級，請輸入該等級的用戶名（例如第0級的 natas0）及其密碼。

每個等級可以存取下一個等級的密碼。你的任務是想辦法獲得下一個密碼並升級。所有的密碼也都儲存在 /etc/natas_webpass/。例如，natas5 的密碼儲存在 /etc/natas_webpass/natas5 檔案中，並且只能被 natas4 和 natas5 讀取。
:::

Start here:

- Username: natas0
- Password: natas0
- URL: `http://natas0.natas.labs.overthewire.org`

---

## 進度列表

- 2024/02/07 -- [Level 0 To Level 3](./00_Level_0_To_Level_3.md)
- 2024/02/07 -- [Level 4 To Level 8](./01_Level_4_To_Level_8.md)
