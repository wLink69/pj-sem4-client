<template>
  	<div class="admin-create">
		<h4 class="pt-3 pb-2 create-title">Create</h4>
    <select v-model="createSelect" class="create-select">
      <option value="car">Car</option>
      <option value="tour">Tour</option>
    </select>
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
            <option disabled selected value="">Choose</option>
            <option v-for="(type, index) in tourTypes" v-bind:key="index" :value="type.id">{{type.name}}</option>
          </select>
        </div>
      </div>
      <input style="width: 100px" type="button" v-on:click="createTour" class="btn btn-primary" value="Submit">
    </form>
	</div>
</template>

<style lang="less" scoped>
  .create-title {
    display: inline-block;
    margin-right: 5px;
  }
  .create-select {
    font-size: 16px;
  }
  .create-form {
    padding: 30px;
    box-shadow: 1px 1px 10px #dddada;
  }
</style>

<script>
export default {
  data: function() {
    return {
      createSelect: 'car',
      modelCars: [
        {
          id: '',
          name: ''
        }
      ],
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
      config: {
				headers: {
          'Content-Type': 'application/json',
          Authorization: '',
				}
			},
    }
  },
  created: function(){
    if (this.$route.params.id == undefined) {
      this.$router.push("/admin/create/car");
    } else {
      this.createSelect = this.$route.params.id;
    }
    axios.get(this.baseUrl + '/api/model-car/getAll')
    .then((response) => {
      this.modelCars = response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    axios.get(this.baseUrl + '/api/tourType/getAll')
    .then((response) => {
      this.tourTypes = response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  methods: {
    createCar: function() {
      this.car.driver = parseInt(this.car.driver);
      this.car.airConditioner = parseInt(this.car.airConditioner);
      this.config.headers.Authorization = 'Bearer ' + this.token;
      axios.post(this.baseUrl + '/api/car/create', JSON.stringify(this.car), this.config)
			.then(function (response) {
        alert('ok');
        document.getElementsByClassName('create-form')[0].reset();
			})
			.catch(function (error) {
				console.log(error);
			});
    },
    createTour: function() {
      this.config.headers.Authorization = 'Bearer ' + this.token;
      axios.post(this.baseUrl + '/api/tour/create', JSON.stringify(this.tour), this.config)
			.then(function (response) {
        alert('ok');
        document.getElementsByClassName('create-form')[0].reset();
			})
			.catch(function (error) {
				console.log(error);
			});
    }
  },
  watch: {
    createSelect: function() {
      this.$router.push("/admin/create/" + this.createSelect).catch(err => {});
    }
  }
}
</script>