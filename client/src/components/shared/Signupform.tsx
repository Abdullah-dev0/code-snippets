import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { SignupSchema } from "../../lib/formSchema/FormSchema";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";

export function SignupForm() {
	const Navigate = useNavigate();
	// 1. Define your form.
	const form = useForm<z.infer<typeof SignupSchema>>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof SignupSchema>) {
		try {
			const response = await axios.post("/api/auth/signup", values);
			console.log(response);
			if (response.status === 200 && response.statusText == "OK") {
				toast.success("Sign up successful. Please check your email for verification.");
				Navigate("/Otp-verification");
			} else {
				// Handle unexpected successful response
				toast.error("Something went wrong. Please try again.");
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				toast.error("An error occurred while signing up. Please try again.");
				if (error.response?.status === 409) {
					// Handle username or email conflict
					toast.error(error.response.data.error);
				} else {
					// Handle other server-side errors
					toast.error("These was an error on the server. Please try again.");
				}
			} else {
				toast.error("An error occurred while signing up. Please try again.");
			}
		}
	}

	return (
		<div className="max-w-lg flex flex-col gap-8 justify-center items-center mx-auto w-full max-sm:px-6">
			<h1 className="text-4xl">Sign-Up Form</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
					<FormField
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
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
