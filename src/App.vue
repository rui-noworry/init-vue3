<template>
<!--  <el-config-provider :locale="locale">-->
    <router-view/>
<!--  </el-config-provider>-->
</template>
<script>
  import { defineComponent, computed } from 'vue'
  import zhCn from 'element-plus/es/locale/lang/zh-cn'
  import en from 'element-plus/es/locale/lang/en'
  import {useStore} from 'vuex'
  export default defineComponent({
    setup () {
          document.documentElement.className = "light";
          const toggleTheme = (scopeName = "light") => {
            let styleLink = document.getElementById("theme-link-tag");
            if (styleLink) {
              // 假如存在id为theme-link-tag 的link标签，直接修改其href
              styleLink.href = `/${scopeName}.css`;
              // document.documentElement.className = scopeName;
            } else {
              // 不存在的话，则新建一个
              styleLink = document.createElement("link");
              styleLink.type = "text/css";
              styleLink.rel = "stylesheet";
              styleLink.id = "theme-link-tag";
              styleLink.href = `/${scopeName}.css`;
              // document.documentElement.className = scopeName;
              document.head.append(styleLink);
            }
          };
          toggleTheme('light')

          const store = useStore()
          const locale = computed(()=>{
            return store.state.lang !== 'US' ? zhCn : en
          })
          return {locale}
    },
  })

</script>

