const {stdin, stdout} = process;
const reverseData = (data) => {
    return data.toString().split('').reverse().join('');
};
stdin.map(reverseData).pipe(stdout);