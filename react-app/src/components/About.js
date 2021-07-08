import React from "react";
import headshot from "../images/profile/headshot.jpg";
import github from "../images/profile/github.png";
import linkedIn from "../images/profile/linkedIn.jpeg";

export default function About() {
	return (
		<>
			<div className="about-container">
				<img src={headshot} className="headshot"></img>
				<p>
					This website is for enjoying the logic of computers, board
					games, and writing board games on computers
				</p>
			</div>
			<div className="about-links">
				<a href="https://github.com/cch41">
					<img
						style={{ heigth: "30px", width: "30px" }}
						src={github}
					/>
				</a>
				<a href="https://www.linkedin.com/in/connor-henderson-833504123/">
					<img
						style={{ heigth: "30px", width: "30px" }}
						src={linkedIn}
					/>
				</a>
			</div>
		</>
	);
}
