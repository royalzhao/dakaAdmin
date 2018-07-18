<template>
    <div class="sidebar">
        
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" background-color="#324157" text-color="#F0F3F4" unique-opened router>
            <el-menu-item index="DashBoard">
                <i class="el-icon-menu"></i>主页
            </el-menu-item>

            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-tickets"></i>
                    用户管理
                </template>
                <el-menu-item index="userList">用户列表</el-menu-item>
               
            </el-submenu>

            <el-submenu index="3">
                <template slot="title">
                   <i class="el-icon-setting"></i>活动管理
                </template>
                <el-menu-item index="activitySetting">活动设置</el-menu-item>
            </el-submenu>

            <el-menu-item index="tradingRecord">
                <i class="el-icon-document"></i>交易记录
            </el-menu-item>

            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-edit-outline"></i>留言管理
                </template>
                <el-menu-item index="messageList">留言列表</el-menu-item>
            </el-submenu>
            
            
        </el-menu>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                
            }
        },
       computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 66px;
        bottom:0;
        background: #324157;
       
    }
    .sidebar > ul {
        height:100%;
    }

   .el-menu-item, .el-submenu__title{
       font-size:14px;
     
   }
   
    .material-icons {font-size:12px;}
    
</style>