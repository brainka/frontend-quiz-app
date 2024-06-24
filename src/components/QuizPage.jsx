import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const QuizPage = () => {
	const location = useLocation();
	const { topic } = location.state;

	console.log(topic);

	const [quizData, setQuizData] = useState([]);
	const [quizQuestions, setquizQuestions] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const questionOrder = ['A', 'B', 'C', 'D'];
	const [selectedAnswer, setselectedAnswer] = useState({
		answerSelected: undefined,
		buttonSelected: undefined,
	});
	const [quizAnswer, setQuizAnswer] = useState('');
	const [submittedAnswer, setSubmittedAnswer] = useState(false);
	const [correct, setCorrect] = useState();
	const [score, setScore] = useState(0);

	useEffect(() => {
		async function fetchData() {
			const url = '/data.json';
			const response = await fetch(url);
			const data = await response.json();
			// console.log(data.quizzes);
			// console.log(data);

			data.quizzes.filter((element) => {
				if (element.title === topic) {
					// console.log(element.title === topic);
					// console.log(element.questions[currentIndex].answer);
					setquizQuestions(element.questions);
					setQuizAnswer(element.questions[currentIndex].answer);
				}
			});
		}
		fetchData();
	}, [topic, currentIndex]);

	function incrementCurrentIndex() {
		setCurrentIndex(currentIndex + 1);
		setSubmittedAnswer(false);
		setselectedAnswer({});
	}

	function handleAnswerSelection(e, buttonIndexSelected) {
		console.log(buttonIndexSelected);
		console.log(e.target.innerText);
		// setSelectedAnswer(e.target.innerText);
		!submittedAnswer &&
			setselectedAnswer({
				answerSelected: e.currentTarget.querySelector('button').innerText,
				buttonSelected: buttonIndexSelected,
			});
	}

	console.log(selectedAnswer.answerSelected);

	function handleAnswerSubmit() {
		// console.log('submitted answer');

		console.log(selectedAnswer.answerSelected);
		setSubmittedAnswer(true);

		//you can only submit once
		if (selectedAnswer.answerSelected === quizAnswer) {
			console.log('correct answer');
			setCorrect(true);
			setScore(score + 1);

			//set style to green
		} else if (selectedAnswer.answerSelected !== quizAnswer) {
			//set it to red
			console.log('wrong answer');
			setCorrect(false);
			//need to display the correct answer
		}
	}

	function getButtonClass(
		submittedAnswer,
		quizQuestion,
		quizAnswer,
		index,
		selectedAnswer,
		correct
	) {
		if (index === selectedAnswer.buttonSelected) {
			console.log('second hello');
			if (submittedAnswer) {
				return correct ? 'correct' : 'incorrect';
			}
			console.log('third hello');
			return 'active-selected';
		}

		if (submittedAnswer && quizQuestion === quizAnswer) {
			console.log('first hello');
			return 'not-selected-correct-answer ';
		}
		return '';
	}

	function QuizOption({ questionOrder, index, submittedAnswer, quizQuestion }) {
		return (
			<div
				// className="quiz-button-container"
				key={index}
				onClick={(e) => handleAnswerSelection(e, index)}
				disabled={submittedAnswer}
				className={`quiz-button-container ${getButtonClass(
					submittedAnswer,
					quizQuestion,
					quizAnswer,
					index,
					selectedAnswer,
					correct
				)}`}
			>
				<div className="question-order">{questionOrder[index]}</div>
				<button>{quizQuestion}</button>
			</div>
		);
	}

	return (
		<div className="quiz-page-container">
			<div className="quiz-page-container-left">
				<div className="quiz-info-container">
					<div className="question-counter">{`Question ${currentIndex + 1} of ${
						quizQuestions.length
					}`}</div>
					{/* {score} */}
					<div className="quiz-question">
						{quizQuestions[currentIndex]?.question}
					</div>
				</div>
				<input
					id="completed-percentage"
					type="range"
					min={0}
					max={quizQuestions.length}
					value={currentIndex}
					// readOnly
				/>
			</div>
			<div className="quiz-page-container-right">
				{' '}
				{quizQuestions[currentIndex]?.options.map((quizQuestion, index) => (
					<QuizOption
						key={index}
						questionOrder={questionOrder}
						index={index}
						submittedAnswer={submittedAnswer}
						quizQuestion={quizQuestion}
					/>
				))}
				{!submittedAnswer ? (
					<button className="button-submit" onClick={handleAnswerSubmit}>
						Submit Answer
					</button>
				) : (
					<button className="button-submit" onClick={incrementCurrentIndex}>
						Next Question
					</button>
				)}
			</div>
		</div>
	);
};

export default QuizPage;
