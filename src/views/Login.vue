<template>
  	<div class="login">
		  <div class="hero-wrap" style="background-image: url('/log4.jpg'); height: 100px;">
		  	<div class="overlay"></div>
		  </div>
		<h4 class="text-center mt-5">Login</h4>
		<form class="mt-2 mb-5">
			<div class="form-group">
				<label for="username">Username</label>
				<input v-model="loginData.username" type="text" class="form-control" id="username" placeholder="Enter username">
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">Password</label>
				<input v-model="loginData.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
			</div>
			<div class="form-check text-center">
				<input type="checkbox" class="form-check-input" id="exampleCheck1">
				<label class="form-check-label" for="exampleCheck1">Check me out</label>
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
		}
	},
	methods: {
		login: function() {
			axios.post('http://b78cb52b.ngrok.io/auth/login', JSON.stringify(this.loginData), this.config)
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