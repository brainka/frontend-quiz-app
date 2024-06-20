import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const QuizPage = () => {
	const location = useLocation();
	const { topic } = location.state;
	const [quizData, setQuizData] = useState([]);
	const [quizQuestions, setquizQuestions] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const questionOrder = ['A', 'B', 'C', 'D'];
	const [selectedAnswer, setSelectedAnswer] = useState(undefined);
	const [selectedAnswers, setSelectedAnswers] = useState({
		answerSelected: undefined,
		buttonSelected: undefined,
	});
	const [quizAnswer, setQuizAnswer] = useState('');
	const [submittedAnswer, setSubmittedAnswer] = useState(false);
	const [correct, setCorrect] = useState();

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

	// console.log(quizAnswer);

	function incrementCurrentIndex() {
		setCurrentIndex(currentIndex + 1);
		setSubmittedAnswer(false);
	}

	function handleAnswerSelection(e, buttonIndexSelected) {
		console.log(buttonIndexSelected);
		console.log(e.target.innerText);
		// setSelectedAnswer(e.target.innerText);
		setSelectedAnswers({
			answerSelected: e.target.innerText,
			buttonSelected: buttonIndexSelected,
		});
	}

	console.log(selectedAnswers.answerSelected);

	function handleAnswerSubmit() {
		// console.log('submitted answer');
		console.log(selectedAnswers.answerSelected);
		setSubmittedAnswer(true);

		//you can only submit once
		if (selectedAnswers.answerSelected === quizAnswer) {
			console.log('correct answer');
			setCorrect(true);

			//set style to green
		} else if (selectedAnswers.answerSelected !== quizAnswer) {
			//set it to red
			console.log('wrong answer');
			setCorrect(false);
		}
	}

	return (
		<div>
			{quizAnswer}
			{`Question ${currentIndex + 1} of ${quizQuestions.length}`}
			{quizQuestions[currentIndex]?.question}
			<input
				id="completed-percentage"
				type="range"
				min={0}
				max={quizQuestions.length}
				value={currentIndex}
				readOnly
			></input>
			{quizQuestions[currentIndex]?.options.map((element, index) => (
				<div key={index}>
					<div>{questionOrder[index]}</div>
					<button
						onClick={(e) => handleAnswerSelection(e, index)}
						className={
							index === selectedAnswers.buttonSelected
								? submittedAnswer
									? correct
										? 'correct'
										: 'incorrect'
									: ''
								: ''
						}
						disabled={submittedAnswer}
					>
						{element}
					</button>
				</div>
			))}
			{!submittedAnswer ? (
				<button onClick={handleAnswerSubmit}>Submit Answer</button>
			) : (
				<button onClick={incrementCurrentIndex}>Next Question</button>
			)}
		</div>
	);
};

export default QuizPage;
