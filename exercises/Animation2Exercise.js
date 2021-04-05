import { Exercise } from './exercise.js';

class Animation2Exercise extends Exercise {
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
                0% { transform: translate(0, 0); }
                25% { transform: translate(10rem, 0); }
                50% { transform: translate(10rem, 10rem); }
                75% { transform: translate(0, 10rem); }
                100% { transform: translate(0, 0); }
                
                `,
            '.element {': 'animation: exercise 2s linear infinite;'
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

Animation2Exercise.displayName = 'Animation #2';

export { Animation2Exercise };