<template>
  	<div class="admin-create">
		<h4 class="pt-3">Create</h4>
		<form class="pr-4">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="name">Name</label>
          <input v-model="car.name" type="text" class="form-control" id="name" placeholder="Name">
        </div>
        <div class="form-group col-md-6">
          <label for="price">Price ($)</label>
          <input v-model="car.price" type="text" class="form-control" id="price" placeholder="Price">
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
            <option v-for="model in modelCars" :value="model.id">{{model.name}}</option>
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
	</div>
</template>

<script>
export default {
  data: function() {
    return {
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
      config: {
				headers: {
					'Content-Type': 'application/json',
				}
			},
    }
  },
  created: function(){
    axios.get('http://b78cb52b.ngrok.io/api/model-car/getAll')
    .then((response) => {
      this.modelCars = response.data.content;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  },
  methods: {
    createCar: function() {
      this.car.driver = parseInt(this.car.driver);
      this.car.airConditioner = parseInt(this.car.airConditioner);
      axios.post('http://b78cb52b.ngrok.io/api/car/create', JSON.stringify(this.car), this.config)
			.then(function (response) {
				console.log(response);
				alert('ok')
			})
			.catch(function (error) {
				console.log(error);
			});
    }
  }
}
</script>