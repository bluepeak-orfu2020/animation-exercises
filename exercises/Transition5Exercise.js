import { Exercise } from './exercise.js';

class Transition5Exercise extends Exercise {
    render(root, answer) {
        const elemId = 'box';
        const styles = this._createStyles(`
            .${elemId} { ${answer['.element {']}; background-color: red; }
            .go .${elemId} { background-color: green; }
        `);
        const element = this._createAnimationBox(elemId);

        root.appendChild(styles);
        root.appendChild(element);

        return [element];
    }

    expectedAnswer() {
        return {
            '.element {': 'transition: background-color linear 2s;'
        }
    }

    inputs() {
        return [
            '.element {'
        ]
    }
}

Transition5Exercise.displayName = 'Transition #5';

export { Transition5Exercise };