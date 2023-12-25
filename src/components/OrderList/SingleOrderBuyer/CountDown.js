import React, {useState, useEffect} from "react";

const CountDown = ({myDays, myHours, myMinutes, mySeconds}) => {
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
	const {days = 0, hours = 0, minutes = 0, seconds = 60} = {
		minutes: myMinutes,
		hours: myHours,
		days: myDays,
		seconds: mySeconds,
	};
	const temp = [...countdowns];

	const [[ndays, hrs, mins, secs], setTime] = useState([
		days,
		hours,
		minutes,
		seconds,
	]);

	const tick = () => {
		if (ndays === 0 && hrs === 0 && mins === 0 && secs === 0) {
			setTime([0, 0, 0, 0]);
		} else if (hrs === 0 && mins === 0 && secs === 0) {
			setTime([ndays - 1, 23, 59, 59]);
			temp[0].classNames = "time-left fold";
			temp[0].wrapperClassName = "time-top flip";
		} else if (mins === 0 && secs === 0) {
			setTime([ndays, hrs - 1, 59, 59]);
			temp[1].classNames = "time-left fold";
			temp[1].wrapperClassName = "time-top flip";
		} else if (secs === 0) {
			setTime([ndays, hrs, mins - 1, 59]);
			temp[2].classNames = "time-left fold";
			temp[2].wrapperClassName = "time-top flip";
		} else {
			setTime([ndays, hrs, mins, secs - 1]);
		}
	};

	useEffect(() => {
		const timerId = setInterval(() => tick(), 1000);
		return () => clearInterval(timerId);
	});
	// setInterval(() => {
	//   sec = sec - 1;
	//   if (sec === 0) {
	//     temp[2].classNames = "time-left fold";
	//     temp[2].wrapperClassName = "time-top flip";
	//     setTimeout(() => {
	//       min = min - 1;
	//     }, 900);
	//     sec = 59;
	//   }
	//   if (min === 0) {
	//     if (min === 0 && hours === 0) {
	//       min = 0;
	//     } else {
	//       temp[1].classNames = "time-left fold";
	//       temp[1].wrapperClassName = "time-top flip";
	//       setTimeout(() => {
	//         hours = hours - 1;
	//       }, 900);
	//       min = 59;
	//     }
	//   }
	//   if (hours === 0) {
	//     if (hours === 0 && days === 0) {
	//       hours = 0;
	//     } else {
	//       temp[0].classNames = "time-left fold";
	//       temp[0].wrapperClassName = "time-top flip";
	//       setTimeout(() => {
	//         days = days - 1;
	//       }, 900);
	//       hours = 23;
	//     }
	//   }

	//   sec && setSeconds(sec);
	//   temp && setCountdowns(temp);
	//   min && setMinutes(min);
	//   hours && setHours(hours);
	//   days && setDays(days);
	//   resetClassNames();
	// }, 1000);

	// eslint-disable-next-line
	const resetClassNames = () => {
		let temp = [...countdowns];
		for (let i = 0; i < temp.length; i++) {
			if (i === 3) continue;
			const element = temp[i];
			element.classNames = "time-left";
			element.wrapperClassName = "time-top";
		}
	};
	return (
		<div className='countdown'>
			<div className='timer-wrap'>
				{countdowns.map(({id, classNames, wrapperClassName, desc}, index) => {
					return (
						<div className={desc.toLowerCase()} key={id}>
							<div className='time'>
								<span className={classNames}>
									{index === 3
										? secs
										: index === 2
										? mins
										: index === 1
										? hrs
										: ndays}
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
};

export default CountDown;
