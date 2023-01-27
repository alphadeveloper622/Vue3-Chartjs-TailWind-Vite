<template>
  <Doughnut ref="chartRef" :data="chartData" :options="chartConfig.options" @click="onClick"/>
  <!-- <Pie :data="chartData" :options="chartConfig.options" /> -->
  <!-- <div class="col-span-6 sm:col-span-3">
    <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
    <select id="country" name="country" autocomplete="country-name" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
      <option>United States</option>
      <option>Canada</option>
      <option>Mexico</option>
    </select>
  </div> -->
</template>


<script lang="ts">
import { ref } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie,Doughnut ,getElementAtEvent,ChartComponentRef} from 'vue-chartjs'
import * as chartConfig from '../ts/chatConfig'
import jsonSpecies from '../assets/json_species.json'
import jsonBrand from '../assets/json_brand.json'
import jsonSubBrand from '../assets/json_subbrand.json'
import jsonFormula from '../assets/json_formula.json'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'DrilldownChart',
  components: {
    Doughnut,
    Pie
  },
  data() {
    return {
      jsonSpecies:jsonSpecies,
      jsonBrand:jsonBrand,
      jsonSubBrand:jsonSubBrand,
      jsonFormula:jsonFormula,
      chartConfig:chartConfig,
      chartRef : ref<ChartComponentRef>(null),
      chartData: {
        type:"",
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          }
        ],
      },
      chartData1: {
        type:"species",
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          }
        ],
      },
      chartData2: {
        type:"brand",
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          }
        ],
      },
      chartData3: {
        type:"subbrand",
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          }
        ],
      },
      chartData4: {
        type:"formula",
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
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
      console.log(this.$refs.chartRef);
      const chart = this.$refs.chartRef.chart;
   
      this.elementAtEvent(getElementAtEvent(chart, event));
    
      //this.chartData=this.chartData2;
    },
    elementAtEvent(element: InteractionItem[]){
      if (!element.length) return;
      const { datasetIndex, index } = element[0];
      console.log(
        'element',
        this.chartData.type,
        this.chartData.labels[index],
        this.chartData.datasets[datasetIndex].data[index]
      );
      
      if(this.chartData.type == "species")
        this.chartData=this.chartData2;
      else if(this.chartData.type == "brand")
        this.chartData=this.chartData3;
      else if(this.chartData.type == "subbrand")
        this.chartData=this.chartData4;
          

      
    },

  }
}
</script>
