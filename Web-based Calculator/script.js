let currentInput = '';

function handleButtonClick(value) {
    currentInput += value;
    document.getElementById('display').value = currentInput;
}

function clearOneCharacter() {
    currentInput = currentInput.substring(0, currentInput.length - 1); // Remove the last character
    document.getElementById('display').value = currentInput;
}

function clearAll() {
    currentInput = '';
    document.getElementById('display').value = currentInput;
}

function calculateResult() {
    try {
        currentInput = eval(currentInput); // Evaluating the expression
        document.getElementById('display').value = currentInput;
    } catch (error) {
        // Handle errors, e.g., division by zero
        document.getElementById('display').value = 'Error';
    }
}