<template>
    <div class="cell" :class="classes" :style="styles" @click="handle_click"></div>
</template>

<script>
export default {
    name: 'LightsoutCell',
    methods: {
        handle_click: function() {
            this.$emit('activate-cell', this);
        },
    },
    computed: {
        styles: function() {
            return {
                width: this.cell_size + '%',
            };
        },
        classes: function() {
            return {
                light: this.is_light,
                star: this.is_star,
            };
        },
    },
    props: {
        is_light: Boolean,
        cell_size: Number,
        i: Number,
        j: Number,
        is_star: Boolean,
    },
}
</script>

<style lang="scss" scoped>
    .cell {
        background-color: gray;
        margin: 0.1rem;
        height: 100%;
        
        &.light {
            background-color: yellow;
        }

        &.star {
            background-image: url("/star.png");
            background-size: contain;
            background-repeat: no-repeat;
        }
    }

    .d-none {
        display: none;
    }
</style>
