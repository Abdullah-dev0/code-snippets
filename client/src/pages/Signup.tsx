import LottieImage from "@/components/shared/LottieImage";
import { SignupForm } from "@/components/shared/Signupform";
import { SigninForm } from "@/components/shared/SigninForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Signup = () => {
	return (
		<div className="grid lg:grid-cols-2 grid-cols-1 justify-center items-center overflow-hidden h-screen">
			<Tabs defaultValue="account" className="max-w-lg mx-auto w-full space-y-6">
				<TabsList className="w-full gap-32">
					<TabsTrigger value="account">Sign-Up</TabsTrigger>
					<TabsTrigger value="password">Sign-In</TabsTrigger>
				</TabsList>
				<TabsContent value="account">
					<SignupForm />
				</TabsContent>
				<TabsContent value="password">
					<SigninForm />
				</TabsContent>
			</Tabs>
			<LottieImage />
		</div>
	);
};

export default Signup;
