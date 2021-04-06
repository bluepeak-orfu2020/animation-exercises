import { Exercise } from './exercise.js';

class Animation5Exercise extends Exercise {
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
                0% { transform: translate(0, 0); background-color: green; }
                50% { transform: translate(10rem, 10rem); background-color: green;  }
                100% { transform: translate(10rem, 10rem); background-color: blue; }

                `,
            '.element {': 'animation: exercise 2s linear 2 alternate;'
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

Animation5Exercise.displayName = 'Animation #5';

export { Animation5Exercise };