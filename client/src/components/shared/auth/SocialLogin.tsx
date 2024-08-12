import { Button } from "../../ui/button";

import { FaGithub, FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
	const onSubmit = (option: "Google" | "Github") => {
		option === "Github" ? (window.location.href = "/login/github") : (window.location.href = "/api/login/google");
	};
	return (
		<div className="flex justify-evenly w-full max-sm:flex-col max-sm:gap-3">
			<Button onClick={() => onSubmit("Google")}>
				<FaGoogle size={24} />
				<span className="px-2">Google</span>
			</Button>
			<Button onClick={() => onSubmit("Github")}>
				<FaGithub size={24} />
				<span className="px-2">Github</span>
			</Button>
		</div>
	);
};

export default SocialLogin;
