<template>
    <div class="links">
        <h1>{{ msg }}</h1>
        <div class="item">
            <a class="link" href="https://github.com/ikegami5/github-pages/">View on GitHub</a>
        </div>
        <h3>作ったもの</h3>
        <ul>
            <li class="item">
                <a href="https://mathq2nd.com/webapp/">MathQ - 数学・算数質問サイト</a>
            </li>
            <li class="item">
                <a href="https://blog.mathq2nd.com/">I.T. のエンジニアブログ</a>
            </li>
        </ul>
        <h3>おまけ</h3>
        <div class="item">
            <a class="link" @click="toggle_lightsout">Lightsout Solver {{ triangle }}</a>
            <Lightsout :is_hide="is_hide_lightsout"></Lightsout>
        </div>
    </div>
</template>

<script>
import Lightsout from "./Lightsout.vue";

export default {
    name: 'Links',
    props: {
        msg: String,
    },
    data: function() {
        return {
            is_hide_lightsout: true,
        };
    },
    methods: {
        toggle_lightsout: function() {
            this.is_hide_lightsout = !this.is_hide_lightsout;
        },
    },
    computed: {
        triangle: function() {
            return this.is_hide_lightsout ? '▼' : '▲';
        }
    },
    components: {
        Lightsout,
    },
};
</script>

<style lang="scss" scoped>
h3 {
    margin: 2rem 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

.item {
    margin: 1rem;
}

a {
    color: #42b983;

    &.link {
        cursor: pointer;
        text-decoration: underline;
    }
}
</style>
