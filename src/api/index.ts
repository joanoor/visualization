import { DICT_FIELDS } from '@/settings/dictSetting'
import { http } from '@utils/http'
import type {
  Result,
  ResultMenuStruct,
  DictType,
  UserInfoStruct,
} from '@/types'
import { RequestOptions } from '@nrzt/request'

const DOSSIER = `/dossier/electricitymeter/page`

export const getDossierTable = (
  data: Recordable,
  url: string = DOSSIER,
  opt?: RequestOptions
) => {
  return http.post(
    {
      url,
      data,
    },
    opt
  )
}
