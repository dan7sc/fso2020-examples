const multiplicatorJS = (a, b, printText) => {
    console.log(printText, a * b);
}
multiplicatorJS(2, 4, 'Multiplied numbers 2 and 4, the result is:');

const multiplicatorJSv2 = (a, b, printText) => {
    console.log(printText, a * b);
}
multiplicatorJSv2('how about a string?', 4, 'Multiplied a string and 4, the result is:');

const multiplicatorTS = (a: number, b: number, printText: string) => {
    console.log(printText, a * b);
}
multiplicatorTS('how about a string?', 4, 'Multiplied a string and 4, the result is:');
