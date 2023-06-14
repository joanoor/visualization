<template>
  <el-result :icon="icon" :class="prefixCls" :title="title" :sub-title="subTitle">
    <template #extra>
      <el-button type="primary" @click="handler">{{ btnText }}</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts" name="ErrorPage">

import { useI18n } from '@/hooks/web/useI18n'
import { useGo, useRedo } from '@/hooks/web/usePage'
import { ExceptionEnum } from '@/settings/exceptionSetting';
import { usePermissionStore } from '@/store'

interface MapValue {
  title: string
  subTitle: string
  btnText?: string
  icon?: string
  handler?: any
  status?: string
}

const props = withDefaults(
  defineProps<{
    status?: number
    title?: string
    subTitle?: string
    full?: boolean
  }>(),
  {
    status: ExceptionEnum.PAGE_NOT_FOUND,
    title: '',
    subTitle: '',
    full: false,
  }
)

const statusMapRef = ref(new Map<string | number, MapValue>())

const { query } = useRoute()
const permissionStore = usePermissionStore()
const go = useGo()
const redo = useRedo()
const { t } = useI18n()
const { prefixCls } = useDesign('app-exception-page')

const getStatus = computed(() => {
  const { status: routeStatus } = query
  const { status } = props
  return Number(routeStatus) || status
})

const getMapValue = computed((): MapValue => {
  return unref(statusMapRef).get(unref(getStatus)) as MapValue
})

const { title, subTitle, btnText, icon, handler, status } =
  unref(getMapValue) || {}

const backLoginI18n = t('sys.exception.backLogin')
const backHomeI18n = t('sys.exception.backHome')

unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
  title: '403',
  status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
  subTitle: t('sys.exception.subTitle403'),
  btnText: props.full ? backLoginI18n : backHomeI18n,
  handler: () => (props.full ? go(permissionStore.defaultRouter) : go()),
})

unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
  title: '404',
  status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
  subTitle: t('sys.exception.subTitle404'),
  btnText: props.full ? backLoginI18n : backHomeI18n,
  handler: () => (props.full ? go(permissionStore.defaultRouter) : go()),
})

unref(statusMapRef).set(ExceptionEnum.ERROR, {
  title: '500',
  status: `${ExceptionEnum.ERROR}`,
  subTitle: t('sys.exception.subTitle500'),
  btnText: backHomeI18n,
  handler: () => go(),
})

unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_DATA, {
  title: t('sys.exception.noDataTitle'),
  subTitle: '',
  btnText: t('common.redo'),
  handler: () => redo(),
  // icon: notDataSvg,
})

unref(statusMapRef).set(ExceptionEnum.NET_WORK_ERROR, {
  title: t('sys.exception.networkErrorTitle'),
  subTitle: t('sys.exception.networkErrorSubTitle'),
  btnText: t('common.redo'),
  handler: () => redo(),
  // icon: netWorkSvg,
})
</script>
