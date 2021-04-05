import { Exercise } from './exercise.js';

class Animation1Exercise extends Exercise {
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
                from { opacity: 1; width: 5rem; }
                to { opacity: 0.25; width: 10rem; }`,
            '.element {': 'animation: exercise 2s;'
        }
    }

    inputs() {
        return [
            '@keyframes exercise {',
            '.element {'
        ]
    }
}

Animation1Exercise.displayName = 'Animation #1';

export { Animation1Exercise };