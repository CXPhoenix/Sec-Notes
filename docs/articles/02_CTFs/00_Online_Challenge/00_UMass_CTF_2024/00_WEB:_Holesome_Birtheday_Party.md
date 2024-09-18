# Holesome Birthday Party

## Desc

![](/articles/00_CTFs/00_Online_Challenge/00_UMass_CTF_2024/00_Holesome_Birtheday_Party/20240420123442.png)

You just got invited to Spongebob's birthday! But he's decided to test your friendship with a series of challenges before granting you with the ticket of entrance. Can you prove that you're truly his friend and earn your entrance to this holesome birthday party?

::: details 中文翻譯
你被邀請參加海綿寶寶的生日派對！但他決定在授予你入場票之前，透過一系列的挑戰來測試你們的友誼。你能證明你真正是他的朋友，並贏得這個溫馨的生日派對的入場資格嗎？
:::

challenge attach link: [http://holesomebirthdayparty.ctf.umasscybersec.org/](http://holesomebirthdayparty.ctf.umasscybersec.org/)

---

## Background Knowledges

-   HTTP header
-   如何使用 inspector 去觀察 http 封包

---

## Solve

1. 依據需求修改 HTTP header
    1. 修改 `User-agent`
       ![](/articles/00_CTFs/00_Online_Challenge/00_UMass_CTF_2024/00_Holesome_Birtheday_Party/20240420124441.png)
    2. 修改 `Date`
       ![](/articles/00_CTFs/00_Online_Challenge/00_UMass_CTF_2024/00_Holesome_Birtheday_Party/20240420124458.png)
    3. 修改 `Accept-Language`
       ![](/articles/00_CTFs/00_Online_Challenge/00_UMass_CTF_2024/00_Holesome_Birtheday_Party/20240420124516.png)
    4. 修改 `Cookie`
       ![](/articles/00_CTFs/00_Online_Challenge/00_UMass_CTF_2024/00_Holesome_Birtheday_Party/20240420124532.png)
       ![](/articles/00_CTFs/00_Online_Challenge/00_UMass_CTF_2024/00_Holesome_Birtheday_Party/20240420124644.png)
2. 觀察網路封包，會發現在 Response 中會多一個 `Set-Cookie`
   ![](/articles/00_CTFs/00_Online_Challenge/00_UMass_CTF_2024/00_Holesome_Birtheday_Party/20240420124703.png)
3. 將 `Set-Cookie` 中的 `Login` 值進行 base64 decode，會出現 `{"loggedin": false}`
4. 將 `false` 改成 `true`，做 base64 encode 後，再貼回 `Cookie` 中
    - 這時候，你的 `Cookie` 值應該會是 `flavor=chocolate_chip; Login=eyJsb2dnZWRpbiI6IHRydWV9`
5. 拿到 FLAG！
   ![](/articles/00_CTFs/00_Online_Challenge/00_UMass_CTF_2024/00_Holesome_Birtheday_Party/20240420124409.png)
