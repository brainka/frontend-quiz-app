import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import htmlLogo from '../assets/images/icon-html.svg';
import cssLogo from '../assets/images/icon-css.svg';
import jsLogo from '../assets/images/icon-js.svg';
import accessibilityLogo from '../assets/images/icon-accessibility.svg';

const ResultsPage = () => {
	const location = useLocation();
	const { score, topic, numberOfQuestions } = location.state;
	const navigate = useNavigate();

	function goBackToHomePage() {
		navigate('/');
	}

	const topicImages = {
		html: htmlLogo,
		css: cssLogo,
		javascript: jsLogo,
		accessibility: accessibilityLogo,
	};

	return (
		<div className="results-page">
			<h1>
				Quiz completed <span>You scored...</span>
			</h1>
			<div className="results-page-right">
				<div className="results">
					<div className="results-topic">
						<img src={topicImages[topic.toLowerCase()]} alt="" />
						<div>{topic}</div>
					</div>
					<div className="results-score">
						<span>{score}</span>
						<div>{`out of ${numberOfQuestions}`}</div>{' '}
					</div>
				</div>
				<button className="button-submit" onClick={goBackToHomePage}>
					Play again
				</button>
			</div>
		</div>
	);
};

export default ResultsPage;
