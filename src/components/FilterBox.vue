<template>
    <div @click="changeFilter(filter)" :class="`filter-item ${filter}`" :style="`background-image: url(${imgUrl})`">
        <slot></slot> <!-- props와 유사한 slot(태그 안에서만 데이터바인딩 가능) -->
        <!-- <slot :msg="msg"></slot> --> <!-- slot으로 자식이 부모에게 데이터 보내기 -->
        <!-- <slot name="a"></slot> --> <!-- slot이 여러개일 때 name 필요(Named Slots) -->
        <!-- <slot name="b"></slot> --> <!-- slot이 여러개일 때 name 필요(Named Slots) -->

        <!-- <button @click="fire">button</button> -->
    </div>
</template>

<script>
export default {
    name: 'FilterBox',
    data() {
        return {
            msg : 'hello',
        }
    },
    methods: {
        fire() {
            // mitt로 데이터 전송하기
            this.emitter.emit('fire', this.msg); 
        },
        changeFilter(filter) {
            this.emitter.emit('changeFilter', filter);
        }
    },
    props: {
        imgUrl: String,
        filter: String,
    },
}
</script>

<style>
.filter-item {
    width: 100px;
    height: 100px;
    margin: 10px 10px 10px auto;
    padding: 8px;
    display: inline-block;
    color: white;
    background-size: cover;
    background-position: center;
}
</style>