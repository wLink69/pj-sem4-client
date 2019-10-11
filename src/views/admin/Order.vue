<template>
	<div class="order-list">
		<h4 class="pt-3 pb-2">Order</h4>
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
	.order-list .table {
		box-shadow: 1px 1px 10px #dddada;
		padding: 0 10px;
	}
</style>

<script>
export default {
	data: function() {
		return {
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
					Authorization: '',
				}
			},
			page: 0,
			totalPages: '',
			totalItems: '',
		}
	},
	created: function() {
		this.config.headers.Authorization = 'Bearer ' + this.token;
		axios.get(this.baseUrl + '/api/orderTour/getAll?page=0&limit=5', this.config)
		.then((response) => {
			this.orders = response.data.data;
			this.totalPages = response.data.pagination.totalPages;
			this.totalItems = response.data.pagination.totalItems;
		})
		.catch(function (error) {
			console.log(error);
		});
	},
	watch: {
		page: function() {
			axios.get(this.baseUrl + '/api/orderTour/getAll?page=' + this.page + '&limit=5', this.config)
			.then((response) => {
				this.orders = response.data.data;
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