<template>
  	<div class="admin-list">
		<h4 class="pt-3 pb-2 list-title">List</h4>
		<select v-model="listSelect" class="list-select">
			<option value="car">Car</option>
			<option value="tour">Tour</option>
			<option value="flight">Flight</option>
			<option value="hotel">Hotel</option>
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
			<td><router-link style="color: #007bff" v-bind:to="'/admin/edit/car/' + car.id">Edit</router-link><span> / </span><a href="javascript:void(0)" v-on:click="del(car.id, 'car')">Delete</a></td>
			</tr>
		</tbody>
		</table>

		<table v-if="$route.params.id == 'tour'" class="table table-hover text-center" cellpadding="10">
		<thead>
			<tr>
			<th scope="col">#</th>
			<th scope="col">Title</th>
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
			<td>{{tour.food}}</td>
			<td>{{tour.tourTypeName}}</td>
			<td>{{tour.location}}</td>
			<td>
				<a style="margin-right:15px;color:#007bff" href="javascript:void(0)" v-for="(hotel, index) in tour.hotels" v-bind:key="index">{{hotel.name}}</a>
			</td>
			<td>
				<a style="margin-right:15px;color:#007bff" href="javascript:void(0)" v-for="(flight, index) in tour.flights" v-bind:key="index">{{flight.name}}</a>
			</td>
			<td>{{tour.price}}</td>
			<td><router-link style="color: #007bff" v-bind:to="'/admin/edit/tour/' + tour.id">Edit</router-link><span> / </span><a href="javascript:void(0)" v-on:click="del(tour.id, 'tour')">Delete</a></td>
			</tr>
		</tbody>
		</table>

		<table v-if="$route.params.id == 'flight'" class="table table-hover text-center" cellpadding="10">
		<thead>
			<tr>
			<th scope="col">#</th>
			<th scope="col">Name</th>
			<th scope="col">Brand</th>
			<th scope="col">Tour</th>
			<th scope="col">Description</th>
			<th scope="col">Price($)</th>
			<th scope="col">Action</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(flight, index) in flights" v-bind:key="index">
			<th scope="row">{{index + 1}}</th>
			<td>{{flight.name}}</td>
			<td>{{flight.brand}}</td>
			<td style="color:#007bff">{{flight.tourName}}</td>
			<td>{{flight.description}}</td>
			<td>{{flight.price}}</td>
			<td><router-link style="color: #007bff" v-bind:to="'/admin/edit/flight/' + flight.id">Edit</router-link><span> / </span><a href="javascript:void(0)" v-on:click="del(flight.id, 'flight')">Delete</a></td>
			</tr>
		</tbody>
		</table>

		<table v-if="$route.params.id == 'hotel'" class="table table-hover text-center" cellpadding="10">
		<thead>
			<tr>
			<th scope="col">#</th>
			<th scope="col">Name</th>
			<th scope="col">Tour</th>
			<th scope="col">Price($)</th>
			<th scope="col">Action</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(hotel, index) in hotels" v-bind:key="index">
			<th scope="row">{{index + 1}}</th>
			<td>{{hotel.name}}</td>
			<td style="color:#007bff">{{hotel.tourName}}</td>
			<td>{{hotel.price}}</td>
			<td><router-link style="color: #007bff" v-bind:to="'/admin/edit/hotel/' + hotel.id">Edit</router-link><span> / </span><a href="javascript:void(0)" v-on:click="del(hotel.id, 'hotel')">Delete</a></td>
			</tr>
		</tbody>
		</table>

		<div class="row mt-5">
			<div class="col text-center">
				<div class="block-27">
				<ul>
					<li v-if="page > 0"><a href="javascript:void(0)">&lt;</a></li>
					<li v-bind:class="{'active' : page==n-1}" v-for="n in totalPages" v-bind:key="n">
						<a v-on:click="page=n-1" href="javascript:void(0)">{{n}}</a>
					</li>
					<li v-if="page < totalPages-1"><a href="javascript:void(0)">&gt;</a></li>
				</ul>
				</div>
			</div>
		</div>
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
							name: '',
						}
					],
					hotels: [
						{
							id: '',
							name: ''
						}
					],
					location: '',
					price: ''
				}
			],
			flights: [
				{
					id: '',
					brand: '',
					description: '',
					name: '',
					price: '',
					tourName: '',
					tourId: '',
					schedule: ''
				}
			],
			hotels: [
				{
					id: '',
					name: '',
					price: '',
					service: '',
					image: '',
					tourName: '',
					tourId: ''
				}
			],
			config: {
				headers: {
					Authorization: '',
				}
			},
			page: 0,
			totalPages: '',
			totalItems: '',
		}
	},
	methods: {
		init: function(name) {
			axios.get(this.baseUrl + '/api/' + name + '/getAll')
			.then((response) => {
				console.log(response)
				this.totalPages = response.data.pagination.totalPages;
				this.totalItems = response.data.pagination.totalItems;
				switch (name) {
					case 'car':
						this.cars = response.data.data;
						break;
					case 'tour':
						this.tours = response.data.data;
						break;
					case 'flight':
						this.flights = response.data.data;
						break;
					case 'hotel':
						this.hotels = response.data.data;
						break;
				}			
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		del: function(id, item) {
			this.$swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
				}).then((result) => {
				if (result.value) {
					this.config.headers.Authorization = 'Bearer ' + this.token;
					axios.delete(this.baseUrl + '/api/' + item + '/' + id, this.config, {data: {dt:''}})
					.then((response) => {
						this.$swal.fire(
							'Deleted!',
							'Your ' + item + ' has been deleted.',
							'success'
						).then(() =>{
							location.href = "/admin/list/" + this.$route.params.id
						})
					})
					.catch((error) => {
						this.$swal.fire({
							type: 'error',
							title: 'Oops...',
							text: 'Something went wrong!'
						})
					});
				}
			})
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
		},
		page: function() {
			axios.get(this.baseUrl + '/api/' + this.$route.params.id + '/getAll?page=' + this.page, this.config)
			.then((response) => {
				this.cars = this.tours = this.flights = this.hotels = response.data.data;
				this.totalPages = response.data.pagination.totalPages;
				this.totalItems = response.data.pagination.totalItems;
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}
}
</script>