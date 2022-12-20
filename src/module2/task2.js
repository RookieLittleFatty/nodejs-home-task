const { csv } = require('csvtojson');
const { createReadStream, createWriteStream, promises} = require('fs');
const { pipeline } = require('stream');

const csvPath = 'assets/data.csv';
const txtPathViaStream = 'assets/txtViaStream.txt';
const txtPathLineByLine = 'assets/txtLineByLine.txt';

const writeCsvToTxtViaStream = (csvPath, txtPath) => {
    const readStream = csv().fromStream(createReadStream(csvPath));
    const writeStream = createWriteStream(txtPath);
    pipeline(
        readStream,
        writeStream,
        (error) => {
            if (error) {
                console.log('write failed');
            } else {
                console.log('write finished');
            }
        }
    )
}

const writeCsvToTxtLineByLine = async (csvPath, txtPath) => {
    const { writeFile, appendFile }  = promises;
    try {
        const jsonObject = await csv().fromFile(csvPath);
        for(let i = 0; i < jsonObject.length; i++) {
            const rowBuffer = JSON.stringify(jsonObject[i]) + '\n';
            if (i === 0) {
                await writeFile(txtPath, rowBuffer);
            } else {
                await appendFile(txtPath, rowBuffer);
            }
        }
        console.log('write finished!');
    } catch (error) {
        console.log('write failed!', error);
    }
}

writeCsvToTxtViaStream(csvPath, txtPathViaStream);

writeCsvToTxtLineByLine(csvPath, txtPathLineByLine);