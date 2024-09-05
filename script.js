var expression = '';
function appendValue(value) {
    expression += value;
    document.getElementById('result').innerText = expression;
}

function clearResult() {
    expression = '';
    document.getElementById('result').innerText = '0';
}

function toggleSign() {
    if (expression) {
        expression = (parseFloat(expression) * -1).toString();
        document.getElementById('result').innerText = expression;
    }
}

function calculate() {
    try {
        //TODO - Verificar porque a 100*10% = 1000
        expression = expression.replace(/(\d+)([%])([*/+-]?)/g, (match, num, percent, operator) => {
            let previousNumber = '';
            let operators = expression.match(/[+\-*/]/g);

            if (operators) {
                const lastOperator = operators[operators.length - 1];
                previousNumber = expression.split(lastOperator)[0]; 
            } else {
                previousNumber = num;
            }

            return (parseFloat(previousNumber) * (parseFloat(num) / 100)).toString() + operator;
        });

        const result = Function('"use strict"; return (' + expression + ')')();
        document.getElementById('result').innerText = result;
        expression = result.toString();
    } catch {
        document.getElementById('result').innerText = 'Erro';
        expression = '';
    }
}

