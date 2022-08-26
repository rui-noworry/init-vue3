import {api}  from './api'
import {http} from './http'

export let service = {
    login:function(reqData){
        return http.post(api.login,reqData)
    },
    getMenu: function () {
      return http.get(api.get_menu)
	},
}
