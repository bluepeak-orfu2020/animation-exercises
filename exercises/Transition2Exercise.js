import { Exercise } from './exercise.js';

class Transition2Exercise extends Exercise {
    render(root, answer) {
        const elemId = 'box';
        const styles = this._createStyles(`
            .${elemId} { ${answer['.element {']} }
            .go .${elemId} { width: 100%; height: 100%; } 
        `);
        const element = this._createAnimationBox(elemId);

        root.appendChild(styles);
        root.appendChild(element);

        return [element];
    }

    expectedAnswer() {
        return {
            '.element {': 'transition: width 1s, height 1s 1s;'
        }
    }

    inputs() {
        return [
            '.element {'
        ]
    }
}


Transition2Exercise.displayName = 'Transition #2';

export { Transition2Exercise };