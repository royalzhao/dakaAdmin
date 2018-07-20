<template>
    <div>
        <v-pageTitle vtitle="留言列表"></v-pageTitle>
        <div class="clear"></div>
        <el-button type="danger" @click="delGroup" :disabled="this.multipleSelection.length === 0" >批量删除</el-button>
        <el-table
            ref="multipleTable"
            :data="news"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            >
            </el-table-column>
            <el-table-column prop="nickname" label="昵称">
                <template slot-scope="scope">{{ scope.row.nickname }}</template>
            </el-table-column>
            <el-table-column prop="headimgurl" label="头像">
                <template slot-scope="scope">
            
                    <img v-bind:src="scope.row.headimgurl" style="height:160px;" />

                </template>
            </el-table-column>
            <el-table-column
            prop="content"
            label="留言内容">
            </el-table-column>
            
            <el-table-column prop="word_time" label="时间">
                <template slot-scope="scope">
                    {{scope.row.word_time | formatDate}}
                </template>
            </el-table-column>
            
            <el-table-column
            fixed="right"
            prop="state"
            label="精选留言">
                <template slot-scope="scope">
                    <el-switch
                    v-model="scope.row.state"
                    @change="stateChange(scope.row.uuid,scope.row.state)"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column
            fixed="right"
            label="操作">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteNews(scope.row.uuid)" type="danger" plain size="small">移除</el-button>
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
    import {showAllLeavWord,choiceLeavWords,deleteLeavWord} from '@/api/getData';
    export default {
    
    data() {
        return {
            news: [],
            listLoading: false,
            multipleSelection: [],
            map: {
                uuid:''
            },
            maps: {
                uuid:[]
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
        delGroup() {  
            var qs = require('qs');
            var ids = this.multipleSelection.map(item => item.uuid);//获取所有选中行的id组成的字符串，以逗号分隔  
          
            this.$confirm('确定要删除选中新闻吗？')
                .then(_ => {
                    console.log(ids)
                    deleteLeavWord(ids)
                        .then(res => {
                            console.log(res)
                            if(res.resultCode == 'success'){
                                this.newsInfo();
                                this.$message({
                                    message: "删除成功",
                                    type: 'success'
                                });
                            }else{
                                this.$message({
                                    message: "删除失败",
                                    type: 'error'
                                });
                            }
                        });
                })
                .catch(_ => {
                
                    this.$message({
                        message: "取消删除",
                        type: 'error'
                    });
                })
        
        },  
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 查询所有留言
        newsInfo(){
            this.listLoading = true;
            var qs = require('qs');
            let info = {};
            info.pageNum=this.pageNum;
            info.pageSize=this.pageSize;
            //读取留言列表
            showAllLeavWord(qs.stringify(info))
                .then(res=>{
                    //console.log(res)
                    this.listLoading = false;
                    this.news = res.list
                    this.total = res.total
                   
                })
           
        },  
        stateChange(uuid,state){
            var qs = require('qs');
            let data = {};
            data.uuid = uuid;
           
            data.state = Number(state)
            
            
            choiceLeavWords(qs.stringify(data))
                .then(res=>{
                    //console.log(res)
                    this.newsInfo();
                })
        },
        //删除
        deleteNews(row){
            //删除
            this.map.uuid = row;
            
            var qs = require('qs');
            
            this.$confirm('确定要删除该新闻吗？')
                .then(_ => {
                    deleteLeavWord(qs.stringify(this.map))
                    .then(res=>{
                        if(res.resultCode == 'success'){
                            this.newsInfo();
                            this.$message({
                                message: "删除成功",
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                message: "删除失败",
                                type: 'error'
                            });
                        }
                       
                    });
                })
                .catch(_ => {
                
                    this.$message({
                        message: "取消删除",
                        type: 'error'
                    });
                });
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
    