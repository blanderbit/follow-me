<template>
   <div class="category-wrap">
                <h3>Menu</h3>
                <ul>
                  <li><a href="#" @click="home">Home</a></li>
                  <li><a href="#" @click="settings">Settings</a></li>
                  <li><a href="#" @click="albums">Album</a></li>
                  <li><a href="#" @click="friends">Friends</a></li>
                  <li><a href="#" @click="news">News</a></li>
                  

                </ul>
              </div>
</template>


<style>
/*Сайт бар*/
.category-wrap {
  padding: 15px;
  background: white;
  width: 200px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.category-wrap h3 {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  margin: 0 0 10px;
  padding: 0 5px;
  position: relative;
}
.category-wrap h3:after {
  content: "";
  width: 6px;
  height: 6px;
  background: #80c8a0;
  position: absolute;
  right: 5px;
  bottom: 2px;
  box-shadow: -8px -8px #80c8a0, 0 -8px #80c8a0, -8px 0 #80c8a0;
}
.category-wrap ul {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
}
.category-wrap li {
  margin: 12px 0 0 0px;
}
.category-wrap a {
  text-decoration: none;
  display: block;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.6);
  padding: 5px;
  position: relative;
  transition: 0.3s linear;
}
.category-wrap a:after {
  content: "\f18e";
  font-family: FontAwesome;
  position: absolute;
  right: 5px;
  color: white;
  transition: 0.2s linear;
}
.category-wrap a:hover {
  background: #80c8a0;
  color: white;
}
a:hover {
  cursor: pointer;
}
</style>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    LogOut: function() {
      let logOut = confirm("Confirm the action");
      if (logOut == true) {
        document.cookie = "token=";
        this.$router.push({ name: "login" });
      }
    },
    home: function() {
      this.$router.push({
        name: "profil",
        params: { id: localStorage.getItem("id") }
      });
    },
    settings: function() {
      this.$router.push({
        name: "settings",
        params: { id: localStorage.getItem("id") }
      });
    },
    albums: function() {
      this.$router.push({
        name: "albums",
        params: { id: localStorage.getItem("id") }
      });
    },
    friends: function() {
      this.$router.push({
        name: "friends",
        params: { id: localStorage.getItem("id") }
      });
    },
    news: function() {
      this.$router.push({
        name: "news",
        params: { id: localStorage.getItem("id") }
      });
    }
  }
};
</script>