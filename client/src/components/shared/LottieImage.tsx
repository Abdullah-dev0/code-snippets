import Lottie from "react-lottie";
import programming1 from "../../public/programming1.json";

const LottieImage = () => {
	return (
		<div className="h-screen hidden bg-gradient-to-b from-blue-500 to-violet-600 lg:flex flex-col items-center justify-center px-4">
			<div>
				<Lottie
					options={{
						loop: true,
						animationData: programming1,
						autoplay: true,
						rendererSettings: {
							preserveAspectRatio: "xMidYMid slice",
						},
					}}
				/>
			</div>
		</div>
	);
};

export default LottieImage;
