import { useState, useEffect } from "react";
import axios from "axios";

export const useCurrentUser = () => {
	const [user, setUser] = useState<any>("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getCurrentUser = async () => {
			try {
				const res = await axios.get("/api/getCurrentUser");
				setUser(res.data);
			} catch (err: any) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		getCurrentUser();
	}, []);

	return { user, loading, error };
};
