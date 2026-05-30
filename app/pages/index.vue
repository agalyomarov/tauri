<script setup lang="ts">
import { getCurrentWindow, UserAttentionType } from "@tauri-apps/api/window";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { Webview } from "@tauri-apps/api/webview";

async function openWindow() {
   const main = getCurrentWindow();

   const existing = await WebviewWindow.getByLabel("settings");

   if (existing) {
      await existing.show();
      await existing.setFocus();
      await existing.requestUserAttention(UserAttentionType.Critical);
      console.log(existing);
      return;
   }

   // 🔒 блокируем main window
   await main.setClosable(false);
   await main.setFocusable(false);
   await main.setResizable(false);
   await main.setMinimizable(false);
   await main.setMaximizable(false);

   const win = new WebviewWindow("settings", {
      url: "/settings",
      title: "Settings",
      width: 400,
      height: 700,
      alwaysOnTop: true,
      center: true,
      parent: main,
      acceptFirstMouse: true,
      resizable: false,
      minimizable: false,
      maximizable: false,
      focus: true,
   });

   win.once("tauri://created", async () => {});

   win.once("tauri://error", (e) => {
      console.error(e);
   });
}
</script>
<template>
   <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ullam alias natus culpa, blanditiis eligendi quae aspernatur aperiam vel necessitatibus inventore debitis illum velit voluptatem corporis. Non provident ex debitis.</h1>
   <NuxtLink to="/test">test</NuxtLink>
   <br />
   <button @click="openWindow()">Open</button>
   <br />
   <select
      style="font-size: 16px; padding: 2px 4px; border-radius: 0px"
      name=""
      id="">
      <option
         v-for="(value, index) in Array.from({ length: 1000 })"
         :value="index">
         Lorem ipsum dolor sit amet consectetur
      </option>
   </select>
</template>

<style scoped></style>
