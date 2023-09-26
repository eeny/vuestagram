<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step < 2" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">Publish</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <h4>Hi {{ $store.state.name }} (Age : {{ $store.state.age }})</h4>
  <!-- <button @click="$store.state.name = 'park'">이름변경</button> --> <!-- vuex 규칙 : store.js에 있는 state를 컴포넌트에서 수정하면 안됨 -->
  <button @click="$store.commit('changeName')">이름변경</button> <!-- vuex 규칙 : store.js에 있는 state를 컴포넌트에서 수정하면 안됨 -->
  
  <button @click="$store.commit('getOlder', 10)">나이변경1</button> <!-- $store.commit() : mutations 실행 -->
  <button @click="getOlder(10)">나이변경2</button>

  <p>{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">More Show</button> <!-- $store.dispatch() : actions 실행 -->

  <p>{{ 내이름 }} {{ name }} {{ likes }}</p>

  <Container :instadata="instadata" :step="step" :imgUrl="imgUrl" :filterName="filterName" @write="contents = $event" />
  <button @click="more">더보기</button>

  <p>now : {{ now() }} {{ nowCount }}</p>
  <p>now2 : {{ now2 }} {{ nowCount }}</p>
  <button @click="nowCount++">nowBtn</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" accept="image/*" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

  <!-- 탭 메뉴 예시 -->
  <!-- <div v-if="showNum == 0">내용0</div>
  <div v-if="showNum == 1">내용1</div>
  <div v-if="showNum == 2">내용2</div>
  <button @click="showNum = 0">버튼0</button>
  <button @click="showNum = 1">버튼1</button>
  <button @click="showNum = 2">버튼2</button> -->
</template>

<script>
import Container from './components/Container.vue';
import instadata from './assets/instadata.js';
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      instadata: instadata,
      clickCnt: 0,
      showNum: 0,
      step: 0,
      imgUrl: '',
      contents: '',
      filterName: '',
      nowCount: 0,
    }
  },
  mounted() {
    // mitt로 데이터 전달받기
    this.emitter.on('fire', (data) => {
      alert(data);
    });

    this.emitter.on('changeFilter', (data) => {
      this.filterName = data;
    });
  },
  components: {
    Container: Container,
  },
  computed: { // 함수 생성 방법 1 - computed : 사용해도 실행 안됨, 처음 실행(사이트 로드) 후 값을 간직함, 데이터 계산결과 저장용 함수, return 필수
    now2() {
      return new Date()
    },
    // vuex mapState 사용하기
    name() {
      return this.$store.state.name;
    },
    // 여러 state를 한 번에 가져오기
    ...mapState(['name', 'age', 'likes']),
    ...mapState({ 내이름: 'name', 내나이: 'age' })
  },
  methods: {  // 함수 생성 방법 2 - methods : 사용할 때마다 실행
    // vuex mapState 사용하기 - 여러 mutations 한 번에 가져오기
    ...mapMutations(['changeName', 'getOlder', 'doLike', 'setMore']),
    now() {
      return new Date()
    },
    more() {
      // GET 요청 방식
      axios.get(`https://codingapple1.github.io/vue/more${this.clickCnt}.json`)
        .then(result => {// GET요청 성공시 실행하는 콜백함수
          console.log(result.data)
          this.instadata.push(result.data);
          this.clickCnt++;
        })

      // POST 요청 방식
      // axios.post('URL', {name : 'kim'}).then().catch((error)=>{
      //   error
      // })
    },
    upload(e) {
      let file = e.target.files;  // 업로드한 파일을 리스트로
      console.log(file[0].type);
      let url = URL.createObjectURL(file[0]); // 가상의 url 생성
      console.log(url);
      this.imgUrl = url;
      this.step++;
    },
    publish() {
      let myPost = {
        name: "Hi Han",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.imgUrl,
        likes: 360,
        date: "Sep 26",
        liked: false,
        content: this.contents,
        filter: this.filterName
      };
      this.instadata.unshift(myPost); // Array 왼쪽에 데이터 추가
      this.step = 0;
    }
  },
}
</script>

<style>
@import 'style.css';

body {
  margin: 0;
}

ul {
  padding: 5px;
  list-style-type: none;
}

.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}

.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}

.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}

.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}

.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}

.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}

.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}

.inputfile {
  display: none;
}

.input-plus {
  cursor: pointer;
}

#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
