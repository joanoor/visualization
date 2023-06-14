<template>
  <div absolute inset-0 top-24.75>
    <Feature>
      <template #operator>
        <el-radio-group v-model="activeRadio" size="large">
          <el-radio-button v-for="item in radioList" :label="item.label" />
        </el-radio-group>
      </template>
    </Feature>
  </div>
</template>

<script setup lang="ts">
import Feature from './components/Feature.vue'

const { radioList, activeRadio } = useRadioGroup(() => [{
  label: '合格在库数量'
}, {
  label: '高库龄资产数量'
}], {
  onDefault(data) {
    activeRadio.value = data[0].label
  },
  onChange(value) {

  },
})
</script>

<style scoped></style>