import { Exercise } from './exercise.js';

class Animation4Exercise extends Exercise {
    render(root, answer = {}) {
        const elemId = 'box';
        const styles = this._createStyles(`
            @keyframes exercise {
                ${answer['@keyframes exercise {']}
            }
            .go .${elemId} { ${answer['.element {']} }
        ` + answer);
        const element = this._createAnimationBox(elemId);

        root.appendChild(styles);
        root.appendChild(element);

        return [element];
    }

    expectedAnswer() {
        return {
            '@keyframes exercise {': `
                0% { background-color: blue; }
                100% { background-color: green; }

                `,
            '.element {': 'animation: exercise 2s; animation-fill-mode: forwards;'
        }
    }

    inputs() {
        return [
            '@keyframes exercise {',
            '.element {'
        ]
    }

    isInfinite() {
        return true;
    }
}

Animation4Exercise.displayName = 'Animation #4';

export { Animation4Exercise };