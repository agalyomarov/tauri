<script setup lang="ts">
import { getCurrentWindow, getAllWindows, LogicalPosition } from "@tauri-apps/api/window";
import { confirm } from "@tauri-apps/plugin-dialog";
const win = getCurrentWindow();

async function focusMain() {
   const windows = await getAllWindows();
   const main = windows.find((w) => w.label === "main");

   if (main) {
      await main.setClosable(true);
      await main.setFocusable(true);
      await main.setResizable(true);
      await main.setMinimizable(true);
      await main.setMaximizable(true);
   }
}

onMounted(() => {
   win.onCloseRequested(async (event) => {
      const windows = await getAllWindows();
      const main = windows.find((w) => w.label === "main");

      event.preventDefault();
      const result = await confirm("Close this window?");
      if (!result) return; // ❌ отменили закрытие

      await focusMain();
      await win.destroy();
      await main?.setFocus();
   });
});

async function close() {
   await win.close();
}
</script>
<template>
   <h4>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nam mollitia quam deserunt odio velit porro id vitae eaque explicabo magni nesciunt voluptas ducimus aspernatur, quos maiores sit, laboriosam iusto?</h4>
   <button @click="close">Close</button>
</template>

<style scoped></style>
