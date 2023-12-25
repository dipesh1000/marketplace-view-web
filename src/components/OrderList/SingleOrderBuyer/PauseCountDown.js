import React, {useState} from "react";

function PauseCountDown({myDays, myHours, myMinutes, mySeconds}) {
	// eslint-disable-next-line
	const [countdowns, setCountdowns] = useState([
		{
			id: 1,
			classNames: "time-left",
			wrapperClassName: "time-top",
			desc: "Days",
		},
		{
			id: 2,
			classNames: "time-left",
			wrapperClassName: "time-top",
			desc: "Hours",
		},
		{
			id: 3,
			classNames: "time-left",
			wrapperClassName: "time-top",
			desc: "Minutes",
		},
		{
			id: 4,
			classNames: "time-left fold always ",
			wrapperClassName: "time-top flip always ",
			desc: "Seconds",
		},
	]);
	return (
		<div className='countdown'>
			<div className='timer-wrap'>
				{countdowns.map(({id, classNames, wrapperClassName, desc}, index) => {
					return (
						<div className={desc.toLowerCase()} key={id}>
							<div className='time'>
								<span className={classNames}>
									{index === 3
										? mySeconds
										: index === 2
										? myMinutes
										: index === 1
										? myHours
										: myDays}
								</span>
								<div className='half-circle-left'></div>
								<div className={wrapperClassName}></div>
								<div className='fake-time-top'></div>
								<div className='time-bottom'></div>
								<div className='half-circle-right'></div>
							</div>

							<p className='desc'>{desc}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default PauseCountDown;
