import { SigninForm } from "@/components/shared/auth/SigninForm";
import { SignupForm } from "@/components/shared/auth/Signupform";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const Signup = () => {
	return (
		<div className="flex h-screen placecenter w-full">
			<Tabs defaultValue="Sign-up" className="max-w-lg mx-auto w-full space-y-6">
				<TabsList className="w-full gap-32 max-sm:gap-12 max-sm:py-12">
					<TabsTrigger className="text-xl" value="Sign-up">
						Signup
					</TabsTrigger>
					<TabsTrigger value="Sign-in" className="text-xl">
						Login
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
