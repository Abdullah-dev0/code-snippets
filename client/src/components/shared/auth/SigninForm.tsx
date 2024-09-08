import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { SigninSchema } from "../../../lib/formSchema/FormSchema";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import SocialLogin from "./SocialLogin";

export function SigninForm() {
	const Navigate = useNavigate();

	const form = useForm<z.infer<typeof SigninSchema>>({
		resolver: zodResolver(SigninSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: z.infer<typeof SigninSchema>) => {
			const response = await axios.post("/api/auth/signin", values);
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
			toast.success("Sign in successful.");
			Navigate("/dashboard", { replace: true });
		},
	});

	return (
		<div className="max-w-lg flex flex-col gap-8 justify-center items-center mx-auto w-full max-sm:px-6">
			<h1 className="text-4xl">Sign-in Form</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit((values) => mutate(values))} className="space-y-4 w-full">
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
					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? "Loading..." : "Submit"}
					</Button>
				</form>
			</Form>
			<SocialLogin />
		</div>
	);
}
