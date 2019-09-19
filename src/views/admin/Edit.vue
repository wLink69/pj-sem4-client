<template>
  	<div class="admin-create">
		<h4 class="pt-3 pb-2 create-title">Edit</h4>
		<form v-if="$route.params.id == 'car'" class="create-form">
			<div class="form-row">
				<div class="form-group col-md-6">
				<label for="name">Name</label>
				<input v-model="car.name" type="text" class="form-control" id="name" placeholder="Name">
				</div>
				<div class="form-group col-md-6">
				<label for="price">Price ($)</label>
				<input v-model="car.price" type="number" class="form-control" id="price" placeholder="Price">
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-md-6">
				<label for="size">Size</label>
				<input v-model="car.size" type="text" class="form-control" id="size" placeholder="Size">
				</div>
				<div class="form-group col-md-6">
				<label for="seatingCapacity">Seating Capacity</label>
				<input v-model="car.seatingCapacity" type="text" class="form-control" id="seatingCapacity" placeholder="Seating Capacity">
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-md-6">
				<label for="model">Model</label>
				<select v-model="car.model" class="form-control" id="model">
					<option v-for="(model, index) in modelCars" v-bind:key="index" :value="model.id">{{model.name}}</option>
				</select>
				</div>
				<div class="form-group col-md-3">
				<label for="air">Air-conditioner</label>
				<select v-model="car.airConditioner" class="form-control" id="air">
					<option value="1">Required</option>
					<option value="0">Not required</option>
				</select>
				</div>
				<div class="form-group col-md-3">
				<label for="driver">Driver</label>
				<select v-model="car.driver" class="form-control" id="driver">
					<option value="1">Required</option>
					<option value="0">Not required</option>
				</select>
				</div>
			</div>
			<input style="width: 100px" type="button" v-on:click="createCar" class="btn btn-primary" value="Submit">
		</form>

		<form v-if="$route.params.id == 'tour'" class="create-form">
		<div class="form-row">
			<div class="form-group col-md-6">
			<label for="title">Title</label>
			<input v-model="tour.title" type="text" class="form-control" id="title" placeholder="Title">
			</div>
			<div class="form-group col-md-6">
			<label for="price">Price ($)</label>
			<input v-model="tour.price" type="number" class="form-control" id="price" placeholder="Price">
			</div>
		</div>
		<div class="form-row">
			<div class="form-group col-md-6">
			<label for="arrangements">Touring Arrangements</label>
			<input v-model="tour.arrangements" type="text" class="form-control" id="arrangements" placeholder="Arrangements">
			</div>
			<div class="form-group col-md-6">
			<label for="food">Food</label>
			<input v-model="tour.food" type="text" class="form-control" id="food" placeholder="Food">
			</div>
		</div>
		<div class="form-row">
			<div class="form-group col-md-6">
			<label for="localTravel">Local Travel</label>
			<input v-model="tour.location" type="text" class="form-control" id="localTravel" placeholder="Local travel">
			</div>
			<div class="form-group col-md-6">
			<label for="type">Tour Type</label>
			<select v-model="tour.tourType" class="form-control" id="type">
				<option v-for="(type, index) in tourTypes" v-bind:key="index" :value="type.id">{{type.name}}</option>
			</select>
			</div>
		</div>
		<input style="width: 100px" type="button" class="btn btn-primary" value="Submit">
		</form>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			car: {
				name: '',
				size: '',
				seatingCapacity: '',
				driver: 1,
				airConditioner: 1,
				price: '',
				model: 1
			},
			tourTypes: [
				{
					id: '',
					name: ''
				}
			],
			tour: {
				title: '',
				arrangements: '',
				food: '',
				tourType: '',
				location: '',
				price: ''
			},
		}
	},
	created: function(){
		axios.get(this.baseUrl + '/api/' + this.$route.params.id + '/getOne/' + this.$route.params.edit_id, this.config)
		.then((response) => {
			console.log(response);
			this.tour = response.data.data;
		})
		.catch((error) => {
			console.log(error)
		});
		axios.get(this.baseUrl + '/api/tourType/getAll')
		.then((response) => {
			this.tourTypes = response.data.data;
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}
</script>