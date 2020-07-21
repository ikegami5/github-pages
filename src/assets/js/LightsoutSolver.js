export default class LightsoutSolver {
    constructor(row, column) { // true: light on. All lights out(false) to solve
        this.row = row;
        this.column = column;
        this.lights_array = Array(row).fill().map(() => {
            return Array(column).fill().map(() => {
                return true;
            });
        });
    }

    set(array) {
        this.lights_array = array;
        return this;
    }

    activate(i, j, is_input_phase, is_star) {
        if (!is_input_phase && !is_star) return this;
        const arr = this.lights_array;
        arr[i][j] = !arr[i][j];
        if (!is_input_phase) {
            if (i + 1 < this.row) arr[i + 1][j] = !arr[i + 1][j];
            if (i - 1 >= 0) arr[i - 1][j] = !arr[i - 1][j];
            if (j + 1 < this.column) arr[i][j + 1] = !arr[i][j + 1];
            if (j - 1 >= 0) arr[i][j - 1] = !arr[i][j - 1];
        }
        return new LightsoutSolver(this.row, this.column).set(this.lights_array);
    }

    is_light(i, j) {
        return this.lights_array[i][j];
    }

    solve() {
        const _is_all_lights_out = (array) => {
            return array.reduce((acc, row) => {
                return acc && row.reduce((prev, current) => {
                    return prev && !current;
                }, true);
            }, true);
        };

        const _copy_array = (array) => {
            return array.map((row) => {
                return row.map((v) => v);
            });
        };

        const _answers = (length) => { // true: should activate
            if (Math.floor(length) <= 1) {
                return [[false], [true]];
            } else {
                const former = _answers(length - 1).map((arr) => arr.concat([false]));
                const latter = _answers(length - 1).map((arr) => arr.concat([true]));
                return former.concat(latter);
            }
        }

        const _activate = (array, i, j) => {
            array[i][j] = !array[i][j];
            if (i + 1 < this.row) array[i + 1][j] = !array[i + 1][j];
            if (i - 1 >= 0) array[i - 1][j] = !array[i - 1][j];
            if (j + 1 < this.column) array[i][j + 1] = !array[i][j + 1];
            if (j - 1 >= 0) array[i][j - 1] = !array[i][j - 1];
        }

        for (let answer of _answers(this.column)) {
            const question = _copy_array(this.lights_array);
            const answer_array = [];
            for (let i = 0; i < this.row; i++) {
                const activate_array = i ? question[i - 1] : answer;
                answer_array[i] = activate_array.map((e) => e);
                for (let j = 0; j < this.column; j++) {
                    if (activate_array[j]) {
                        _activate(question, i, j);
                    }
                }
            }
            if (_is_all_lights_out(question)) {
                return answer_array;
            }
        }
        return null;
    }
}
