<template>
	<div class="car">
		<div class="hero-wrap js-fullheight" style="background-image: url('car.jpg');">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
          <div class="col-md-9 ftco-animate text-center" data-scrollax=" properties: { translateY: '70%' }">
            <p class="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span class="mr-2"><a href="/">Home</a></span> <span>Car</span></p>
            <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Car</h1>
          </div>
        </div>
      </div>
    </div>

    <section class="ftco-section ftco-degree-bg">
		<div class="container">
			<div class="row">
				<div class="col-lg-3 sidebar ftco-animate">
					<div class="sidebar-wrap bg-light ftco-animate">
						<h3 class="heading mb-4">Find Tour</h3>
						<form action="#">
						<div class="fields">
						<div class="form-group">
							<input v-model="name" type="text" class="form-control" placeholder="Car name">
						</div>
						<div class="form-group">
							<div class="select-wrap one-third">
								<div class="icon"><span class="ion-ios-arrow-down"></span></div>
								<select v-model="carModel" name="" id="" class="form-control" placeholder="Keyword search">
									<option selected disabled value="">Select CarModel</option>
									<option v-for="(type, index) in carModels" v-bind:key="index" :value="type.id">{{type.name}}</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<input v-model="priceMin" type="number" class="form-control" placeholder="Price from">
						</div>
						<div class="form-group">
							<input v-model="priceMax" type="number" class="form-control" placeholder="Price to">
						</div>
						<div class="form-group">
							<input v-on:click="doSearch" type="button" value="Search" class="btn btn-primary py-3 px-5">
						</div>
						</div>
					</form>
					</div>
					<div class="sidebar-wrap bg-light ftco-animate">
						<h3 class="heading mb-4">Star Rating</h3>
						<form method="post" class="star-rating">
							<div class="form-check">
								<input type="checkbox" class="form-check-input" id="exampleCheck1">
								<label class="form-check-label" for="exampleCheck1">
									<p class="rate"><span><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i></span></p>
								</label>
							</div>
							<div class="form-check">
							<input type="checkbox" class="form-check-input" id="exampleCheck1">
							<label class="form-check-label" for="exampleCheck1">
								<p class="rate"><span><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-o"></i></span></p>
							</label>
							</div>
							<div class="form-check">
							<input type="checkbox" class="form-check-input" id="exampleCheck1">
							<label class="form-check-label" for="exampleCheck1">
								<p class="rate"><span><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-o"></i><i class="icon-star-o"></i></span></p>
							</label>
							</div>
							<div class="form-check">
								<input type="checkbox" class="form-check-input" id="exampleCheck1">
							<label class="form-check-label" for="exampleCheck1">
								<p class="rate"><span><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star-o"></i><i class="icon-star-o"></i><i class="icon-star-o"></i></span></p>
							</label>
							</div>
							<div class="form-check">
							<input type="checkbox" class="form-check-input" id="exampleCheck1">
							<label class="form-check-label" for="exampleCheck1">
								<p class="rate"><span><i class="icon-star"></i><i class="icon-star-o"></i><i class="icon-star-o"></i><i class="icon-star-o"></i><i class="icon-star-o"></i></span></p>
								</label>
							</div>
						</form>
					</div>
				</div>
				<div class="col-lg-9">
					<div class="row">
						<div v-for="(car, index) in cars" v-bind:key="index" class="col-md-4 ftco-animate fadeInUp ftco-animated">
							<div class="destination">
								<a :href="'/car/' + car.id" class="img img-2 d-flex justify-content-center align-items-center" v-bind:style="'background-image: url(' + car.image + ')'">
									<div class="icon d-flex justify-content-center align-items-center">
										<span class="icon-search2"></span>
									</div>
								</a>
								<div class="text p-3">
									<div class="d-flex">
										<div class="one">
											<h3><a :href="'/car/' + car.id">{{car.name}}</a></h3>
											<p class="rate">
												<i class="icon-star"></i>
												<i class="icon-star"></i>
												<i class="icon-star"></i>
												<i class="icon-star"></i>
												<i class="icon-star-o"></i>
												<span>8 Rating</span>
											</p>
										</div>
										<div class="two">
											<span class="price">${{car.price}}</span>
										</div>
									</div>
									<p><b>Seating: </b> {{car.seatingCapacity}}</p>
									<p><b>Driver: </b> {{car.driver==1 ? 'available' : 'none'}}</p>
									<p><b>Air Conditioner: </b> {{car.airConditioner ? 'available' : 'none'}}</p>
									<p class="days"><span>{{car.size}}</span></p>
									<hr>
									<p class="bottom-area d-flex">
										<span><i class="far fa-check-circle"></i> Qualified</span> 
										<span class="ml-auto"><a :href="'/car/' + car.id">Book now</a></span>
									</p>
								</div>
							</div>
						</div>
					</div>
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
				</div> <!-- .col-md-8 -->
			</div>
		</div>
		</section>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			cars: [
				{
					name: '',
					size: '',
					seatingCapacity: '',
					driver: 1,
					airConditioner: 1,
					price: '',
					image: '',
					model: 1
				}
			],
			carModels: [
				{
					id: '',
					name: ''
				}
			],
			carModel: '',
			name: '',
			priceMin: '',
			priceMax: '',
			page: 0,
			totalPages: '',
			totalItems: '',
		}
	},
	methods: {
		doSearch: function() {
			var name = 'name=' + this.name;
			var priceMin;
			this.priceMin != '' ? priceMin = 'priceMin=' + this.priceMin : priceMin = '';
			var priceMax;
			this.priceMax != '' ? priceMax = 'priceMax=' + this.priceMax : priceMax = '';
			axios.get(this.baseUrl + '/api/car/search-test?page=1&limit=6&' + name + '&' + priceMin + '&' + priceMax)
			.then((response) => {
				this.tours = response.data.data;
				this.totalPages = response.data.pagination.totalPages;
				this.totalItems = response.data.pagination.totalItems;
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	},
	created: function() {
		axios.get(this.baseUrl + '/api/car/getAll?page=0&limit=6')
		.then((response) => {
			this.cars = response.data.data;
			this.totalPages = response.data.pagination.totalPages;
			this.totalItems = response.data.pagination.totalItems;
		})
		.catch(function (error) {
			console.log(error);
		});

		axios.get(this.baseUrl + '/api/model-car/getAll')
		.then((response) => {
			this.carModels = response.data.data;
		})
		.catch(function (error) {
			console.log(error);
		});
	},
	watch: {
		page: function() {
			if (this.name!='' || this.priceMin!='' || this.priceMax!='') {
				var location = 'location=' + this.location;
				var title = 'title=' + this.title;
				var priceMin = 'priceMin=' + this.priceMin;
				var priceMax = 'priceMax=' + this.priceMax;
				axios.get(this.baseUrl + '/api/car/search-test?page=' + this.page + '&limit=6&' + location + '&' + title  + '&' + priceMin + '&' + priceMax)
				.then((response) => {
					this.cars = response.data.data;
					this.totalPages = response.data.pagination.totalPages;
					this.totalItems = response.data.pagination.totalItems;
				})
				.catch(function (error) {
					console.log(error);
				});
			} else if (this.carModel != '') {
				axios.get(this.baseUrl + '/api/car/model-car/' + this.carModel + '?page=' + this.page + '&limit=6')
				.then((response) => {
					this.carModels = response.data.data;
					this.totalPages = response.data.pagination.totalPages;
					this.totalItems = response.data.pagination.totalItems;
				})
				.catch(function (error) {
					console.log(error);
				});
			} else {
				axios.get(this.baseUrl + '/api/car/getAll?page=' + this.page + '&limit=6')
				.then((response) => {
					this.cars = response.data.data;
					this.totalPages = response.data.pagination.totalPages;
					this.totalItems = response.data.pagination.totalItems;
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		},

		carModel: function() {
			axios.get(this.baseUrl + '/api/car/model/' + this.carModel + '?page=0&limit=6')
			.then((response) => {
				this.cars = response.data.data;
				this.totalPages = response.data.pagination.totalPages;
				this.totalItems = response.data.pagination.totalItems;
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	},
}
</script>