<template>
    <div class="c-charts">
        <IEcharts :option="line"></IEcharts>
    </div>
</template>

<script>
    import IEcharts from 'vue-echarts-v3';
    import { usersByMonth } from '@/api/getData'
    export default {
        components:{
            IEcharts
        },
        data (){
            return {  
                date:[],
                see:[]
               
            }  
        },
        mounted() {
            //初始化
            this.searchJifenCount();
            
        },
        computed:{  
            line:function(){
                return{ 
                    title : {
                        text: '报名人数统计',
                        subtext: '2018年'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['报名人数']
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
                            name:'报名人数',
                            type:'line',
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data:this.see
                        }
                    ]
                }
            }  
        },
        methods: {
            searchJifenCount(){
                usersByMonth()
                    .then(response => {
                        console.log(response)
                        var date = [];
                        var see = [];
                        for(var i in response){
                            date.push(response[i].month)
                            see.push(response[i].count)
                        }
                        
                        this.date = date
                        this.see = see
                        
                    })
              
             
            }
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