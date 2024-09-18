import { SigninForm } from "@/components/shared/auth/SigninForm";
import { SignupForm } from "@/components/shared/auth/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const Auth = () => {
	return (
		<div className="max-w-lg mx-auto p-4">
			<Tabs defaultValue="sign-up" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="sign-up" className="text-lg font-semibold">
						Sign Up
					</TabsTrigger>
					<TabsTrigger value="sign-in" className="text-lg font-semibold">
						Sign In
					</TabsTrigger>
				</TabsList>
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
					<TabsContent value="sign-up" className="min-h-screen">
						<SignupForm />
					</TabsContent>
					<TabsContent value="sign-in">
						<SigninForm />
					</TabsContent>
				</motion.div>
			</Tabs>
		</div>
	);
};

export default Auth;
