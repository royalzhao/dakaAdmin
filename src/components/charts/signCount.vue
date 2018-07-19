<template>
    <div class="c-charts">
        <IEcharts :option="line" theme="macarons"></IEcharts>
    </div>
</template>

<script>
    import IEcharts from 'vue-echarts-v3';
    import 'echarts/theme/macarons.js'
    import { signInByDay } from '@/api/getData'
    export default {
        components:{
            IEcharts
        },
        data() {
            return {  
                date:[],
                count:[]
            }  
        },
        mounted() {
            //初始化
            this.searchSignCount();
            
        },
        computed:{  
            line: function(){
                return{ 
                    title : {
                        text: '打卡人数统计',
                        subtext: '2018年'
                    },
                        tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['打卡人数']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.date
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'打卡人数',
                            type:'line',
                            stack: '总量',
                            data:this.count
                        }
                    ]
                }
            }  
        },
        methods: {
            searchSignCount(){
                signInByDay()
                    .then(response => {
                        var date = [];
                        var count = [];
                        for(var i in response){
                            date.push(response[i].day)
                            count.push(response[i].count)
                        }
                        
                        this.date = date
                        this.count = count
                       // console.log(response)
                    })
              
            },
            
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
   
    .cart-string{
        height:100px;
        padding-top:10px;
        font-size:1.1rem;
        
    }
    .c-charts{
        height:400px;
        width:100%;
    }
 
    
</style>