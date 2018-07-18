<template>
    <div>
        <v-pageTitle vtitle="DashBoard"></v-pageTitle>
        <div class="clear"></div>

        <el-row :gutter="20">
            <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-card class="box-chart">
                    <websiteCount></websiteCount>
                </el-card>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-card class="box-chart">
                    <signCount></signCount>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-card class="box-chart">
                    <jifenCount></jifenCount>
                </el-card>
            </el-col>
            
        </el-row>
        <el-row :gutter="20" style="margin-top:20px;">
            <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-card class="box-chart">
                    <signCount></signCount>
                </el-card>
            </el-col> -->
            <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-card class="box-chart">
                    <getCount></getCount>
                </el-card>
            </el-col> -->
        </el-row>
    </div>
</template>
<script>
    import vPageTitle from "../common/pageTitle.vue";
    // import websiteCount from "../charts/websiteCount.vue";
    import jifenCount from "../charts/jifenCount.vue";
    import signCount from "../charts/signCount.vue";
    // import getCount from "../charts/getCount.vue";

    export default{
        data(){
            return{

            }
        },
        components:{
            vPageTitle,jifenCount,signCount
        }
    }
</script>