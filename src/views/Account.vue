<template>
	<div class="my-account">
		<div class="hero-wrap" style="background-image: url('/acc.jpg'); height: 150px;"></div>
		<h4 class="text-center mt-5 mb-5">My Account</h4>
		<div class="acc-wrapper">
			<button v-on:click="tab=1" class="acc-tab" v-bind:class="{'active' : tab==1}">My Info</button>
			<button v-on:click="tab=2" class="acc-tab" v-bind:class="{'active' : tab==2}">My Orders</button>
			<div v-if="tab==1" class="mt-5 mb-5">
				<h4 class="mb-3">My Information</h4>
				<p>Username: {{user.username}}</p>
				<p>First name: {{user.firstName}}</p>
				<p>Last name: {{user.lastName}}</p>
				<p>Email: {{user.email}}</p>
				<p>Phone number: {{user.phoneNumber}}</p>
				<a href="#" class="edit-pro">Edit Profile</a>
			</div>
			<div v-if="tab==2" class="mt-5 mb-5">
				<h4 class="mb-3">My Order</h4>
				<table class="table table-hover text-center" cellpadding="10">
				<thead>
					<tr>
					<th scope="col">#</th>
					<th scope="col">Customer Name</th>
					<th scope="col">Tour Name</th>
					<th scope="col">Season</th>
					<th scope="col">Group Type</th>
					<th scope="col">Date</th>
					<th scope="col">Price($)</th>
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
						<td>{{new Date(order.date).toLocaleDateString()}}</td>
						<td>{{order.price}}</td>
						<td v-if="order.status == 0"><span style="color:red">Pending</span></td>
						<td v-if="order.status == 2"><span style="color:#008a00">Done</span></td>
					</tr>
				</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.acc-wrapper {
		width: 60%;
		margin: auto;
		.acc-tab {
			padding: 5px 0;
			margin-right: 10px;
			width: 200px;
			font-size: 18px;
			color: rgb(183, 226, 247);;
			background: transparent;
			border: 2px solid rgb(183, 226, 247);
			cursor: pointer;
			&.active {
				color: rgb(11, 157, 224);
				border-color:rgb(3, 196, 255);
				border-bottom-color: rgb(183, 226, 247);
			}
			&:focus {
				outline: none;
			}
		}
		p {
			font-size: 16px;
		}
		.edit-pro {
			font-size: 16px;
		}
	}
</style>

<script>
export default {
	data: function() {
		return {
			config: {
				headers: {
					Authorization: '',
				}
			},
			tab: 1,
			user: {
				username: '',
				firstName: '',
				lastName: '',
				email: '',
				phoneNumber: '',
			},
			orders: [
				{
					userName: '',
					tourName: '',
					groupTypeName: '',
					season: '',
					status: '',
					price: '',
					date: ''
				}
			]
		}
	},
	created: function() {
		var body = document.body; // For Safari
		var html = document.documentElement; // Chrome, Firefox, IE and Opera 
		body.scrollTop = 0; 
		html.scrollTop = 0;
		
		this.config.headers.Authorization = 'Bearer ' + this.token;
		axios.get(this.baseUrl + '/api/user', this.config)
		.then((response) => {
			this.user = response.data.data;
		})
		.catch(function (error) {
			console.log(error);
		});

		axios.get(this.baseUrl + '/api/orderTour/getOrderByUser', this.config)
		.then((response) => {
			this.orders = response.data.data;
		})
		.catch(function (error) {
			console.log(error);
		});
	},
	methods: {
		changeTab: function(e) {
			e.preventDefault();
		}
	}
}
</script>