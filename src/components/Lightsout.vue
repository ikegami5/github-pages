<template>
    <div :class="hide_class">
        <div class="controller">
            <div class="buttons">
                <div>
                    <button v-if="is_input_phase" class="button" @click="solve">Solve Problem</button>
                    <p class="message">{{ message }}</p>
                </div>
                <div>
                    <button v-if="!is_input_phase" class="button reset" @click="reset">Reset</button>
                </div>
            </div>
            <div v-if="is_input_phase" class="selectboxes">
                <div>
                    <span class="label">縦:</span>
                    <select class="select" v-model.number="row">
                        <option v-for="size in size_arr" :key="size">{{ size }}</option>
                    </select>
                </div>
                <div>
                    <span class="label">横:</span>
                    <select class="select" v-model.number="column">
                        <option v-for="size in size_arr" :key="size">{{ size }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="lightsout">
            <div class="row" :style="row_height" v-for="i in row" :key="i">
                <LightsoutCell v-for="j in column"
                    :key="j" :cell_size="cell_size"
                    :i="i - 1" :j="j - 1" :is_star="is_star(i - 1, j - 1)"
                    :is_light="is_light(i - 1, j - 1)" @activate-cell="activate_cell"></LightsoutCell>
            </div>
        </div>
        <div>
            <h4 class="description-title">説明</h4>
            <p class="description">光っているパネルを全て消す手順を自動で計算します。</p>
        </div>
    </div>
</template>

<script>
import LightsoutCell from './LightsoutCell.vue';
import LightsoutSolver from '../assets/js/LightsoutSolver.js';

export default {
    name: 'Lightsout',
    data: function() {
        return {
            size_arr: [2, 3, 4, 5, 6, 7, 8, 9, 10],
            row: 6,
            column: 6,
            solver: new LightsoutSolver(6, 6),
            is_input_phase: true,
            message: '',
            answer_arr: null,
        };
    },
    methods: {
        activate_cell: function(cell) {
            this.solver = this.solver.activate(cell.i, cell.j, this.is_input_phase, cell.is_star);
            if (!this.is_input_phase && this.answer_arr) this.answer_arr[cell.i][cell.j] = false;
        },
        solve: function() {
            this.is_input_phase = false;
            this.message = 'Solving...';
            const answer_arr = this.solver.solve();
            if (answer_arr) {
                this.answer_arr = answer_arr;
                this.message = '★マークをタップ';
            } else {
                this.message = '解なしです。';
            }
        },
        reset: function() {
            this.message = '';
            this.answer_arr = null;
            this.is_input_phase = true;
            this.solver = new LightsoutSolver(this.row, this.column);
        },
    },
    watch: {
        row: function() {
            this.solver = new LightsoutSolver(this.row, this.column);
        },
        column: function() {
            this.solver = new LightsoutSolver(this.row, this.column);
        },
    },
    computed: {
        cell_size: function() {
            const longer = this.row > this.column ? this.row : this.column;
            return Math.floor(95 / longer);
        },
        hide_class: function() {
            return {
                'd-none': this.is_hide,
            };
        },
        row_height: function() {
            return {
                height: this.cell_size + '%',
            };
        },
        is_light: function() {
            return function(i, j) {
                return this.solver.is_light(i, j);
            };
        },
        is_star: function() {
            return function(i, j) {
                if (!this.answer_arr) return false;
                return this.answer_arr[i][j];
            };
        },
    },
    props: {
        is_hide: Boolean,
    },
    components: {
        LightsoutCell,
    },
}
</script>

<style lang="scss" scoped>
.lightsout {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 90vmin;
    max-width: 70vh;
    height: 90vmin;
    max-height: 70vh;
    background-color: lightgray;
    margin: 1rem auto;
}

.d-none {
    display: none;
}

.select {
    margin: 0.4rem;
    width: 3rem;
}

.message {
    font-size: 0.9rem;
    margin: 0.3rem;
}

.button {
    background-color: white;
    border: 1px solid cyan;
    cursor: pointer;
    outline: none;
    padding: 0.2rem 0.4rem;
    margin: 0.3rem;
    appearance: none;
    border-radius: 0.3rem;
    box-shadow: 0.2rem;

    &:hover {
        background-color: cyan;
    }

    &:active {
        background-color: deepskyblue;
    }

    &.reset {
        border: 1px solid lightcoral;

        &:hover {
            background-color: lightcoral;
        }

        &:active {
            background-color: indianred;
        }
    }
}

.label {
    margin-left: 1rem;
}

.controller {
    display: flex;
    width: 90vmin;
    max-width: 70vh;
    height: 4rem;
    margin: 1rem auto;
    justify-content: space-between;
}

.selectboxes {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
    margin: 0.1rem;
    justify-content: center;
}

.description-title {
    margin: 0.5rem 0 0 0;
}

.description {
    font-size: 0.8rem;
    margin: 0 2rem;
}
</style>
