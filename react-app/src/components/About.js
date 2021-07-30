import React from "react";
import headshot from "../images/profile/headshot.jpg";
import github from "../images/profile/github.png";
import linkedIn from "../images/profile/linkedIn.jpeg";
import angelList from "../images/profile/angel_list.png";
import website from "../images/profile/website.png";

export default function About() {
	return (
		<div className="about-background">
			<div className="about-container">
				<div className="picture-container">
					<img
						src={headshot}
						alt="headshot"
						className="headshot"
					></img>
				</div>
				<div className="about-info">
					<p className="about-desc">
						Hi, I'm Connor Henderson, a Software Engineer in New
						York City.
						<br></br>
						<br></br>I wrote this website for the enjoyment of the
						logic of computers, board games, and writing board games
						on computers.
						<br></br>
						<br></br>
						Feel free to connect via the below links:
					</p>
					<div className="about-links">
						<a
							target="_blank"
							href="https://github.com/cch41/board_games"
						>
							<img
								style={{ height: "45px", width: "45px" }}
								src={github}
								alt="Github"
							/>
						</a>
						<a
							target="_blank"
							href="https://www.linkedin.com/in/connor-henderson-833504123/"
						>
							<img
								style={{ height: "45px", width: "45px" }}
								src={linkedIn}
								alt="LinkedIn"
							/>
						</a>
						<a
							target="_blank"
							href="https://angel.co/u/connor-henderson-2"
						>
							<img
								style={{ height: "45px", width: "45px" }}
								src={angelList}
								alt="Angel List"
							/>
						</a>
						<a target="_blank" href="https://cch41.github.io/">
							<img
								style={{ height: "45px", width: "45px" }}
								src={website}
								alt="personal website"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
