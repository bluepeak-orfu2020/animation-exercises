import { Exercise } from './exercise.js';

class Animation3Exercise extends Exercise {
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
                20% { transform: translate(5rem, 5rem); }
                40% { transform: translate(5rem, 5rem) rotate(25deg); }
                60% { transform: translate(5rem, 5rem) rotate(-25deg); }
                80% { transform: translate(5rem, 5rem); }
                100% { transform: translate(0, 0); }
                
                `,
            '.element {': 'animation: exercise 4s linear 1;'
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

Animation3Exercise.displayName = 'Animation #3';

export { Animation3Exercise };