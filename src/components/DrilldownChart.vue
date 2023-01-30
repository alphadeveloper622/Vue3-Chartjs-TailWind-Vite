<template>
  <div class="flex">
    <ButtonList :tasks="tasks"></ButtonList>
    <!-- <div class="chart-container" style="position: relative; height:60vh; width:100%">
      <div id="button_group" ref="list" class="" style="text-align: center;">
        <button class="m-1 justify-self-center border-solid border-2 border-indigo-600 rounded" @click="onRemoveBtn">AAA</button>

        <MyButton title="bbb" :method="onRemoveBtn"></MyButton>
        <template v-for="(child, index) in children">
          <component :is="child" v-bind="{title:curBtnLabel}" @click="onRemoveBtn"></component>
        </template>
      </div>
      <Doughnut id="doughnut" ref="chartRef" :data="chartData" :options="chartConfig.options" @click="onClick" />
    </div>
    <div class="chart-container" style="position: relative; height:60vh; width:100%">
      <Pie id="pie" :data="chartData" :options="chartConfig.options" @click="onClickPie"/>
    </div> -->
  </div>
</template>


<script lang="ts">
import { ref } from 'vue'
import MyButton from './MyButton.vue'
import { Chart , ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie,Doughnut ,getElementAtEvent,ChartComponentRef} from 'vue-chartjs'
import * as chartConfig from '../ts/chatConfig'
import jsonSpecies from '../assets/json_species.json'
import jsonBrand from '../assets/json_brand.json'
import jsonSubBrand from '../assets/json_subbrand.json'
import jsonFormula from '../assets/json_formula.json'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ButtonList from '../components/ButtonList.vue'
Chart.register(ArcElement, Tooltip, Legend,ChartDataLabels)
//type of MyButton;
export default {
  name: 'DrilldownChart',
  components: {
    Doughnut,
    Pie,
    Chart,
    MyButton,
    ButtonList
  },
  data() {
    return {
      tasks: [
        {
          title: 'Make todo list',
          completed: true
        },
        {
          title: 'Go skydiving',
          completed: false
        }
      ],
  
      jsonSpecies:jsonSpecies,
      jsonBrand:jsonBrand,
      jsonSubBrand:jsonSubBrand,
      jsonFormula:jsonFormula,
      chartConfig:chartConfig,
      children: [] as any[],
      curBtnLabel:'',
      chartData: {
        type:"",
        labels: [] as string[],
        datasets: [
          {
            backgroundColor: [] as string[],
            data: [] as number[],
          }
        ],
      },
      chartData1: {
        type:"species",
        labels: [] as string[],
        datasets: [
          {
            backgroundColor: [] as string[],
            data: [] as number[],
          }
        ],
      },
      chartData2: {
        type:"brand",
        labels: [] as string[],
        datasets: [
          {
            backgroundColor: [] as string[],
            data: [] as number[],
          }
        ],
      },
      chartData3: {
        type:"subbrand",
        labels: [] as string[],
        datasets: [
          {
            backgroundColor: [] as string[],
            data: [] as number[],
          }
        ],
      },
      chartData4: {
        type:"formula",
        labels: [] as string[],
        datasets: [
          {
            backgroundColor: [] as string[],
            data: [] as number[],
          }
        ],
      },
    }
  },
 
  created() {
    this.fillData1();
    this.fillData2();
    this.fillData3();
    this.fillData4();
    this.chartData=this.chartData1;
  },
 
  methods: {
    addButton (label:String) {
      debugger;
      this.children.push(MyButton);
      //this.onComplete();
    },
    onComplete: function() {
      //const buttonGroup = document.getElementById("button_group");
     // buttonGroup?.removeChild(event.target);
        let iconEle = document.getElementsByClassName("delete-icon");
        var _this =this;
        //Event handler to bind the click event for delete icon
        Array.from(iconEle).forEach(function(element) {
            element.addEventListener("click", _this.deleteItem.bind(_this));
        });
    },
    deleteItem: function(event:any){
      console.log("sssssssss");
        event.stopPropagation();
       // let liItem = event.target.parentElement.parentElement;
        const buttonGroup = document.getElementById("button_group");
        buttonGroup?.removeChild(event.target);
        this.onComplete();
    },
    parentMethod() {
      // Do something with the value
      console.log('From the child:');
    },
    onRemoveBtn(event:any) {
      const buttonGroup = document.getElementById("button_group");
      debugger;
      buttonGroup?.removeChild(event.target);
      //console.log((this.children[0] as any).methods.getTitle());
     // event.target
    },
    fillData1() {
      for(var i=0; i < this.jsonSpecies.length; i++){
        this.chartData1.labels.push(this.jsonSpecies[i].name);
        this.chartData1.datasets[0].data[i]=this.jsonSpecies[i].value;
        this.chartData1.datasets[0].backgroundColor[i]='#'+(Math.random()*0xFFFFFF<<0).toString(16);
      }
    },
    fillData2() {
      for(var i=0; i < this.jsonBrand.length; i++){
        this.chartData2.labels.push(this.jsonBrand[i].name);
        this.chartData2.datasets[0].data[i]=this.jsonBrand[i].value;
        this.chartData2.datasets[0].backgroundColor[i]='#'+(Math.random()*0xFFFFFF<<0).toString(16);
      }
    },
    fillData3() {
      for(var i=0; i < this.jsonSubBrand.length; i++){
        this.chartData3.labels.push(this.jsonSubBrand[i].name);
        this.chartData3.datasets[0].data[i]=this.jsonSubBrand[i].value;
        this.chartData3.datasets[0].backgroundColor[i]='#'+(Math.random()*0xFFFFFF<<0).toString(16);
      }
    },
    fillData4() {
      for(var i=0; i < this.jsonFormula.length; i++){
        this.chartData4.labels.push(this.jsonFormula[i].name);
        this.chartData4.datasets[0].data[i]=this.jsonFormula[i].value;
        this.chartData4.datasets[0].backgroundColor[i]='#'+(Math.random()*0xFFFFFF<<0).toString(16);
      }
    },
    onClick(event: MouseEvent) {
   
      const chart = (this.$refs.chartRef as any).chart;
   
      this.elementAtEvent(getElementAtEvent(chart, event));
      
    },
    onClickPie(event: MouseEvent) {
 
      const chart = (this.$refs.chartRef as any).chart;
   
      this.elementAtEvent(getElementAtEvent(chart, event));
    
    },
    elementAtEvent(element: any[]){
      debugger;
      if (!element.length) return;
      const { datasetIndex, index } = element[0];
      this.curBtnLabel=this.chartData.labels[index];
      // console.log(
      //   'element',
      //   this.chartData.type,
      //   this.chartData.labels[index],
      //   this.chartData.datasets[datasetIndex].data[index]
      // );
      
      if(this.chartData.type == "species")
        this.chartData=this.chartData2;
      else if(this.chartData.type == "brand")
        this.chartData=this.chartData3;
      else if(this.chartData.type == "subbrand")
        this.chartData=this.chartData4;
      
      this.addButton(this.chartData.labels[index]);    
    },

  }
}
</script>
<style>

</style>