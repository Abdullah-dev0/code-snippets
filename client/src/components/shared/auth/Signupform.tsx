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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
					return;
				} else {
					toast.error("An unexpected error occurred. Please try again.");
				}
			}
			toast.error("An unexpected error occurred. Please try again.");
		},
		onSuccess: () => {
			toast.success("Sign up successfu please verify your email.");
			navigate("/Otp-verification", { replace: true });
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-3xl font-bold text-center">Welcome</CardTitle>
				<CardDescription className="text-center text-lg">Sign up</CardDescription>
			</CardHeader>
			<CardContent className="space-y-5">
				<Form {...form}>
					<form onSubmit={form.handleSubmit((values) => mutate(values))} className="space-y-4">
						<FormField
							control={form.control}
							name="username"
							disabled={isPending}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input type="username" placeholder="username" {...field} />
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
							name="password"
							disabled={isPending}
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
							{isPending ? "Signing up..." : "Sign up"}
						</Button>
					</form>
				</Form>
				<SocialLogin disabled={isPending} />
			</CardContent>
			<CardFooter className="flex justify-center">
				<p className="text-sm text-muted-foreground">
					By signing up, you agree to our{" "}
					<a href="#" className="underline">
						Terms of Service
					</a>{" "}
					and{" "}
					<a href="#" className="underline">
						Privacy Policy
					</a>
					.
				</p>
			</CardFooter>
		</Card>
	);
}
