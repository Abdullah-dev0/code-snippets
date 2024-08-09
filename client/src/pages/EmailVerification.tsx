import axios from "axios";
import { useCurrentUser } from "../Hooks/useCurrentUser";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EmailVerification = () => {
	const { user, loading, error } = useCurrentUser();

	useEffect(() => {
		if (user?.emailVerified) {
			Navigate("/");
		}
	}, []);

	const Navigate = useNavigate();
	const onsubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());
		const res = await axios.post("/api/email-verification", data);
		console.log(res);

		if (res.status === 200) {
			console.log("Email verified successfully");
			Navigate("/");
		}
	};
	return (
		<div>
			<form onSubmit={onsubmit}>
				<label htmlFor="code">Code</label>
				<input type="number" name="code" id="code" />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default EmailVerification;
