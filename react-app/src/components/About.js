import React from "react";
import headshot from "../images/profile/headshot.jpg";
import github from "../images/profile/github.png";
import linkedIn from "../images/profile/linkedIn.jpeg";

export default function About() {
	return (
		<div className="about-container">
			<div className="picture-container">
				<img src={headshot} alt="headshot" className="headshot"></img>
			</div>
			<div className="about-info">
				<p className="about-desc">
					This website is for enjoying the logic of computers, board
					games, and writing board games on computers
				</p>
				<div className="about-links">
					<a href="https://github.com/cch41">
						<img
							style={{ heigth: "45px", width: "45px" }}
							src={github}
							alt="Github"
						/>
					</a>
					<a href="https://www.linkedin.com/in/connor-henderson-833504123/">
						<img
							style={{ heigth: "45px", width: "45px" }}
							src={linkedIn}
							alt="LinkedIn"
						/>
					</a>
				</div>
			</div>
		</div>
	);
}
