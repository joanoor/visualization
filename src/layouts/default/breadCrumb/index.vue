<template>
  <div class="app-breadcrumb" mb-4>
    <el-breadcrumb class="app-el-breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">
        <el-icon :size="14">
          <i-ant-design-home-outlined></i-ant-design-home-outlined>
        </el-icon>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadList" :to="{ path: item.path }" :key="item.name">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup name="LayoutBreadCrumb">
type RequiredBread = Required<Bread>

const route = useRoute()
const breadList = ref<RequiredBread[]>([])

watchEffect(() => {
  if (route.matched && route.matched.length > 0) {
    const matched = route.matched
    const _breadList: RequiredBread[] = (matched[matched.length - 1].meta
      .breadList || []) as RequiredBread[]

    breadList.value = [..._breadList]
  }
})
</script>
