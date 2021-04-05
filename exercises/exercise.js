export class Exercise {
    constructor(document, expectedRoot, actualRoot) {
        this.d = document;
        this.expectedRoot = expectedRoot;
        this.actualRoot = actualRoot;
        this.running = false;

        this.expectedWrapper = null;
        this.actualWrapper = null;
    }

    _cleanupWrapper(root) {
        const wrapper = root.querySelector('.test-wrapper');
        if (wrapper) {
            root.removeChild(wrapper);
        }
    }

    _setup(answer) {
        this._cleanupWrapper(this.expectedRoot);
        this.expectedWrapper = this.d.createElement('div');
        this.expectedWrapper.classList.add('test-wrapper');
        this.render(this.expectedWrapper, this.expectedAnswer());

        this._cleanupWrapper(this.actualRoot);
        this.actualWrapper = this.d.createElement('div');
        this.actualWrapper.classList.add('test-wrapper');
        this.render(this.actualWrapper, answer);

        this.expectedRoot.appendChild(this.expectedWrapper);
        this.actualRoot.appendChild(this.actualWrapper);
    }

    _run() {
        this.expectedWrapper.classList.add('go');
        this.actualWrapper.classList.add('go');
    }

    _registerAnimatingElement(elem) {
        this.animatinElements.push(new Promise(r => {
            elem.addEventListener('transitionend', () => r());
            elem.addEventListener('animationend', () => r());
        }));
    }

    _createStyles(css) {
        const styles = this.d.createElement('style');
        styles.textContent = css;
        return styles;
    }

    _createAnimationBox(id) {
        const element = this.d.createElement('div');
        element.classList.add('animated-box', id);
        this.animations.push(new Promise(r => {
            element.addEventListener('transitionend', () => r());
            element.addEventListener('animationend', () => r());
        }));
        return element;
    }

    _cleanup() {
        this.running = false;
    }

    verify(answer = '', done = () => {}) {
        if (this.running) {
            return;
        }

        this.running = true;
        this.animations = [];
        this._setup(answer);
        setTimeout(() => {
            this._run();
            if (this.isInfinite()) {
                setTimeout(() => {
                    done();
                    this._cleanup();
                }, 1000);
            } else {
                let complete = false;
                Promise.all(this.animations).then(() => {
                    if (!complete) {
                        done();
                        this._cleanup();
                        complete = true;
                    }
                })
                setTimeout(() => {
                    if (!complete) {
                        done('timeout');
                        this._cleanup();
                        complete = true;
                    }
                }, 3000);
            }
        }, 0);
    }

    render(root, answer) {
        throw new Error('Sub-class must implement this function');
    }

    expectedAnswer() {
        throw new Error('Sub-class must implement this function');
    }

    isInfinite() {
        return false;
    }
}
