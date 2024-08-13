import { useTimer } from "react-timer-hook";

export const useInterval = (fn: () => void) => {
	const time = new Date();
	time.setSeconds(time.getSeconds() + 59); // 1 minute countdown

	const { seconds, minutes, isRunning, restart } = useTimer({
		expiryTimestamp: time,
		onExpire: fn,
	});

	return { seconds, minutes, isRunning, restart };
};
