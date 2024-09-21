import { SigninForm } from "@/components/shared/auth/SigninForm";
import { SignupForm } from "@/components/shared/auth/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Auth() {
	return (
		<Tabs defaultValue="sign-up" className="max-w-lg mx-auto grid place-content-center min-h-screen py-12">
			<TabsList className="grid w-full grid-cols-2 gap-5">
				<TabsTrigger
					className="text-lg  text-black dark:text-white  transition-colors duration-300 ease-in-out  data-[state=active]:bg-gray-900 data-[state=active]:text-white"
					value="sign-up">
					Sign up
				</TabsTrigger>
				<TabsTrigger
					className="text-lg text-black dark:text-white transition-colors duration-300 ease-in-out  data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white rounded-r-md"
					value="sign-in">
					Sign in
				</TabsTrigger>
			</TabsList>
			<TabsContent value="sign-up">
				<SignupForm />
			</TabsContent>
			<TabsContent value="sign-in">
				<SigninForm />
			</TabsContent>
		</Tabs>
	);
}

export default Auth;
