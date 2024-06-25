import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import errorLogo from '../assets/images/icon-error.svg';

import htmlLogo from '../assets/images/icon-html.svg';
import cssLogo from '../assets/images/icon-css.svg';
import jsLogo from '../assets/images/icon-js.svg';
import accessibilityLogo from '../assets/images/icon-accessibility.svg';

import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
	const location = useLocation();
	const { topic } = location.state;
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
	const [errorMessage, setErrorMessage] = useState(false);

	const sliderMin = 1;
	const sliderMax = quizQuestions.length;

	const [sliderProgress, setSliderProgress] = useState(0);

	const topicImages = {
		html: htmlLogo,
		css: cssLogo,
		javascript: jsLogo,
		accessibility: accessibilityLogo,
	};

	const navigate = useNavigate();

	console.log(currentIndex + 1);

	useEffect(() => {
		async function fetchData() {
			const url = '/data.json';
			const response = await fetch(url);
			const data = await response.json();

			data.quizzes.filter((element) => {
				if (element.title === topic) {
					setquizQuestions(element.questions);
					setQuizAnswer(element.questions[currentIndex].answer);
				}
			});
		}
		fetchData();
	}, [topic, currentIndex]);

	function incrementCurrentIndex() {
		if (currentIndex + 1 === sliderMax) {
			//navigate to another page
			navigate('/results', { state: { score: score, topic: topic } });
			return;
		}

		setCurrentIndex(currentIndex + 1);
		setSubmittedAnswer(false);
		setselectedAnswer({});

		const sliderValue = currentIndex + 1;
		const progress = (sliderValue / sliderMax) * 100;
		setSliderProgress(progress);
	}

	function handleAnswerSelection(e, buttonIndexSelected) {
		setErrorMessage(false);

		!submittedAnswer &&
			setselectedAnswer({
				answerSelected: e.currentTarget.querySelector('.quiz-option').innerText,
				buttonSelected: buttonIndexSelected,
			});
	}

	function handleAnswerSubmit() {
		// console.log(e.target.value);

		if (!selectedAnswer.answerSelected) {
			setErrorMessage(true);
			return;
		}

		setSubmittedAnswer(true);

		//you can only submit once
		if (selectedAnswer.answerSelected === quizAnswer) {
			setCorrect(true);
			setScore(score + 1);

			//set style to green
		} else if (selectedAnswer.answerSelected !== quizAnswer) {
			setCorrect(false);
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
			if (submittedAnswer) {
				return correct ? 'correct' : 'incorrect';
			}
			return 'active-selected';
		}

		if (submittedAnswer && quizQuestion === quizAnswer) {
			return 'not-selected-correct-answer ';
		}
		return '';
	}

	function QuizOption({ questionOrder, index, submittedAnswer, quizQuestion }) {
		return (
			<button
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
				<div className="quiz-option">{quizQuestion}</div>
			</button>
		);
	}

	return (
		<div className="quizPage">
			<div className="selectedTopic">
				<img src={topicImages[topic.toLowerCase()]} alt="" />
				<div>{topic}</div>
			</div>

			<div className="quiz-page-container">
				<div className="quiz-page-container-left">
					<div className="quiz-info-container">
						<div className="question-counter">{`Question ${
							currentIndex + 1
						} of ${quizQuestions.length}`}</div>
						{/* {score} */}
						<div className="quiz-question">
							{quizQuestions[currentIndex]?.question}
						</div>
					</div>
					<div className="slider-container">
						<input
							id="slider"
							type="range"
							min={sliderMin}
							max={sliderMax}
							value={currentIndex}
							style={{
								background: `linear-gradient(to right, hsl(277, 91%, 56%) ${sliderProgress}%,  hsl(0, 0%, 100%) ${sliderProgress}%)`,
							}}
							// readOnly
						/>
					</div>
				</div>
				<div className="quiz-page-container-right">
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
					<div className={`error-message ${!errorMessage && 'hidden'}`}>
						<img src={errorLogo} alt="" />
						<span>Please select an answer</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuizPage;
