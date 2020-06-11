type Operation = 'multiply' | 'add' | 'divide';

type Result = number;

const calculator = (a: number, b: number, op: Operation): Result => {
    switch(op) {
        case 'multiply':
            return a * b;
        case 'add':
            return a + b;
        case 'divide':
            if (b === 0) throw new Error('Can\'t divide by zero!');
            return a / b;
        default:
            throw new Error('Operation is not multiply, add or divide!');
    }
}

try {
    console.log(calculator(1, 5, 'divide'))
} catch(error) {
    console.log('Something was wrong, error message:', error.message)
}

try {
    console.log(calculator(2, 5, 'multiply'))
} catch(error) {
    console.log('Something was wrong, error message:', error.message)
}

try {
    console.log(calculator(1, 5, 'add'))
} catch(error) {
    console.log('Something was wrong, error message:', error.message)
}

try {
    console.log(calculator(1, 0, 'divide'))
} catch(error) {
    console.log('Something was wrong, error message:', error.message)
}
