<template>
  <div class="flex">
    
    <div class="chart-container" style="position: relative; height:60vh; width:100%">
      <div id="button_group" ref="list" class="" style="text-align: center;">
        <ul class="flex">
          <li v-for="item in items" :key="item.id">
            <my-button
              :label="item.label"
              :id="item.id"
              :done="item.done"
              @item-deleted="deleteItem(item.id)"
              >
            </my-button>
          </li>
        </ul>
        <!-- <button class="m-1 justify-self-center border-solid border-2 border-indigo-600 rounded" @click="onRemoveBtn">AAA</button>

        <MyButton title="bbb" :method="onRemoveBtn"></MyButton>
        <template v-for="(child, index) in children">
          <component :is="child" v-bind="{title:curBtnLabel}" @click="onRemoveBtn"></component>
        </template> -->
      </div>
      <Doughnut id="doughnut" ref="chartRef" :data="chartData" :options="chartConfig.options" @click="onClick" />
    </div>
    <!-- <div class="chart-container" style="position: relative; height:60vh; width:100%">
      <Pie id="pie" :data="chartData" :options="chartConfig.options" @click="onClickPie"/>
    </div> -->
  </div>
</template>


<script lang="ts">
import { ref } from 'vue'
import uniqueId from 'lodash.uniqueid';
import MyButton from './MyButton.vue'
import { Chart , ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie,Doughnut ,getElementAtEvent,ChartComponentRef} from 'vue-chartjs'
import * as chartConfig from '../ts/chatConfig'
import jsonSpecies from '../assets/json_species.json'
import jsonBrand from '../assets/json_brand.json'
import jsonSubBrand from '../assets/json_subbrand.json'
import jsonFormula from '../assets/json_formula.json'
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, Tooltip, Legend,ChartDataLabels)
//type of MyButton;
export default {
  name: 'DrilldownChart',
  components: {
    Doughnut,
    Pie,
    Chart,
    MyButton,
  },
  data() {
    return {
      items: [
        { id: uniqueId("chart-"),label: "Learn Vue", done: "species" },
      ],
      // items: [{
      //   label: { required: true, type: String },
      //   done: { default: 'species', type: String },
      //   id: { required: true, type: String },
      // }],
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
    deleteItem(itemId:any) {
      const itemIndex = this.items.findIndex((item) => item.id === itemId);
      let done=this.items[itemIndex].done;
      this.items.splice(itemIndex, 1);
      if(done == "species")
        this.chartData=this.chartData1;
      else if(done == "brand")
        this.chartData=this.chartData1;
      else if(done == "subbrand")
        this.chartData=this.chartData2;
      else if(done == "formula")
        this.chartData=this.chartData3;  
    },
    addItem(itemLabel:any,itemDone:any) {
      this.items.push({
        id: uniqueId("chart-"),
        label: itemLabel,
        done: itemDone,
      });
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
      if (!element.length) return;
      const { datasetIndex, index } = element[0];
      this.curBtnLabel=this.chartData.labels[index];
      // console.log(
      //   'element',
      //   this.chartData.type,
      //   this.chartData.labels[index],
      //   this.chartData.datasets[datasetIndex].data[index]
      // );
      this.addItem(this.chartData.labels[index],this.chartData.type); 

      if(this.chartData.type == "species")
        this.chartData=this.chartData2;
      else if(this.chartData.type == "brand")
        this.chartData=this.chartData3;
      else if(this.chartData.type == "subbrand")
        this.chartData=this.chartData4;
      
      //this.addButton(this.chartData.labels[index]);   
      
    },

  }
}
</script>
<style>

</style>