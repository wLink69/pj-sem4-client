<template>
  	<div class="admin-create">
		<h4 class="pt-3 pb-2 create-title">Create</h4>
    <select v-model="createSelect" class="create-select">
      <option value="car">Car</option>
      <option value="tour">Tour</option>
      <option value="hotel">Hotel</option>
      <option value="flight">Flight</option>
    </select>
    <!-- car -->
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
    <!-- tour -->
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
          <label for="localTravel">Local Travel</label>
          <input v-model="tour.location" type="text" class="form-control" id="localTravel" placeholder="Local travel">
        </div>
        <div class="form-group col-md-6">
          <label for="food">Food</label>
          <input v-model="tour.food" type="text" class="form-control" id="food" placeholder="Food">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-5">
           <label for="image">Image</label>
          <input v-model="tour.image" type="text" class="form-control" id="image" placeholder="Image">
        </div>
        <div class="form-group col-md-4">
           <label for="duration">Duration</label>
          <input v-model="tour.duration" type="text" class="form-control" id="duration" placeholder="Duration">
        </div>
        <div class="form-group col-md-3">
          <label for="type">Tour Type</label>
          <select v-model="tour.tourType" class="form-control" id="type">
            <option disabled selected value="">Choose</option>
            <option v-for="(type, index) in tourTypes" v-bind:key="index" :value="type.id">{{type.name}}</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label>Tour Arrangements</label>
          <ckeditor :editor="editor" v-model="tour.arrangements"></ckeditor>
        </div>
      </div>
      <input style="width: 100px" type="button" v-on:click="createTour" class="btn btn-primary" value="Submit">
    </form>
    <!-- hotel -->
    <form v-if="$route.params.id == 'hotel'" class="create-form">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="name">Name</label>
          <input v-model="hotel.name" type="text" class="form-control" id="name" placeholder="Name">
        </div>
        <div class="form-group col-md-6">
          <label for="price">Price ($)</label>
          <input v-model="hotel.price" type="number" class="form-control" id="price" placeholder="Price">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
           <label for="image">Image</label>
          <input v-model="hotel.image" type="text" class="form-control" id="image" placeholder="Image">
        </div>
        <div class="form-group col-md-6">
          <label for="tour">Tour</label>
          <input v-model="hotel.tourId" placeholder="Select a tour" class="form-control" id="tour" list="brow">
          <datalist id="brow">
            <option v-for="(t,index) in tours" v-bind:key="index" :value="t.id">{{t.title}}</option>
          </datalist>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label>Hotel Services</label>
          <ckeditor :editor="editor" v-model="hotel.service"></ckeditor>
        </div>
      </div>
      <input style="width: 100px" type="button" v-on:click="createHotel" class="btn btn-primary" value="Submit">
    </form>
    <!-- flight -->
    <form v-if="$route.params.id == 'flight'" class="create-form">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="name">Name</label>
          <input v-model="flight.name" type="text" class="form-control" id="name" placeholder="Name">
        </div>
        <div class="form-group col-md-6">
          <label for="price">Price ($)</label>
          <input v-model="flight.price" type="number" class="form-control" id="price" placeholder="Price">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
           <label for="image">Image</label>
          <input v-model="flight.image" type="text" class="form-control" id="image" placeholder="Image">
        </div>
        <div class="form-group col-md-6">
          <label for="tour">Tour</label>
          <input v-model="flight.tour" placeholder="Select a tour" class="form-control" id="tour" list="brow">
          <datalist id="brow">
            <option v-for="(t,index) in tours" v-bind:key="index" :value="t.id">{{t.title}}</option>
          </datalist>  
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="description">Description</label>
          <input v-model="flight.description" type="text" class="form-control" id="description" placeholder="Description">
        </div>
        <div class="form-group col-md-6">
          <label for="brand">Brand</label>
          <input v-model="flight.brand" type="text" class="form-control" id="brand" placeholder="Brand">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label>Schedule</label>
          <ckeditor :editor="editor" v-model="flight.schedule"></ckeditor>
        </div>
      </div>
      <input style="width: 100px" type="button" v-on:click="createFlight" class="btn btn-primary" value="Submit">
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
    margin-bottom: 30px;
  }
</style>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
        price: '',
        duration: '',
        image: ''
      },
      tours: [
        {
          id: '',
          title: ''
        }
      ],
      hotel: {
        name: '',
        price: '',
        service: '',
        image: '',
        tourId: ''
      },
      flight: {
        name: '',
        price: '',
        description: '',
        image: '',
        tour: '',
        brand: '',
        schedule: '',
      },
      config: {
				headers: {
          'Content-Type': 'application/json',
          Authorization: '',
				}
      },
      editor: ClassicEditor,
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
    axios.get(this.baseUrl + '/api/tour/getAll-test')
    .then((response) => {
      this.tours = response.data.data;
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
        alert('fail');
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
        alert('fail');
				console.log(error);
			});
    },
    createHotel: function() {
      this.config.headers.Authorization = 'Bearer ' + this.token;
      console.log(this.hotel);
      axios.post(this.baseUrl + '/api/hotel/create', JSON.stringify(this.hotel), this.config)
			.then(function (response) {
        alert('ok');
        document.getElementsByClassName('create-form')[0].reset();
			})
			.catch(function (error) {
        alert('fail');
				console.log(error);
			});
    },
    createFlight: function() {
      this.config.headers.Authorization = 'Bearer ' + this.token;
      console.log(this.flight);
      axios.post(this.baseUrl + '/api/flight/create', JSON.stringify(this.flight), this.config)
			.then(function (response) {
        alert('ok');
        document.getElementsByClassName('create-form')[0].reset();
			})
			.catch(function (error) {
        alert('fail');
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