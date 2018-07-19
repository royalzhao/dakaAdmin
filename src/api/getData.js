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

// 当月每日打卡人数
export function signInByDay(data){
    return new Promise((resolve,reject)=>{
        fetch(baseUrl+'/signInByDay').then(response=>{
            //console.log(response)
            resolve(response)

        })
        .catch(error => {
            reject(error)
        })
    })
}

// 活动报名人数/月
export function usersByMonth(data){
    return new Promise((resolve,reject)=>{
        fetch(baseUrl+'/usersByMonth').then(response=>{
            //console.log(response)
            resolve(response)

        })
        .catch(error => {
            reject(error)
        })
    })
}

// 活动报名人员信息
export function userListByPage(data){
    return new Promise((resolve,reject)=>{
        post(baseUrl+'/userListByPage',data).then(response=>{
            //console.log(response)
            resolve(response)

        })
        .catch(error => {
            reject(error)
        })
    })
}

// 添加活动信息
export function createActivity (data){
    return new Promise((resolve,reject)=>{
        post(baseUrl+'/createActivity',data).then(response=>{
            //console.log(response)
            resolve(response)

        })
        .catch(error => {
            reject(error)
        })
    })
}

// 显示活动列表
export function showActivityList (data){
    return new Promise((resolve,reject)=>{
        post(baseUrl+'/showActivityList',data).then(response=>{
            //console.log(response)
            resolve(response)

        })
        .catch(error => {
            reject(error)
        })
    })
}

// 查询单条活动规则
export function showActivityRuleById (data){
    return new Promise((resolve,reject)=>{
        post(baseUrl+'/showActivityRuleById',data).then(response=>{
            //console.log(response)
            resolve(response)

        })
        .catch(error => {
            reject(error)
        })
    })
}

// 修改活动规则
export function updateActivity (data){
    return new Promise((resolve,reject)=>{
        post(baseUrl+'/updateActivity',data).then(response=>{
            //console.log(response)
            resolve(response)

        })
        .catch(error => {
            reject(error)
        })
    })
}