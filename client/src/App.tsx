import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const App = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [loginData, setLoginData] = useState<any>({
		username: "",
		password: "",
	});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);

		axios
			.post("/api/auth/signup", {
				email: formData.email,
				username: formData.username,
				password: formData.password,
			})
			.then((res) => console.log(res.data));
	};

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(loginData);
		const res = await axios.post("/api/auth/login", {
			username: loginData.username,
			password: loginData.password,
		});
		console.log(res);
	};

	const add = async () => {
		const res = await axios.post("/api/add", {
			message: "this is a message",
		});

		console.log(res.data);
	};

	const logoutHandler = async () => {
		console.log("logout");
		const res = await axios.get("/api/auth/logout");
		console.log(res);
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" name="username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
				<input type="email" name="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

				<input type="text" name="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
				<button type="submit">signup</button>
			</form>

			<form onSubmit={loginHandler}>
				<input type="text" name="username" onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />

				<input type="text" name="password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
				<button type="submit">Login</button>
			</form>

			<div className="flex gap-5 text-white">
				<button onClick={add}>Add</button>
				<button onClick={logoutHandler}>logout</button>

				<button
					onClick={() => {
						window.location.href = "/login/github";
					}}>
					Github
				</button>
			</div>
		</div>
	);
};

export default App;
