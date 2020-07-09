<template>
    <div id="app">
        <Links msg="I.T. の GitHub Pages" />
    </div>
</template>

<script>
import Links from "./components/Links.vue";

export default {
    name: 'App',
    components: {
        Links
    }
};
</script>

<style>
#app {
    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
