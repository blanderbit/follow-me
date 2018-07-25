<template >
    <div id="registration">
        <div class="haed" style="background-image: url('https://i.pinimg.com/736x/2c/ed/e5/2cede5989974e6ec49aafdd927dca41d--pastel-tumblr-backgrounds-backgrounds-phone.jpg')">
        <img src="src/assets/logo.png" id="logo" width="100px" height="100px">
        <div class="demo" >FOLLOW ME</div>
    </div>
        <form name="registration-form" style="margin-top: 20px;margin-bottom: 20px;"  class="registration-form" method="post">

            <div class="header">
                <h1>Registration</h1>
                <span>Your registration</span><br/><br/>
            </div>

            <div class="content">
                <label>Enter your nickname</label><span class="required">*</span><br>
                <span :style="{color:red,fontSize: '11px'}">{{ error1 }}</span>
                <span :style="{color:red,fontSize: '11px'}">{{ error4 }}</span><br>
                <input name="login" type="text" id='user' minlength="6" required="required" class="input login" v-model='user' placeholder="Login"/><br><br>
                <label>Enter your email</label><span class="required">*</span><br>
                <span :style="{color:red,fontSize: '11px'}">{{ error3 }}</span><br>
                <input name="email" type="email" id='mail'  required="required" class="input email" v-model='mail' placeholder="Email"/><br><br>
                <label>Password</label><span class="required">*</span><br>
                <span :style="{color:red,fontSize: '11px'}">{{ error2 }}</span>
                <span :style="{color:red,fontSize: '11px'}">{{ error5 }}</span><br>
                <input name="password" type="password" minlength="6" required="required" id='pass'   class="input password" v-model='passw' placeholder="Password"/><br><br>
                <label>Confirm password</label><span class="required">*</span><br><br>
                <input name="password" type="password" id='pass_con' required="required" :style="{border:border_data}" @keyup="password_confirm" class="input password" v-model='passw_con'  placeholder="password"/><br><br>
                <label>Enter your name</label><br><br>
                <input name="firstname" type="text" id='first'  class="input firstname" placeholder="Name"/><br><br>
                <label>Enter your lastname</label><br><br>
                <input name="lastname" type="text" id='last' class="input lastname" placeholder="Lastname"/><br><br>
                <captch></captch>
            </div>

            <div class="footer">
                <input type="button" name="submit" @click="submitForm" value="Registration" id="registration_ok" class="button" />
                <input type="button" v-on:click="to" name="start_ragistration_button" value="back" id="back_login" class="button" />
            </div>

        </form>
        <components is="globFooter"></components>
    </div>
</template>

<script>
import axios from "axios";
import captcha from "./captcha.vue";
import GFooter from "./GloballFooter.vue";

export default {
  name: "registration",
  data: function() {
    return {
      user: "",
      passw: "",
      mail: "",
      error1: "",
      error2: "",
      error3: "",
      error4: "",
      error5: "",
      user_noemptys: false,
      user_empty: false,
      passw_noemptys: false,
      passw_empty: false,
      mail_noemptys: false,
      mail_empty: false,
      passw_con: "",
      border_data: "1px solid #fff",
      red: "red"
    };
  },
  methods: {
    submitForm: function() {
      if (
        this.user &&
        this.user.length >= 6 &&
        this.passw &&
        this.passw.length >= 6 &&
        this.mail &&
        this.passw_con == this.passw &&
        this.result == this.capch
      ) {
        axios
          .post("http://restapi.fintegro.com/registration", {
            login: this.user,
            email: this.mail,
            password: this.passw
          })
          .then(response => {
            this.$router.push({ path: "login" });
          })
          .catch(error => {
            this.error1 = error.response.data.errors.login[0];
            this.error3 = error.response.data.errors.email[0];
            this.errored = true;
          });
      }

      if (!this.user) {
        this.error1 = "Login required.";
      } else {
        this.error1 = "";
      }
      if (!this.passw) {
        this.error2 = "password required.";
      } else {
        this.error2 = "";
      }
      if (!this.mail) {
        this.error3 = "Email required.";
      } else {
        this.error3 = "";
      }
      if (this.user.length < 6) {
        this.error4 = "Nick must have 6 simvols";
      } else {
        this.error4 = "";
      }
      if (this.passw.length < 6) {
        this.error5 = "Password must have 6 simvols";
      } else {
        this.error5 = "";
      }
    },
    noempty: function(one, two) {},
    password_confirm: function() {
      if (this.passw_con == this.passw) {
        this.border_data = "1px solid green";
      } else if (this.passw_con == "") {
        this.border_data = "1px solid #fff";
      } else {
        console.log("red", this.result, this.capch);
        this.border_data = "1px solid red";
      }
    },
    to: function() {
      this.$router.push({ path: "login" });
    }
  },
  components: {
    captch: captcha,
    globFooter: GFooter
  }
};
</script>

<style>
#registration {
  background: url("https://html5book.ru/wp-content/uploads/2015/10/background54.png");
}
.demo {
  margin: 1em 0 0.5em 0;
  color: #343434;
  font-weight: bold;
  font-family: "Ultra", sans-serif;
  font-size: 66px;
  line-height: 92px;
  text-transform: uppercase;
  text-shadow: 0 2px white, 0 3px #777;
  position: absolute;
  left: 475px;
  top: -60px;
}
#logo {
  position: relative;
  left: 15px;
  top: 15px;
}

.required {
  color: red;
}
label.required:after {
  color: red;
  content: " *";
}
</style>