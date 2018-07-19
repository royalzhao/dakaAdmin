<template>
    <div>
        <v-pageTitle vtitle="添加活动"></v-pageTitle>
        <div class="clear"></div>
        <el-card>
            <el-form ref="form" label-position="right" :rules="rules" label-width="120px" :model="form">
                <el-form-item label="活动名称" prop="a_name" class="newsTitle">
                    <el-input v-model="form.a_name" width="200"></el-input>
                </el-form-item>
              
                <el-form-item label="报名开始时间" prop="begin_enroll_time">
                    <el-date-picker
                    v-model="form.begin_enroll_time"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="报名结束时间" prop="end_enroll_time">
                    <el-date-picker
                    v-model="form.end_enroll_time"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
    
                <el-form-item label="打卡开始时间" prop="begin_sign_time">
                    <el-date-picker
                    v-model="form.begin_sign_time"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="打卡结束时间" prop="end_sign_time">
                    <el-date-picker
                    v-model="form.end_sign_time"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
    
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认添加</el-button>
                    <el-button @click="back">返回</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import vPageTitle from '../common/pageTitle'
    import {createActivity } from '@/api/getData';
    export default{
        data(){
           return {
                imageUrl: '',
                form:{
                    begin_sign_time: '',
                    end_sign_time:'',
                    begin_enroll_time:'',
                    end_enroll_time:'',
                    a_name:''  
                },
               
                //表单验证
                rules: {
                    begin_sign_time: [
                        {required: true, message: '请输入打卡开始时间', trigger: 'blur'}
                    ],
                    end_sign_time: [
                        {required: true, message: '请输入打卡结束时间', trigger: 'blur'}
                    ],
                    begin_enroll_time: [
                        {required: true, message: '请输入报名开始时间', trigger: 'blur'}
                    ],
                    end_enroll_time: [
                        {required: true, message: '请输入报名结束时间', trigger: 'blur'}
                    ],
                    a_name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'}
                    ]
                }
            };
        },
        computed: {
            
        },
        methods:{
            
            onSubmit() {
                //提交
                this.$refs.form.validate((valid) => {
                    var qs = require('qs');
                    if(valid) {
                        createActivity(qs.stringify(this.form))
                            .then(res=>{
                                if(res.resultCode == "success") {
                                    console.log(res)
                                    this.$message({
                                        message: res.resultMsg,
                                        type: 'success'
                                    });
                                    this.$router.go(-1);
                                } else {
                                    this.$message({
                                        message: res.resultMsg,
                                        type:'error'
                                    });
                                    this.$router.go(-1);
                                }
                            })
                       
                    }
                });
            },
            back(){
                this.$router.go(-1);
            }
        },
        components:{
            vPageTitle
        }
    }
</script>
<style>
  .newsTitle{
      width:300px;
  }
</style>
