export {};

type Operation = string | 'multiply' | 'add' | 'divide';
type Result = number;

interface CalculatorValues {
    value1: number;
    value2: number;
    op: Operation;
}

const parseArguments = (args: Array<string>): CalculatorValues => {
    if (args.length < 5) throw new Error('Not enough arguments');
    if (args.length > 5) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3]),
            op: args[4]
        }
    } else {
        throw new Error('Provided values were invalid!');
    }
}

export const calculator = (a: number, b: number, op: Operation): Result => {
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
    const { value1, value2, op } = parseArguments(process.argv)
    console.log(calculator(value1, value2, op));
} catch(error) {
    console.log('Something was wrong, error message:', error.message);
}
