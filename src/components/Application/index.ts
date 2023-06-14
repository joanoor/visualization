import { withInstall } from '@/utils'

import appProvider from './src/AppProvider.vue'
import appAvatar from './src/AppAvatar.vue'
import appShortCuts from './src/AppShortCuts.vue'
import appSearch from './src/search/AppSearch.vue'
import appDarkModeToggle from './src/AppDarkModeToggle.vue'

export { useAppProviderContext } from './src/useAppContext'

export const AppProvider = withInstall(appProvider)
export const AppAvatar = withInstall(appAvatar)
export const AppShortCuts = withInstall(appShortCuts)
export const AppSearch = withInstall(appSearch)
export const AppDarkModeToggle = withInstall(appDarkModeToggle)
