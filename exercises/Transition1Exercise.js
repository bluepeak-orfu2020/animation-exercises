import { Exercise } from './exercise.js';

class Transition1Exercise extends Exercise {
    render(root, answer) {
        const elemId = 'box';
        const styles = this._createStyles(`
            .${elemId} { ${answer['.element {']} }
            .go .${elemId} { width: 100%;} 
        `);
        const element = this._createAnimationBox(elemId);

        root.appendChild(styles);
        root.appendChild(element);

        return [element];
    }

    expectedAnswer() {
        return {
            '.element {': 'transition: width 2s;'
        }
    }

    inputs() {
        return [
            '.element {'
        ]
    }
}

Transition1Exercise.displayName = 'Transition #1';

export { Transition1Exercise };