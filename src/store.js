import axios from 'axios';
import { createStore } from 'vuex'

const store = createStore({
    state() {  // state == data
        return {
            name: 'kim',
            age: 20,
            likes: [30, 10, 40],
            more: {},
        }
    },
    mutations: { // state 수정하는 방법 정의 & state는 무조건 mutations에서 변경해야함
        changeName(state) {
            state.name = 'park'
        },
        getOlder(state, payload) {  // payload : 컴포넌트에서 전달한 데이터
            state.age += payload;
        },
        doLike(state, payload) {
            state.likes[payload.index] += payload.like;
        },
        setMore(state, payload) {
            state.more = payload;
        }
    },
    actions: {   // ajax 요청 또는 오래 걸리는 작업
        getData(context) {  // actions 함수에 있는 파라미터 == $store
            axios.get('https://codingapple1.github.io/vue/more0.json').then(result => {
                console.log(result.data);
                context.commit('setMore', result.data);
            })
        }
    }
})

export default store