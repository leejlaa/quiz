import json
import random
import signal
import sys
import time
import threading

def countdown_timer(seconds, question):
    print(f"You have {seconds} seconds to input your answer.")
    display_question(question)

    def timer_thread():
        for i in range(seconds, 0, -1):
            print(f"\rRemaining time: {i} seconds", end="")
            time.sleep(1)
        print('\nType enter or ctrl + c to continue to the next question.')
        return None
    
    timer = threading.Thread(target=timer_thread)
    timer.start()

    try:
        answer = None
        if answer is None:
            answer = input("\nYour answer: ").lower()
            if answer == 'exit':
                timer.join()  # Wait for the timer thread to finish
                return 'exit'
            elif answer!='' and answer not in list(map(str.lower,question['choices'] )):
                timer.join()
                print("Invalid answer. Please choose one of the provided choices.")
                countdown_timer(seconds, question)
                answer = None
            elif check_answer(question, answer):
                timer.join()
                return answer

        timer.join()  # Wait for the timer thread to finish

        if answer and check_answer(question, answer.lower()):
            timer.join()
            print('The answer is correct!')
        elif answer!='' and answer !=None and answer in list(map(str.lower,question['choices'] )):
            timer.join()
            print(f"The selected choice '{answer}' is incorrect! The correct answer is '{question['answer']}'.")

        return answer

    except KeyboardInterrupt:
        print("\nCountdown stopped due to keyboard interrupt.")
        timer.join()  # Wait for the timer thread to finish
        return None
    

def save_data_on_exit(data):
    with open('resume_quiz.txt', 'w') as file:
        file.write(data)
        print("Data saved to file.")

def read_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            file.readline()
            file_content = file.read()
            if file_content:
                 return file_content
            else:
                 print("File is empty.")
    except FileNotFoundError:
        print("File not found.")

def write_to_file(file_path, content):
    try:
        with open(file_path, 'a') as file:
            file.write(content+"\n")
    except FileNotFoundError:
        print("File not found.")
def write_to_file2(file_path, content):
    try:
        with open(file_path, 'w') as file:
            file.write(content+"\n")
    except FileNotFoundError:
        print("File not found.")

file_path = 'resume_quiz.txt'
file_object = open(file_path, 'r')

def load_questions_from_json(path):
    with open(path, 'r') as f:
        questions = json.load(f)
    return questions

def validate_file_structure(questions):
    valid = False
    for x in questions:
        if(x['answer'] and len(x['answer']) != 0 and x['choices'] and len(x['choices'])>3 and len(x['choices'])<7 and x['question'] and len(x['question']) != 0):
            return True
      
    return valid

def generate_quiz_questions(questions, difficulty, amount=10):
    filtered_questions = [q for q in questions if q.get('difficulty') == difficulty]
    random.shuffle(filtered_questions)
    return filtered_questions[:amount]

def display_question(question):
    print(question["question"])
    choices = question['choices']
    for x in choices:
        print("~"+x)
    

# def grade_quiz(quiz, user_answers):
#     correct_answers = 0
#     incorrect_answers = 0

#     for question, user_answer in zip(quiz, user_answers):
#         if user_answer == question["answer"]:  
#             correct_answers += 1
#         else:
#             incorrect_answers += 1

#     return correct_answers, incorrect_answers

def check_answer(question, user_answer):
        if user_answer == question["answer"]:
            return True
        else:
            return False

def main():
    questions = load_questions_from_json('quiz_questions.json')
    if validate_file_structure(questions):

        print("Welcome to the quiz!")
        score = file_object.readline()

        line = file_object.readline()

        if line:
            print("You have already taken the quiz. Your score is: " + str(score)+"\n Previous answers:\n"+"You can exit the quiz at any time by pressing ctrl + c, no worries your progress will be saved.")
            while(line):
                print(line)
                line = file_object.readline()
            
            print("Enter your desired difficulty level for the next round of quiz: \n 1. Easy \n 2. Hard \n")
            difficulty = input("Your answer: ").lower()
            while(difficulty != 'easy' and difficulty != 'hard'):
                print("Enter your desired difficulty level for the next round of quiz: \n 1. Easy \n 2. Hard \n")
                difficulty = input("Your answer: ")
            try:
                amount = int(input("Enter the number of questions you want for this round: "))
            except ValueError:
                print("Please enter a valid number of seconds.")
                amount=3
            quiz = generate_quiz_questions(questions, difficulty,amount)
            
            
        else:
            print("You have not taken the quiz yet, enter your desired difficulty level: \n 1. Easy \n 2. Hard \n")
            difficulty = input("Your answer: ").lower()
            while(difficulty != 'easy' and difficulty != 'hard'):
                print("Enter your desired difficulty level for the next round of quiz: \n 1. Easy \n 2. Hard \n")
                difficulty = input("Your answer: ")
            print("You have chosen: " + difficulty+"\n"+"Good luck!"+ "\n"+"You can exit the quiz at any time by pressing 0, no worries your progress will be saved.")
            amount = int(input("Enter the number of questions you want for this round: "))
            quiz = generate_quiz_questions(questions, difficulty,amount)


        while True:
            seconds = input("Enter the amount of seconds: ")
            try:
                seconds = int(seconds)
                break
            except ValueError:
                print("Invalid input. Please enter a number.")

        data = ""
        if score:
            localScore = int(score)
        else:
            localScore = 0

        for question in quiz:
            answer = countdown_timer(seconds, question)
            
            if(answer == None or answer == ""):
                answer = "No answer"
            print(answer)
            
            
            if answer != 'exit' and check_answer(question, answer):
                print("Correct answer!")
                localScore += 1
            
                data = data + "Question: " + question["question"] + "\n" + "Your answer: " + answer + "\n" + "Correct answer: " + question["answer"] + "\n" 
                write_to_file('resume_quiz.txt', data)
                data=""
                print('Your score is: ' + str(localScore))  
            elif answer == "No answer":

                data = data + "Question: " + question["question"] + "\n" + "Your answer: " + answer + "\n" + "Correct answer: " + question["answer"] + "\n" 
                write_to_file('resume_quiz.txt', data)
                data=""
                print('Your score is: ' + str(localScore))  

            elif answer == 'exit':
                data = data + "Question: " + question["question"] + "\n" + "Your answer: " + "No answer " + "\n" + "Correct answer: " + question["answer"] + "\n" 
                write_to_file('resume_quiz.txt', data)
                print('Finishing the quiz..run the code again to proceed to the next round :)')
                print('Your score is: ' + str(localScore))
                
                
                previous_answers = read_from_file('resume_quiz.txt')
                save_data_on_exit(str(localScore)+'\n')
                write_to_file('resume_quiz.txt', previous_answers)
                sys.exit(0)
        print('Finishing the quiz..run the code again to proceed to the next round :)\n')
        print('Your score is: ' + str(localScore))
        sys.exit(0)
    else:
        print('Invalid file structure, proceed to fix the JSON file format and then you can play the quiz.')

main()
    
    


main()
