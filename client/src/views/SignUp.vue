<template>
  <section>

<div class="container">
      <div class="row justify-content-md-center">
        <div class="col-lg-5 col-md-6 col-sm-9 col-xs-12">
  <div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-heading">
        <br>
				<h2 class="text-center">Signup</h2>
			</div>
			<hr />
			<div class="modal-body">
				<b-alert variant ="danger" show v-if="error" >
        {{ error}} 
        </b-alert>

      <b-form @submit.prevent="signup">
      
          <b-form-group label="Enter your name">
          <b-form-input v-model="name"></b-form-input>
          </b-form-group>

          <b-form-group label="Enter your family name">
          <b-form-input v-model="familyName"></b-form-input>
          </b-form-group>

          <b-form-group label="Role:">
          <b-form-select required v-model="role">
              <option>Select option</option>
              <option>client</option>
              <option>manager</option>
          </b-form-select>
        </b-form-group>

        <b-form-group label="Enter your username" :invalid-feedback="invalidFeedback" :message="usernameError">
          <div class="input-group mb-3">
          <b-form-input v-model="username"></b-form-input>
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon1">
              <span class="oi oi-person"></span>
            </span>
          </div>
          </div>
          </b-form-group>

        <b-form-group label="Enter your password">
           <div class="input-group mb-3">
          <b-form-input type="password" v-model="password" required password-reveal></b-form-input>
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon1">
              <span class="oi oi-lock-locked"></span>
            </span>
          </div>
          </div>
          </b-form-group>
           <br>

        <div class="row justify-content-md-center">
        <b-button type="submit" variant="dark">Signup</b-button>
        </div>
           <br>
            <br>
    </b-form>
    <!--       
  password reveal 
  icons -->
   
			</div>
		</div>

    
	</div>



  </div>

  </div>

  
</div>
<div class="text-center">
Already regitered?
 <router-link to="/login">Login</router-link>
 </div>

  </section>
</template>

<script>
import { signup } from "../api";

export default {
  data() {
    return {
      name: "",
      familyName: "",
      role: "",
      username: "",
      password: "",
      error: null
    };
  },
  methods: {
    signup() {
      this.error = null;
      signup({
        name: this.name,
        familyName: this.familyName,
        role: this.role,
        username: this.username,
        password: this.password
      })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  computed: {
    usernameError() {
      if (!this.error) return null;
      if (this.error.name === "UserExistsError") {
        return this.error.message;
      }
    },
    invalidFeedback() {
      if (this.username.length > 0) {
        return "Please enter at least 4 characters";
      } else if (this.error > 0) {
        return "error";
      }
    }
  }
};
</script>

<style>
.modal-dialog {
  min-width: 200px;
}
</style>

