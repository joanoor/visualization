<template>
  <template v-for="item in menuItems">
    <el-menu-item
      v-if="!item.children || item.children.length === 0"
      :index="'/' + item.perms"
      ml-2
    >
      <template #title>
        <span>{{ item.menuName }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu :index="'/' + item.perms" v-else>
      <template #title>
        <span ml-2>{{ item?.menuName }}</span>
      </template>
      <MenuItem :menuItems="item?.children"></MenuItem>
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup name="LayoutMenuItem">
import MenuItem from './MenuItem.vue'

defineProps<{
  menuItems: any[]
}>()
</script>
