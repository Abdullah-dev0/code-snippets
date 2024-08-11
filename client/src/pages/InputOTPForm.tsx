import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const FormSchema = z.object({
	pin: z.string().min(4, {
		message: "Verification code must be 4 Digits.",
	}),
});

export function InputOTPForm() {
	const Navigate = useNavigate();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const response = await axios.post("/api/email-verification", data);

		if (response.status === 200) {
			toast.success("Email Verified Successfully");
			Navigate("/dashboard");
		} else {
			toast.error("Invalid Code");
		}
	}

	return (
		<div className="flex items-center justify-center h-screen w-full">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-center">
					<FormField
						control={form.control}
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

					<Button type="submit" className="w-full">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
