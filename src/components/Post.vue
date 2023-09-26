<template>
  <div class="post">
    <div class="post-header">
      <div class="profile" :style="{ backgroundImage: `url(${instaPost.userImage})` }"></div>
      <span class="profile-name">{{ instaPost.name }}</span>
    </div>
    <div @click="$store.commit('doLike', {'like' : like, 'index' : index}); postClick = !postClick; didLike(postClick)" :class="`post-body ${instaPost.filter}`" :style="{ backgroundImage: `url(${instaPost.postImage})` }"></div>
    <div class="post-content">
      <!-- <p>{{ instaPost.likes }} Likes</p> -->
      <p>{{ $store.state.likes[index] }} Likes</p>
      <p><strong>{{ instaPost.name }}</strong> {{ instaPost.content }}</p>
      <p class="date">{{ instaPost.date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostComp',
  data() {
    return {
      postClick : false,
      like : 1,
    }
  },
  methods: {
    didLike(postClick){
      if(postClick) {
        this.like = -1;
      } else {
        this.like = 1;
      }
    }
  },
  props: {
    instaPost: Object,
    index: Number,
  },
}
</script>

<style>
.post {
  width: 100%;
}

.profile {
  background-image: url("https://picsum.photos/100?random=0");
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}

.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}

.post-header {
  height: 30px;
  padding: 10px;
}

.post-body {
  background-image: url("https://picsum.photos/600?random=0");
  height: 450px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}

.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
}
</style>