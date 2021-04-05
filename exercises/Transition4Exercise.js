import { Exercise } from './exercise.js';

class Transition4Exercise extends Exercise {
    render(root, answer) {
        const elemId = 'box';
        const styles = this._createStyles(`
            .${elemId} { ${answer['.element {']}; transform: translateX(0); }
            .go .${elemId} { transform: translateX(15rem); } 
        `);
        const element = this._createAnimationBox(elemId);

        root.appendChild(styles);
        root.appendChild(element);

        return [element];
    }

    expectedAnswer() {
        return {
            '.element {': 'transition: transform ease-out 2s;'
        }
    }

    inputs() {
        return [
            '.element {'
        ]
    }
}

Transition4Exercise.displayName = 'Transition #4';

export { Transition4Exercise };