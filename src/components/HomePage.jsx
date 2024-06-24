import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import htmlLogo from '../assets/images/icon-html.svg';
import cssLogo from '../assets/images/icon-css.svg';
import jsLogo from '../assets/images/icon-js.svg';
import accessibilityLogo from '../assets/images/icon-accessibility.svg';

const HomePage = () => {
	const [topics, setTopics] = useState([]);
	const topicImages = {
		html: htmlLogo,
		css: cssLogo,
		javascript: jsLogo,
		accessibility: accessibilityLogo,
	};

	useEffect(() => {
		async function fetchData() {
			const url = '/data.json';
			const response = await fetch(url);
			const data = await response.json();
			console.log(data.quizzes);
			setTopics((topics) => [...data.quizzes.map((topic) => topic.title)]);
		}
		fetchData();
	}, []);

	topics.map((ele) => console.log(ele));

	return (
		<div className="homepage">
			<div className="homepage-left">
				<h1>
					Welcome to the <span>Frontend Quiz!</span>
				</h1>
				<p>
					<span>Pick a subject to get started.</span>
				</p>
			</div>

			<div className="homepage-right">
				{topics.map((topic) => {
					const topicLowercase = topic.toLowerCase();
					const topicImage = topicImages[topicLowercase];
					return (
						<Link
							key={topic}
							to={`/quiz/${topicLowercase}`}
							state={{ topic: topic }}
						>
							<div className='image-container'>
								<img className={topic} src={topicImage} alt="" />
							</div>
							{topic}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default HomePage;
