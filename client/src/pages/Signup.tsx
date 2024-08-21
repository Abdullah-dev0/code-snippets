import { SignupForm } from "@/components/shared/auth/Signupform";
import { SigninForm } from "@/components/shared/auth/SigninForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Signup = () => {
	return (
		<div className="grid lg:grid-cols-2 grid-cols-1 justify-center items-center lg:overflow-hidden h-screen">
			<Tabs defaultValue="Sign-up" className="max-w-lg mx-auto w-full space-y-6">
				<TabsList className="w-full gap-32 max-sm:gap-12 max-sm:py-12">
					<TabsTrigger className="text-xl" value="Sign-up">
						Sign-Up
					</TabsTrigger>
					<TabsTrigger value="Sign-in" className="text-xl">
						Sign-In
					</TabsTrigger>
				</TabsList>
				<TabsContent value="Sign-up">
					<SignupForm />
				</TabsContent>
				<TabsContent value="Sign-in">
					<SigninForm />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Signup;
