import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type { language } from "@/constants";
import { languages, snippetDefaultValues } from "@/constants";
import { SnippetSchema } from "@/lib/snippetSchema/SnippetFom";
import { zodResolver } from "@hookform/resolvers/zod";
import AceEditor from "react-ace";
import { useForm } from "react-hook-form";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import { z } from "zod";
import { Button } from "../ui/button";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Snippetform = () => {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm<z.infer<typeof SnippetSchema>>({
		resolver: zodResolver(SnippetSchema),
		defaultValues: snippetDefaultValues,
	});

	// 2. Define a submit handler.

	const onSubmit = async (data: any) => {
		try {
			// Simulate form submission or an API call
			await new Promise((resolve) => setTimeout(resolve, 10000));
			// If submission is successful, close the sheet

			console.log(data);
			setIsOpen(false);
			form.reset();
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	const onCopy = (text: string) => {
		console.log("text copied", text);
	};

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button onClick={() => setIsOpen(true)}>Create</Button>
			</SheetTrigger>
			<SheetContent className="md:min-w-[600px] w-full overflow-y-scroll">
				<SheetHeader className="space-y-6">
					<div className="flex flex-col gap-2">
						<h1 className="text-2xl">Create Snippet</h1>
						<p className="text-sm">And share with your friends</p>
					</div>
					<SheetDescription className="mt-12">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input placeholder="Title" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="language"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Select Language</FormLabel>
											<FormControl>
												<Select onValueChange={field.onChange}>
													<SelectTrigger>
														<SelectValue placeholder="language" />
													</SelectTrigger>
													<SelectContent>
														{languages.map((language: language) => (
															<SelectItem key={language} value={language}>
																{language}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea placeholder="Description" {...field} />
											</FormControl>
											<FormDescription>Describe your snippet in 300 characters or less.</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="code"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Code</FormLabel>
											<FormControl>
												<div className="overflow-hidden">
													<AceEditor
														placeholder="Code"
														width="100%"
														mode="javascript"
														theme="monokai"
														name="code"
														onChange={field.onChange}
														fontSize={16}
														lineHeight={24}
														debounceChangePeriod={1000}
														onCopy={(text: string) => onCopy(text)}
														showPrintMargin={true}
														showGutter={true}
														highlightActiveLine={true}
														value={field.value}
														setOptions={{
															enableBasicAutocompletion: true,
															enableLiveAutocompletion: true,
															enableSnippets: true,
															showLineNumbers: true,
															tabSize: 2,
														}}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit">Submit</Button>
							</form>
						</Form>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default Snippetform;
