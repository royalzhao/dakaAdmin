import { baseUrl } from './env'
import { post,fetch } from '@/util/http'
//管理员登录

export function login(data){
    return new Promise((resolve,reject)=>{
        post(baseUrl+'/login',data).then(response=>{
            //console.log(response)
            resolve(response)

        })
        .catch(error => {
            reject(error)
        })
    })
}