<template>
    <div>
        <v-pageTitle vtitle="活动列表"></v-pageTitle>
        <div class="clear"></div>
        <div class="addNews"><el-button @click="goAddNews" type="primary">添加活动</el-button></div>
        <el-table
            ref="multipleTable"
            :data="news"
            tooltip-effect="dark"
            style="width: 100%">
            
            <el-table-column
            label="活动名称">
            <template slot-scope="scope">{{ scope.row.a_name }}</template>
            </el-table-column>
           
            <el-table-column
            prop="begin_sign_time"
            label="开始时间">
            </el-table-column>
            <el-table-column
            prop="end_sign_time"
            label="结束时间">
            </el-table-column>
            <el-table-column
            prop="begin_enroll_time"
            label="报名开始时间">
            </el-table-column>
            <el-table-column
            prop="end_enroll_time"
            label="报名结束时间">
            </el-table-column>
            
            <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
                <el-button type="success" plain size="small" @click="goEdit(scope.row.id)">编辑</el-button>
            </template>
            </el-table-column>
        </el-table>
         <!-- 分页 -->
        <el-col :span="24" class="toolbar block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 50, total]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-col>
        <!-- <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div> -->
    </div>
</template>
<script>
 import vPageTitle from '../common/pageTitle';
 import {showActivityList } from '@/api/getData';
  export default {
    data() {
      return {
        news: [],
        listLoading: false,
        map: {
          n_id:''
        },
        total:0,
        pageSize:10,
        pageNum:1,
        
      }
    },
    mounted() {
      //初始化
      this.newsInfo();
    },
    methods: {
      
      // 查询所有活动信息
      newsInfo(){
        this.listLoading = true;
        var qs = require('qs');
        let info = {};
        info.pageNum=this.pageNum;
        info.pageSize=this.pageSize;
        
        //读取活动列表
        showActivityList(qs.stringify(info))
            .then(res=>{
                this.listLoading = false;
                this.news = res.list
                this.total = res.total
            })
      
      },
      // 添加活动
      goAddNews(){
        this.$router.push('addActivity');
      },
      // 编辑
      goEdit(row){
        if(row !== undefined) {
          this.$router.push({path:'updateActivity',query:{id:row}});
        }
      },
      //点击分页
      handleCurrentChange(val) {
        this.pageNum = val;
        this.newsInfo();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.newsInfo();
      },
    },
    components:{
        vPageTitle
    }
  }
</script>
<style scoped>
    .el-col{
        margin-bottom:16px;
    }
    .material-icons{
        font-size:80px;
        color:#ddd;
    }
   
    .ql-container .ql-editor {
        min-height: 20em;
        padding-bottom: 1em;
        max-height: 25em;
        
    }
    .html {
        height: 9em;
        overflow-y: auto;
        border: 1px solid #ccc;
        border-top: none;
        resize: vertical;
        background-color:#fff;
    }
 
    
</style>
