<template>
  	<div class="login">
		  <div class="hero-wrap" style="background-image: url('/log4.jpg'); height: 100px;">
		  	<div class="overlay"></div>
		  </div>
		<h4 class="text-center mt-5">Login</h4>
		<div class="alert alert-danger mb-3" style="width:40%; margin:auto" v-if="errors.length">
			<li v-for="(error,index) in errors" v-bind:key="index">{{ error }}</li>
		</div>
		<form class="mt-2 mb-5">
			<div class="form-group">
				<label for="username">Username</label>
				<input v-model="loginData.username" type="text" class="form-control" id="username" placeholder="Enter username">
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">Password</label>
				<input v-model="loginData.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
			</div>
			<div class="form-group text-center">
				<input type="button" v-on:click="login" class="submit-btn btn btn-primary mt-2" value="Submit">
			</div>
		</form>
	</div>
</template>

<style lang="less">
	.login {
		h4 {
			font-family: "Rubik", sans-serif;
		}
		form {
			width: 40%;
			margin: auto;
			.submit-btn {
				width: 200px;
			}
		}
	}
</style>

<script>
export default {
	data: function() {
		return {
			loginData: {
				username: '',
				password: ''
			},
			config: {
				headers: {
					'Content-Type': 'application/json',
				}
			},
			errors: [],
		}
	},
	methods: {
		login: function() {
			this.errors = [];
			if (!this.loginData.username) {
				this.errors.push('Username required.');
			}
			if (!this.loginData.password) {
				this.errors.push('Password required.');
			}
			if (this.loginData.username && this.loginData.password) {
				axios.post(this.baseUrl + '/auth/login', JSON.stringify(this.loginData), this.config)
				.then(function (response) {				
					document.cookie = "token=" + response.data.access_token;
					location.href = "/";
				})
				.catch((error) => {
					this.errors.push('Incorrect username or password.');
				});
			}
		}
	},
	created: function() {
		var body = document.body; // For Safari
		var html = document.documentElement; // Chrome, Firefox, IE and Opera 
		body.scrollTop = 0; 
		html.scrollTop = 0;
	}
}
</script>