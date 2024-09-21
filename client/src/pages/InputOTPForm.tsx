import Logout from "@/components/shared/Logout";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useInterval } from "@/Hooks/useInterval";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
	pin: z.string().min(4, {
		message: "Verification code must be 4 Digits.",
	}),
});

export function InputOTPForm() {
	const Navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const { seconds, isRunning, restart } = useInterval(() => {
		toast.error("Code Expired ! Please Request a new");
		return;
	});
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: "",
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: z.infer<typeof FormSchema>) => {
			const response = await axios.post("/api/email-verification", values);
			return response;
		},
		onError: (error: any) => {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					toast.error(error.response.data.error);
				} else {
					toast.error("An unexpected error occurred. Please try again.");
				}
			} else {
				toast.error("An unexpected error occurred. Please try again.");
			}
		},
		onSuccess: (response) => {
			if (response.status === 200) {
				toast.success("Email Verified Successfully");
				Navigate("/dashboard", { replace: true });
			}
		},
	});

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		try {
			setLoading(true);
			const response = await axios.post("/api/resent-verification");
			if (response.status === 201) {
				toast.success("Code Sent Successfully");
				restart(new Date(new Date().getTime() + 59 * 1000));
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					toast.error(error.response.data.error);
				}
			} else {
				toast.error("An unexpected error occurred. Please try again.");
			}

			toast.error("An unexpected error occurred. Please try again.");
		} finally {
			// Set loading state to false
			setLoading(false);
		}
	}

	return (
		<>
			<Logout />
			<div className="flex items-center justify-center h-screen w-full">
				<Form {...form}>
					<form onSubmit={form.handleSubmit((values) => mutate(values))} className="space-y-6 text-center">
						<FormField
							control={form.control}
							disabled={isPending}
							name="pin"
							render={({ field }) => (
								<FormItem>
									<FormLabel>One-Time Code</FormLabel>
									<FormControl>
										<InputOTP maxLength={4} size={4} {...field} pattern={REGEXP_ONLY_DIGITS}>
											<InputOTPGroup className="mx-auto">
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSeparator />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormDescription>Please Enter Verification code Sent to your Email</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<p>
							{isRunning ? (
								`Code Expires in  ${seconds}s`
							) : (
								<Button onClick={(e) => handleSubmit(e)} variant={"outline"} disabled={loading}>
									{loading ? "Sending..." : "Resend Code"}
								</Button>
							)}
						</p>
						<Button type="submit" className="w-full" disabled={isPending}>
							{isPending ? "Verifying..." : "Verify"}
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
}
