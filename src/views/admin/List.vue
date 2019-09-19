<template>
  	<div class="admin-list">
		<h4 class="pt-3 pb-2 list-title">List</h4>
		<select v-model="listSelect" class="list-select">
			<option value="car">Car</option>
			<option value="tour">Tour</option>
			<option value="flight">Flight</option>
		</select>
		<table v-if="$route.params.id == 'car'" class="table table-hover text-center" cellpadding="10">
		<thead>
			<tr>
			<th scope="col">#</th>
			<th scope="col">Name</th>
			<th scope="col">Model</th>
			<th scope="col">Size</th>
			<th scope="col">Seat</th>
			<th scope="col">Air-conditioner</th>
			<th scope="col">Driver</th>
			<th scope="col">Price($)</th>
			<th scope="col">Action</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(car, index) in cars" v-bind:key="index">
			<th scope="row">{{index + 1}}</th>
			<td>{{car.name}}</td>
			<td>{{car.model}}</td>
			<td>{{car.size}}</td>
			<td>{{car.seatingCapacity}}</td>
			<td>{{car.airConditioner == 1 ? 'required' : 'not required'}}</td>
			<td>{{car.driver == 1 ? 'required' : 'not required'}}</td>
			<td>{{car.price}}</td>
			<td><router-link style="color: #007bff" v-bind:to="'/admin/edit/car/' + car.id">Edit</router-link><span> / </span><a href="#">Delete</a></td>
			</tr>
		</tbody>
		</table>

		<table v-if="$route.params.id == 'tour'" class="table table-hover text-center" cellpadding="10">
		<thead>
			<tr>
			<th scope="col">#</th>
			<th scope="col">Title</th>
			<th scope="col">Arrangements</th>
			<th scope="col">Food</th>
			<th scope="col">Type</th>
			<th scope="col">Location</th>
			<th scope="col">Hotel</th>
			<th scope="col">Flight</th>
			<th scope="col">Price($)</th>
			<th scope="col">Action</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(tour, index) in tours" v-bind:key="index">
			<th scope="row">{{index + 1}}</th>
			<td>{{tour.title}}</td>
			<td>{{tour.arrangements}}</td>
			<td>{{tour.food}}</td>
			<td>{{tour.tourTypeName}}</td>
			<td>{{tour.location}}</td>
			<td>{{tour.hotel}}</td>
			<td>
				<a style="margin-right:15px;color:#007bff" href="#" v-for="(flight, index) in tour.flights" v-bind:key="index">{{flight.name}}</a>
			</td>
			<td>{{tour.price}}</td>
			<td><router-link style="color: #007bff" v-bind:to="'/admin/edit/tour/' + tour.id">Edit</router-link><span> / </span><a href="#">Delete</a></td>
			</tr>
		</tbody>
		</table>
	</div>
</template>

<style lang="less" scoped>
	.admin-list .table {
		box-shadow: 1px 1px 10px #dddada;
		padding: 0 10px;
	}
	.list-title {
    	display: inline-block;
    	margin-right: 5px;
	}
	.list-select {
		font-size: 16px;
	}
</style>

<script>
export default {
	data: function() {
		return {
			listSelect: 'car',
			cars: [
				{
					id: '',
					name: '',
					model: '',
					size: '',
					seatingCapacity: '',
					airConditioner: '',
					driver: '',
					price: ''
				}
			],
			tours: [
				{
					id: '',
					title: '',
					arrangements: '',
					food: '',
					tourType: '',
					tourTypeName: '',
					hotel: '',
					flights: [
						{
							id: '',
							brand: '',
							description: '',
							name: '',
							price: '',
							schedule: ''
						}
					],
					location: '',
					price: ''
				}
			]
		}
	},
	methods: {
		init: function(name) {
			axios.get(this.baseUrl + '/api/' + name + '/getAll')
			.then((response) => {
				switch (name) {
					case 'car':
						this.cars = response.data.data;
						break;
					case 'tour':
						this.tours = response.data.data;
						break;
				}			
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	},
	created: function() {
		if (this.$route.params.id == undefined) {
			this.$router.push("/admin/list/car");
		} else {
			this.listSelect = this.$route.params.id;
		}
		this.init(this.$route.params.id);
	},
	watch: {
		listSelect: function() {
			this.$router.push("/admin/list/" + this.listSelect).catch(err => {});
			this.init(this.listSelect);
		}
	}
}
</script>