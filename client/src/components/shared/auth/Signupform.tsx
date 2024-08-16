import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { SignupSchema } from "../../../lib/formSchema/FormSchema";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import SocialLogin from "./SocialLogin";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { defaultValues } from "@/constants";

export function SignupForm() {
	const [error, setError] = useState<string | null>("");
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		const errorParam = searchParams.get("error");
		setError(errorParam);
	}, [searchParams]);

	const form = useForm<z.infer<typeof SignupSchema>>({
		resolver: zodResolver(SignupSchema),
		defaultValues: defaultValues,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: z.infer<typeof SignupSchema>) => {
			const response = await axios.post("/api/auth/signup", values);
			return response.data;
		},
		onError: (error: any) => {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					toast.error(error.response.data.error);
				}
			} else {
				toast.error("An unexpected error occurred. Please try again.");
			}
		},
		onSuccess: () => {
			toast.success("Sign up successfu please verify your email.");
			navigate("/Otp-verification");
		},
	});

	return (
		<div className="max-w-lg flex flex-col gap-8 justify-center items-center mx-auto w-full max-sm:px-6">
			<h1 className="text-4xl">Sign-up Form</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit((values) => mutate(values))} className="space-y-4 w-full">
					<FormField
						disabled={isPending}
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input type="text" placeholder="Username" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						disabled={isPending}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="Email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						disabled={isPending}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
								{error && <p className="text-md bg-red-500 p-2 w-full text-white text-center">{error}</p>}
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? "Loading..." : "Submit"}
					</Button>
				</form>
			</Form>
			<SocialLogin disabled={isPending} />
		</div>
	);
}
