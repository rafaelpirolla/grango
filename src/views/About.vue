<template>
  <div class="about">
    This is an about page with a counter: {{ counter }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'

import useMainStore from '@/store/main'

export default defineComponent({
  setup() {
    const counter = ref(0)

    onMounted(() => {
      setInterval(() => {
        counter.value++
      }, 1000)
    })

    return {
      counter
    }
  }
});
</script>
