<template>
    <div>
        <v-pageTitle vtitle="交易记录"></v-pageTitle>
        <div class="clear"></div>
        <el-table
        :data="userList"
        style="width: 100%"
        :default-sort = "{prop: 'time', order: 'descending'}"
            v-loading="listLoading"
        >
        <el-table-column
            fixed
            prop="time"
            label="交易时间"
            sortable
            width="150">
        </el-table-column>
       
        <el-table-column
            prop="real_name"
            label="姓名"
            sortable
            width="120">
        </el-table-column>
        <el-table-column prop="headimgurl" width="130" label="头像">
            <template slot-scope="scope">
        
                <img v-bind:src="scope.row.headimgurl" style="width:100%;" />

            </template>
        </el-table-column>
       
        <el-table-column
            prop="record_info"
            label="事由"
            width="120">
        </el-table-column>

        <el-table-column
            prop="type"
            label="类别"
            width="120">
        </el-table-column>
        
        <el-table-column
            prop="transaction_amount"
            label="金额"
            width="120">
        </el-table-column>

        <el-table-column
            prop="state"
            label="交易状态">
        </el-table-column>
        
        </el-table>
        <!-- 分页 -->
        <el-col :span="24" class="toolbar block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 50, total]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        </el-col>
    </div>
</template>
<script>
import vPageTitle from '../common/pageTitle'
import {showRecordList} from '@/api/getData'
    export default {
    data() {
        return {
            userList: [],
            listLoading: false,
            total:0,
            page:{
                pageSize:10,
                pageNum:1
            }
        
        }
    },
    mounted() {
        //初始化
        this.userSearch();
    },
    methods:{
        
        // 查询所有记录
        userSearch(){
            this.listLoading = true;
            var qs = require('qs');
            showRecordList(qs.stringify(this.page))
                .then(response => {
                    this.listLoading = false;
                    console.log(response)
                    this.userList = response.list;
                    this.total = response.total;
                    this.listLoading = false;
                })

          
        },
        //点击分页
        handleCurrentChange(val) {
            this.page.pageNum = val;
            this.userSearch();
        },
        handleSizeChange(val) {
            this.page.pageSize = val;
            this.userSearch();
        },
    },
    
    components:{
        vPageTitle
    }
    }
</script>