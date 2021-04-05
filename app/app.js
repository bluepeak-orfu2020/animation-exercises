const createBaseStyling = (document) => {
    const css = `
        .test-wrapper {
            background-color: white;
            width: 100%;
            height: 100%;
            border: 2px solid black
        }

        .animated-box {
            background-color: #E9C46A;
            width: 5rem;
            height: 5rem;
        }
    `;

    const styles = document.createElement('style');
    styles.textContent = css;
    return styles;
}

const createInput = (d, name) => {
    const submission = d.createElement('div');
    const wrapPre = d.createElement('span');
    const input = d.createElement('textarea');
    const wrapPost = d.createElement('span');

    submission.classList.add('submission');
    wrapPre.classList.add('submission__wrap');
    input.classList.add('submission__text');
    wrapPost.classList.add('submission__wrap');

    input.cols = 30;
    input.rows = 10;

    wrapPre.textContent = name;
    wrapPost.textContent = '}';

    submission.appendChild(wrapPre);
    submission.appendChild(input);
    submission.appendChild(wrapPost);

    return { name, wrapper: submission, input };
}

const createExerciseOption = (d, exercise) => {
    const option = d.createElement('option');
    option.textContent = exercise.displayName;
    option.value = exercise.name;
    return option;
}

const setupExercise = (Exercise, document, expectedRoot, actualRoot) => {
    const inputContainer = workarea.querySelector('.inputs');

    const exercise = new Exercise(
        document,
        expectedRoot,
        actualRoot
    );

    const inputs = exercise.inputs().map(input => createInput(document, input));

    inputContainer.innerHTML = '';
    inputs.forEach(input => {
        inputContainer.appendChild(input.wrapper);
    });

    return { exercise, inputs };
}

export const cssAnimationExercises = (root, exercises) => {
    const workarea = root.querySelector("#workarea");
    const previewarea = root.querySelector("#previewarea");

    const actual = previewarea.querySelector('.actual');
    const expected = previewarea.querySelector('.expected');
    const actualRoot = actual.attachShadow({mode: 'open'});
    const expectedRoot = expected.attachShadow({mode: 'open'});

    const baseStyle = createBaseStyling(root.ownerDocument);
    actualRoot.appendChild(baseStyle.cloneNode(true))
    expectedRoot.appendChild(baseStyle.cloneNode(true))

    const exercisePicker = workarea.querySelector('.exercise-picker');

    const verifyButton = workarea.querySelector('.submission-submit');
    const submissionError = workarea.querySelector('.submission__error');

    exercises.map(exercise => createExerciseOption(root.ownerDocument, exercise))
        .forEach(option => exercisePicker.appendChild(option));

    let currentContext;
    currentContext = setupExercise(exercises[0], root.ownerDocument, expectedRoot, actualRoot);
    exercisePicker.addEventListener('change', () => {
        const newExercise = exercises.find(e => e.name === exercisePicker.value);
        currentContext = setupExercise(newExercise, root.ownerDocument, expectedRoot, actualRoot);
        runTest();
    });

    const runTest = (answer = null) => {
        const done = (error) => {
            if (answer != null && error) {
                if (error === 'timeout') {
                    submissionError.textContent = 'No transition or animation was performed in your submission.';
                } else {
                    submissionError.textContent = 'An unknown error occured. Error: ' + error;
                }
                submissionError.classList.add('active');
            }
            verifyButton.disabled = false;
        }
        submissionError.textContent = '';
        submissionError.classList.remove('active');
        currentContext.exercise.verify(answer || {}, done)
        verifyButton.disabled = true;
    }

    runTest();
    verifyButton.addEventListener('click', async () => {
        const answers = {};

        currentContext.inputs.forEach(input => {
            answers[input.name] = input.input.value;
        });

        runTest(answers);
    });
};