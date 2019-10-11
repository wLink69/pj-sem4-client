<template>
  	<div class="dashboard">
		<h4 class="pt-3 pb-2">Dashboard</h4>

    <chart-bar :chart-data="datacollection"></chart-bar>

    <div class="mt-5 mb-5 row">
      <div class="col-md-4">
        <chart-pie :chart-data="dataPie"></chart-pie>
      </div>
      <div class="col-md-8">
        <table class="table table-hover text-center" cellpadding="10">
        <thead>
          <tr>
          <th scope="col">#</th>
          <th scope="col">Customer Name</th>
          <th scope="col">Tour Name</th>
          <th scope="col">Season</th>
          <th scope="col">Group Type</th>
          <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" v-bind:key="index">
            <th scope="row">{{index + 1}}</th>
            <td>{{order.userName}}</td>
            <td>{{order.tourName}}</td>
            <td>{{order.season}}</td>
            <td>{{order.groupTypeName}}</td>
            <td v-if="order.status == 0"><span style="color:red">Pending</span></td>
            <td v-if="order.status == 2"><span style="color:#008a00">Done</span></td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
	</div>
</template>

<script>
    import ChartBar from "../../assets/chart/chartBar.js";
    import ChartPie from "../../assets/chart/chartPie.js";

    export default {
      components: {
        ChartBar, ChartPie
      },
      data() {
        return {
          loaded: false,
          datacollection: null,
          tourData: null,
          dataPie: null,
          orders: [
            {
              userName: '',
              tourName: '',
              groupTypeName: '',
              season: '',
              status: ''
            }
          ],
          config: {
            headers: {
              Authorization: ''
            }
          },
        };
      },
      mounted() {
        this.loaded = false;
      },
      created: function() {
        this.config.headers.Authorization = 'Bearer ' + this.token;
        axios.get(this.baseUrl + '/api/orderTour/success-payment?year=2019', this.config)
        .then((response) => {
          this.tourData = response.data.data;
          this.fillData();
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get(this.baseUrl + '/api/orderTour/getAll', this.config)
        .then((response) => {
          this.orders = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      methods: {
        fillData() {
          this.datacollection = {
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ],
            datasets: [
              {
                label: "Tour Incomes",
                backgroundColor: "#f87979",
                data: []
              },
              {
                label: "Car Incomes",
                backgroundColor: "#A5CC82",
                data: [205, 408, 188, 190, 58, 200, 190, 400, 164, 254, 290, 201]
              }
            ]
          };
          if (this.tourData!=null) {
            for (var key in this.tourData) {
                if (this.tourData.hasOwnProperty(key)) {
                  this.datacollection.datasets[0].data.push(this.tourData[key]);
                }
            }
          }

          this.dataPie = {
            labels: ["Tour Incomes", "Car Incomes"],
            datasets: [
              {
                label: "Incomes percentage",
                backgroundColor: ["#41B883", "#E46651"],
                data: [10, 6]
              }
            ]
          }
        },
      }
    };
</script>
