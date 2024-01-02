# Quiz Application

This is a JavaScript-based quiz application that allows users to play a quiz by answering various questions. The application interacts with the file system to manage user progress, read questions from JSON files, and set time limits for answering each question.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Structure](#structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The quiz application is built using Node.js and uses various file system operations to manage user progress and read questions from external JSON files. It implements a timer mechanism to set time limits for answering questions.

## Features

### Welcome and Progress Retrieval

Upon starting the quiz application, users are greeted with a welcome message. If the user has previously played the quiz, the application retrieves and displays the user's previous answers stored in the `resume_quiz.txt` file.

### Customizing Quiz Settings

The application allows users to customize their quiz settings:

- **Setting Answer Time:** Users can set the time limit to answer each question. By default, it's set to 3 seconds. Users can modify this time limit by providing a new duration in seconds. The chosen time becomes the default for subsequent rounds.
- **Difficulty Selection:** Users can select the difficulty level for the quiz by entering 'easy' or 'hard'. Based on the selected difficulty, questions of that level are fetched.

### Quiz Execution

The quiz begins after the settings are configured:

- **Question Presentation:** Questions are displayed sequentially to the user with randomized answer choices for added challenge. The user is prompted to provide an answer.
- **Answer Time Limit:** Each question has a time limit for answering, displayed to the user. If the time elapses before the user responds, the application proceeds to the next question automatically.
- **User Interaction:** Users provide answers by typing their response in the console. The application accepts and processes these inputs.
- **Validating Answers:** User responses are validated against the correct answer. If the answer is correct, the user's score increases. Incorrect answers prompt the display of the correct answer.
- **Saving Progress:** The user's current score and progress are continuously saved in the `resume_quiz.txt` file as they progress through the quiz.

### Exiting the Quiz

Users can exit the quiz at any time by typing 'exit'. Exiting the quiz displays the user's final score, saves the progress, and terminates the application.

### Error Handling

The application includes error handling for scenarios like invalid inputs, file reading/writing errors, and unexpected behaviors to provide a smoother user experience.

### File Operations

The application performs various file operations, such as reading and writing to files (`resume_quiz.txt`, `seconds.txt`) to manage user progress, store settings, and retrieve saved information.

### Validation

The application validates the structure of quiz questions, ensuring each question contains the necessary attributes (`answer`, `choices`, `question`) and follows specific guidelines.

## Future Enhancements

The quiz application can be expanded with additional features such as:

- **Multiple Choice Options:** Allowing more diverse answer options for each question.
- **Scoring System:** Implementing a scoring system based on the difficulty of the question answered correctly.
- **User Profiles:** Enabling multiple user profiles to maintain separate progress for different users.
- **GUI Interface:** Building a graphical user interface for an improved user experience.
- **Leaderboard:** Implementing a leaderboard to display high scores or rankings.

These enhancements would enhance user engagement and provide a more comprehensive quiz-taking experience.


## Installation

1. Clone the repository.
2. Install Node.js on your system if not already installed.
3. Run `npm install` to install dependencies.

## Usage

Make sure resume_quiz.txt has a 0 at the beginning of the file.

1. Run the application using `node your_main_file.js`.
2. Follow the on-screen instructions to play the quiz.
3. Enter your answers within the specified time limit.
4. Type "exit" to exit the quiz at any time.

## Structure
File Operations

resume_quiz.txt: Stores user progress, including current score and answers.
seconds.txt: Keeps track of the default time limit set by the user for answering questions.
Functions
File Operations:

isFileEmpty(fileName): Checks if a file is empty.
readFromSecondLine(fileName): Reads file content starting from the second line.
readFirstLineFromFile(): Reads the first line of a file.
readFirstLineFromFileSeconds(): Reads the first line of the seconds.txt file.
secondsInput(): Takes user input for setting time limits.
loadQuestionsFromJson(): Loads quiz questions from a JSON file.
writeToFirstLineOfFile(data): Writes data to the first line of resume_quiz.txt.
writeToFirstLineOfFileSeconds(data): Writes data to the first line of seconds.txt.
appendToFile(data): Appends data to the resume_quiz.txt file.
Validation:

validateStructure(questions): Validates the structure of quiz questions.
Randomization:

randomiseArray(array): Randomizes the order of items in an array.
Question Filtering:

filterQuestionsByDifficulty(questions, difficulty): Filters questions by difficulty level.
User Interaction:

promptDifficulty(): Prompts the user to select the difficulty level for the quiz.
Quiz Execution:

main(): The main function orchestrating the entire quiz application.
askQuestionWithTimer(seconds): Asks a question with a timer to limit the answering time.
stringOutput(question, i): Formats the question and its choices for user presentation.

### File Operations

The application performs various file operations using Node.js `fs` module:

- Read and write to text files (`resume_quiz.txt` and `seconds.txt`) to manage user progress and time settings.
- Read questions from `quiz_questions.json`.

### Functions

- `isFileEmpty(fileName, ignoreWhitespace=true)`: Check if a file is empty.
- `readFromSecondLine(fileName)`: Read contents from the second line of a file.
- `readFirstLineFromFile()`: Read the first line from a file.
- `readFirstLineFromFileSeconds()`: Read the first line from `seconds.txt`.
- `secondsInput()`: Take user input for seconds.

## Contributing

Contributions are welcome! You can contribute to the project by raising issues or submitting pull requests.

## License

This project is licensed under the Lejla Doric License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, feel free to contact Lejla Doric via (lejladoric00@gmail.com) or [GitHub](https://github.com/leejlaa).
