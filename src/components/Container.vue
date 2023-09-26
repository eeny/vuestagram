<template>
  <div>
    <!-- <Post :instaPost = "instadata[0]"/>
    <Post :instaPost = "instadata[1]"/>
    <Post :instaPost = "instadata[2]"/> -->
    <div v-if="step == 0">
      <Post :instaPost = a :index = i v-for="(a, i) in instadata" :key="i" />
    </div>

    <!-- 필터선택페이지 -->
    <div v-if="step == 1">
      <div :class="`upload-image ${filterName}`" :style="`background-image: url(${imgUrl})`"></div>
      <div class="filters">
        <FilterBox :imgUrl="imgUrl" :filter="filter" v-for="filter in filters" :key="filter">
          {{ filter }}
          <!-- slot으로 자식이 부모에게 보낸 데이터 받기 -->
          <!-- <template v-slot:default="childSlot">{{ childSlot.msg }}</template> -->
          <!-- slot 여러개일 때 -->
          <!-- <template v-slot:a> 데이터1 </template>
        <template v-slot:b> 데이터2</template> -->
        </FilterBox>
      </div>
    </div>

    <!-- 글작성페이지 -->
    <div v-if="step == 2">
      <div :class="`upload-image ${filterName}`" :style="{ backgroundImage: `url(${imgUrl})` }"></div>
      <div class="write">
        <textarea v-model="contents" class="write-box" @input="$emit('write', contents)">write!</textarea>
        <!-- <textarea class="write-box" @input="$emit('write', $event.target.value)">write!</textarea> -->
      </div>
    </div>
  </div>
</template>

<script>
import Post from './Post.vue';
import FilterBox from './FilterBox.vue';

export default {
  name: 'ContainerComp',
  data() {
    return {
      contents: '',
      filters: ["aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson",
        "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua",
        "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
    }
  },
  components: {
    Post,
    FilterBox,
  },
  props: {
    instadata: Array,
    step: Number,
    imgUrl: String,
    filterName: String,
  }
}
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}

.filters {
  overflow-x: scroll;
  white-space: nowrap;
}

.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}

.filters::-webkit-scrollbar {
  height: 5px;
}

.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>