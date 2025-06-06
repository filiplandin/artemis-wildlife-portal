<template>
      <div class="chartBox" >
        <Scatter v-if="showgraph" :data=chartData :options=options ></Scatter>
      </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "vue-chartjs";
import animalData from "../json_files/total_population.json";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default {
  name: "ScatterChart",
  props: {
    animalLatinName: {
      type: String,
      required: true,
    },
  },
  watch: {
    animalLatinName: {
      handler() {
        this.updateChart();
      },
      immediate: true,
    },
  },
  components: {
    Scatter,
  },
  data() {
    return {
        showgraph: false,
      chartData: {
        datasets: [
          {
            label: "",
            fill: false,
            borderColor: "#f87979",
            backgroundColor: "#f87979",
            showLine: true,
            data: [
            ],
          },
        ],
      },
      options: {
            responsive: true,
    maintainAspectRatio: true
        }
    };
  },
  methods: {
    printStats() {
      console.log(this.chartData.datasets[0].data);
    },
    updateChart() {
        this.showgraph = false;
        this.chartData.datasets[0].data = [];
        this.chartData.datasets[0].label = this.animalLatinName;
        if (this.animalLatinName == "") {
            return;
        }
        const latinName = this.animalLatinName;
        // array with years from 1960 to 2020
        const years = [...Array(61).keys()].map((i) => i + 1960);
        var tempdata = [{}];
        for (let i = 0; i < animalData.length; i++) {
        if(animalData[i].common_name == latinName) {
          for (let j = 0; j < animalData[i].data.population.length; j++) {
            this.chartData.datasets[0].data.push({x: animalData[i].data.years[j], y: animalData[i].data.population[j]});
            console.log(animalData[i].data.years[j]);
          }
        }
      };
      console.log(this.chartData.datasets[0].data);

      //this.chartData.datasets[0].data = tempdata;
      // There is still a bug where some of the valuse seem to bew rittern in different formats
      // e.g. "1,000" and "1000" with makes the graph look weird
      
      this.showgraph = true;
    },
  },
};
</script>

<style scoped>

.chartBox {
  /* width: 700px; */
  padding: 20px;
  border-radius: 20px;
  border: solid 3px #9bd4c0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>