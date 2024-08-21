import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type { language } from "@/constants";
import { languages, snippetDefaultValues } from "@/constants";
import { SnippetSchema } from "@/lib/snippetSchema/SnippetFom";
import { zodResolver } from "@hookform/resolvers/zod";
import "ace-builds/src-noconflict/mode-javascript";
import AceEditor from "react-ace";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const Snippetform = () => {
	const queryClient = useQueryClient();
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm<z.infer<typeof SnippetSchema>>({
		resolver: zodResolver(SnippetSchema),
		defaultValues: snippetDefaultValues,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: z.infer<typeof SnippetSchema>) => {
			const response = await axios.post("/api/create", values);
			return response.data;
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
		onSuccess: () => {
			toast.success("Snippet added successfully");
			setIsOpen(false);
			queryClient.invalidateQueries({
				queryKey: ["GetAllSnippets"],
			});
		},
	});

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
							<form onSubmit={form.handleSubmit((values) => mutate(values))} className="space-y-8">
								<FormField
									disabled={isPending}
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
									disabled={isPending}
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
									disabled={isPending}
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
									disabled={isPending}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Code</FormLabel>
											<FormControl>
												<div className="overflow-hidden">
													<AceEditor
														placeholder="Code"
														width="100%"
														mode={form.getValues("language")}
														theme="monokai"
														name="code"
														onChange={field.onChange}
														fontSize={16}
														lineHeight={24}
														showGutter={true}
														wrapEnabled={true}
														highlightActiveLine={true}
														value={field.value}
														setOptions={{
															enableBasicAutocompletion: true,
															enableLiveAutocompletion: true,
															enableSnippets: true,
															showLineNumbers: true,
															tabSize: 0,
														}}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button disabled={isPending} type="submit">
									{isPending ? "Loading..." : "Submit"}
								</Button>
							</form>
						</Form>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default Snippetform;
