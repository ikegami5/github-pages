<template>
    <div class="links">
        <h1>{{ msg }}</h1>
        <h3>作ったもの</h3>
        <ul>
            <li>
                <a href="https://mathq2nd.com/webapp/">MathQ - 数学・算数質問サイト</a>
            </li>
            <li>
                <a href="https://blog.mathq2nd.com/">I.T. のエンジニアブログ</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Links',
    props: {
        msg: String
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    margin: 1rem;
}
a {
    color: #42b983;
}
</style>
