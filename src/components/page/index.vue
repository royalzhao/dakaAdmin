<template>
  <el-form ref="account" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">早起打卡后台管理系统</h3>
    <el-form-item prop="u_name">
      <el-input type="text" v-model="account.u_name"  placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="u_password">
        <el-input type="password" v-model="account.u_pass" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button style="width:100%" @click="handleLogin" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { login } from '@/api/getData'
  export default {
    data() {
      return {
        logining: false,
        account: {
          u_name:'',
          u_pass:''
        },
        //表单验证规则
        rules: {
          u_name: [
            {required: true, message:'请输入账号',trigger: 'blur'}
          ],
          u_pass: [
            {required: true, message:'请输入密码',trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      //初始化
    },
    methods: {
      handleLogin() {
        this.$refs.account.validate((valid) => {
          if(valid) {
            var qs = require('qs');
            this.logining = true;
            try{
              login(qs.stringify(this.account))
              .then(response => {
                if (response.resultCode == 200) {
                  
                  this.$message({
                    type: 'success',
                    message: '登陆成功'
                  });

                  this.logining = false;
                  let expireDays = 1000 * 60 * 60 * 24 * 15;
                  
                  this.setCookie('username',response.u_name,expireDays);
                  //console.log(this.getCookie('username'))
                  this.$router.push('/'); //跳转用户中心页
                  
                }else{
                  this.$message({
                    type: 'error',
                    message: response.resultMsg
                  });
                  this.logining = false;
                }
              })
              
              
            }catch(err){
              console.log(err)
            }

          }
        });

      }
    }
  }
</script>
<style scope>
  .el-input__inner{
      background: rgba(255, 255, 255, 0.2);
  }
  .el-input__inner::placeholder{
      color: #fff;
  }
</style>

