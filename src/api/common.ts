import { DICT_FIELDS } from '@/settings/dictSetting'
import { http } from '@utils/http'
import type {
  Result,
  ResultMenuStruct,
  DictType,
  UserInfoStruct,
} from '@/types'

export const MENU_LIST = `/auth/menu/user/access/list` // 获取菜单列表
export const USER_INFO = `/sso/user/info` // 获取用户信息
export const LOGOUT = `/sso/logout` // 退出登录
export const P_CODES = `/system/code/codelist` // 字典接口
export const P_CODES_ST = `/system/code/codelistone` // 特殊的字典接口（可能不是每个系统都能用的到）

/***************************************************************/
export const fetchMenuList = () => {
  return http.get<Result<ResultMenuStruct[]>>({
    url: MENU_LIST,
  })
}

export const fetchDictList = () => {
  return http.post<Result<DictType>>({
    url: P_CODES,
    data: {
      codeTypes: DICT_FIELDS,
    },
  })
}

export const logout = () => {
  return http.post<Result<any>>({
    url: LOGOUT,
  })
}

export const fetchUserInfo = () => {
  return http.get<Result<UserInfoStruct>>({
    url: USER_INFO,
  })
}
