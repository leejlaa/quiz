
const fs = require('fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const { exit } = require('process');
const { resolve } = require('path');
const { clear } = require('console');


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function isFileEmpty(fileName, ignoreWhitespace=true) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if( err ) {
                reject(err);
                return;
            }
            if(data.length == 0){
                resolve(true);
            }else{
                reject(false);
            }
        });
    })
}

function readFromSecondLine(fileName) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(fileName),
            output: process.stdout,
            terminal: false
        });

        let isFirstLine = true;
        const remainingLines = [];

        rl.on('line', (line) => {
            if (isFirstLine) {
                isFirstLine = false;
            } else {
                remainingLines.push(line);
            }
        });

        rl.on('close', () => {
            resolve(remainingLines);
        });

        rl.on('error', (error) => {
            reject(error);
        });
    });
}

function readFirstLineFromFile() {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: fs.createReadStream('resume_quiz.txt'),
            output: process.stdout,
            terminal: false
        });

        rl.on('line', (line) => {
            rl.close();
            resolve(line);
        });

        rl.on('error', (error) => {
            reject(error);
        });
    });
}

function readFirstLineFromFileSeconds() {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: fs.createReadStream('seconds.txt'),
            output: process.stdout,
            terminal: false
        });

        rl.on('line', (line) => {
            rl.close();
            resolve(line);
        });

        rl.on('error', (error) => {
            reject(error);
        });
    });
}

function secondsInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        echo: false
    });

    return new Promise((resolve, reject) => {
        rl.question('Enter your number of seconds: ', (userInput) => {
            resolve(userInput);
            rl.close();
        });

        rl.on('close', () => {
            resolve(null); // Resolve with null if readline is closed without input
        });
    });
}

// function readFromFile() {
//     try {
//         const data = fs.readFileSync('resume_quiz.txt', 'utf8');
//         return data;
//     } catch (error) {
//         console.error('Error reading file:', error);
//         return null;
//     }
// }

// function writeToFile(data) {
//     try {
//         fs.writeFileSync('resume_quiz.txt', data);
//         console.log('Data written to file successfully.');
//     } catch (error) {
//         console.error('Error writing to file:', error);
//     }
// }


function loadQuestionsFromJson() {
    const data = fs.readFileSync('quiz_questions.json');
    const questionsJson = JSON.parse(data);
    return questionsJson;
}

function validateStructure(questions){
    let valid  = true;
    questions.forEach(myFunction);

    function myFunction(x) {
        if(x.answer.length == 0)
            valid  =  false;
        else if(Array.isArray(x.answer))
            valid  =  false;
        else if(!x.answer)
            valid  =  false;
        else if(x.choices.length>6) 
            valid  =  false;
        else if( x.choices.length<4) 
            valid  =  false;
        else if(!x.choices) 
            valid  =  false;
        else if(!(x.question instanceof String))
            valid  =  false;
        else if(x.question.length == 0)
            valid  =  false;
        else if(!x.question)
            valid  =  false;
        else 
            valid  =  false;
    }
    return valid;
}

function randomiseArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
      }
      return array;
}

function filterQuestionsByDifficulty(questions, difficulty) {
    return questions.filter(question => question.difficulty == difficulty);
}
function appendToFile(data) {
    try {
        fs.appendFileSync('resume_quiz.txt', data);
        console.log('Current progress saved.');
    } catch (error) {
        console.error('Error appending to file:', error);
    }
}

// function gradeQuiz(questions, userAnswers) {
//     let correctCount = 0;
//     let incorrectCount = 0;

//     for (let i = 0; i < questions.length; i++) {
//         if (userAnswers[i] === questions[i].answer) {
//             correctCount++;
//         } else {
//             incorrectCount++;
//         }
//     }
//     return { correctCount, incorrectCount };
// }

function stringOutput(question,i){
    i++
    var choicesString='\n';
    const shuffledChoices = randomiseArray(question.choices);
    shuffledChoices.forEach(myFunction);

    function myFunction(x) {
        choicesString +=' ~'+ x +'\n';
    }

    return ("\n"+(i++)+'.'+question.question+choicesString)
}

function writeToFirstLineOfFile(data) {
    try {
        const fileContent = fs.readFileSync('resume_quiz.txt', 'utf8');
        const lines = fileContent.split('\n');
        lines[0] = data;
        const updatedContent = lines.join('\n');
        fs.writeFileSync('resume_quiz.txt', updatedContent);
    } catch (error) {
        console.error('Error writing to the first line of the file:', error);
    }
}
function writeToFirstLineOfFileSeconds(data) {
    try {
        const fileContent = fs.readFileSync('seconds.txt', 'utf8');
        const lines = fileContent.split('\n');
        lines[0] = data;
        const updatedContent = lines.join('\n');
        fs.writeFileSync('seconds.txt', updatedContent);
    } catch (error) {
        console.error('Error writing to the first line of the file:', error);
    }
}

function promptDifficulty() {
    return new Promise((resolve, reject) => {
        rl.question("Please enter the difficulty (easy, hard): ", (difficulty) => {
            resolve(difficulty);
        });
    });
}

async function main() {
    var questions = loadQuestionsFromJson();
    questions = randomiseArray(questions);
    
    var score = 0;
    if(validateStructure){
       
    isFileEmpty('resume_quiz.txt')
    .then( (isEmpty) => {
    writeToFirstLineOfFile("0") // true or false
    })
    .catch( (err) => {
    });
    isFileEmpty('seconds.txt')
    .then( (isEmpty) => {
        writeToFirstLineOfFileSeconds("3") // true or false
    })
    .catch( (err) => {
    });
    
        console.log('Welcome to the quiz! \n');
        readFromSecondLine('resume_quiz.txt').then((line) => {  
            data = "";
            for( x in line){
                data += line[x]+'\n';
            }
            console.log('You have already played this game. Your previous answers were: \n'+data);
        }
        ).catch((error) => {    
            console.error(error);
        }
        );


        
            var answerSeconds = await readFirstLineFromFileSeconds();
            if(answerSeconds == "3" ){
                console.log('You are starting a new game.\nType exit to exit the quiz.\nThe default for each questoion is 3 seconds, but you can change it by typing your desired number of seconds.\nThe number of seconds you enter now will be the default for the next round you play when you log in again\nIf you want to keep the default enter 3 again.\n');
                console.log('How many seconds would you like to answer each question?');
                const answerSeconds = await secondsInput();
                if (answerSeconds !== null) {
                    console.log('You have ' + answerSeconds + ' seconds to answer each question.');
                    writeToFirstLineOfFileSeconds(answerSeconds);
                } else {
                    console.log('No input provided.');
                }
                
            }
            else{
                console.log('You are continuing your previous game.');
                console.log('You have ' + answerSeconds + ' seconds to answer each question.\nGood luck!\n');
            }
            
            
        await promptDifficulty().then((difficulty) => {   
            if (difficulty === 'easy') {
                questions = filterQuestionsByDifficulty(questions, 'easy');
            } else if (difficulty === 'hard') {
                questions = filterQuestionsByDifficulty(questions, 'hard');
            } else {
                console.log('Invalid input. Proceeding with all questions.');
            }
        }   
        ).catch((error) => {
            console.error(error);
        }
        );
        
       

        readFirstLineFromFile()
        .then(async (line) => {
            const number = parseInt(line);
            score = number;
            console.log('Your current score is: '+score);
             
        randomiseArray(questions);

        
        var i = 0;
        answerSeconds = await readFirstLineFromFileSeconds();
        var flag = true;

        function askQuestionWithTimer(seconds=answerSeconds) {

            console.log('\nWait until the timer finishes before typing anything else!');
            
            
            return new Promise((resolve, reject) => {
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    echo: false,
                    terminal: false
                });

                let secondsRemaining = seconds;


                function displayTimeRemaining() {
                    process.stdout.clearLine(); // Clear the current line in the console
                    process.stdout.cursorTo(0); // Move cursor to the start of the line
                    process.stdout.write(`Time remaining: ${secondsRemaining} seconds`);
        
                    if (secondsRemaining > 0) {
                        secondsRemaining -= 1;
                        setTimeout(displayTimeRemaining, 1000); // Update the time every second
                    }
                }
        
                displayTimeRemaining(); // Start displaying the time remaining
        
                // Set a timer for the time limit
                const now = new Date();
                var timerId = "timer"+now.getHours()+now.getMinutes()+now.getSeconds();

                var timerId = setTimeout(() => {
                    
                    flag=true;
                    clearTimeout(timerId); // Clear the timer when the time is up
                    rl.close();
                    resolve('');
                    i++;
                    writeToFirstLineOfFile(score);
                    askQuestionWithTimer(answerSeconds).then(
                    ).catch((error) => {
                        console.error(error);
                    });

                }, answerSeconds * 1000);

                if(flag){


                rl.question(stringOutput(questions[i], i), function (line) {
                    flag=false;
                    // Clear the timer when the user provides an answer
                    clearTimeout(timerId);
                    presentInChoices = function (line, choices) {
                        for (let i = 0; i < choices.length; i++) {
                            if (line.toLowerCase() === choices[i].toLowerCase()) {
                                return true;
                            }
                        }
                        return false;
                    }

                    if (line.toLowerCase() == "exit") {
                        rl.close();
                        
                        writeToFirstLineOfFile(score);
                        console.log('Your final score is: ' + score);
                        console.log('Thank you for playing!');
                        console.log('Your progress has been saved.');
                        console.log('Goodbye!');
                        console.log('Run the code again to continue playing.');
                        process.exit(0);
                        
                    } else if (line.toLowerCase() === questions[i].answer.toLowerCase()) {
                        score++;
                        console.log(`Correct!`);
                        resolve();
                        secondsRemaining = answerSeconds;
                        clearTimeout(timerId);
                        flag = false;

                       
                    } else if (presentInChoices(line, questions[i].choices)) {
                        console.log(`Incorrect! The correct answer is: ${questions[i].answer}`);
                        resolve();
                        secondsRemaining = answerSeconds;
                        clearTimeout(timerId);
                        flag = false;
                        
                    }else{
                        console.log('Invalid input. Proceed on to the next question.');
                        resolve();
                        secondsRemaining = answerSeconds;
                        clearTimeout(timerId);
                        flag = false;
                    }
                
                    console.log(`Your answer: ${line} and score is: ${score}`);
                    appendToFile('\n'+questions[i].question + ' Your answer: ' + line + ' The correct answer: ' + questions[i].answer + '\n');
                    
                    if (true) {
                        askQuestionWithTimer(seconds).then(
                        ).catch((error) => {
                            console.error(error);
                        });
                    } else {
                        console.log('Your final score is: ' + score);
                    }
                }
                
                );}
            });
        }
        askQuestionWithTimer(answerSeconds).then().catch((error) => {
            console.error(error);
        });
    });
       
 
   
    }
   
}
main();