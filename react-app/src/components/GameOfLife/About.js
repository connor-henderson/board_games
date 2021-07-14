import React, { useState } from "react";
import johnConwayImg from "../../images/gameOfLife/john-conway.jpg";
import arrow from "../../images/gameOfLife/down_arrow.png";

export default function About() {
	const [show, setShow] = useState(false);

	return (
		<div className="about game-of-life">
			<div onClick={() => setShow(!show)} className="about-header">
				<div>About </div>
				<img src={arrow} className={`arrow show-${show}`} alt="arrow" />
			</div>
			{show && (
				<div className="info game-of-life">
					<p>
						Created by mathematician John Conway in 1970, the{" "}
						<a
							style={{
								display: "inline",
								textDecoration: "underline",
							}}
							href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
						>
							Game of Life
						</a>{" "}
						is Turing complete and one of the most well-known
						cellular automaton. Wikipedia describes it as a
						"zero-player game, meaning that its evolution is
						determined by its initial state, requiring no further
						input." Subsequent states are determined by the number
						of neighbor cells that were "alive" in the previous
						generation.
						<br></br>
						<br></br>
						The broader class of cellular automata are defined by
						the Stanford Encyclopedia of Philosophy as "discrete,
						abstract computational systems that have proved useful
						both as general models of complexity and as more
						specific representations of non-linear dynamics in a
						variety of scientific fields."
					</p>
					<img src={johnConwayImg} alt="John Conway" />
				</div>
			)}
		</div>
	);
}
