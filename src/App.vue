<script setup lang="ts">
// 引入 SCSS 文件
import '@/styles/fonts.scss';
import '@/styles/base.scss';
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>