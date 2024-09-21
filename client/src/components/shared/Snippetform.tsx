import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type { language } from "@/constants";
import { languages, snippetDefaultValues } from "@/constants";
import { SnippetSchema } from "@/lib/snippetSchema/SnippetFom";
import { Snippet } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import axios from "axios";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";

interface SnippetformProps {
	snippet?: Snippet;
	type: "create" | "update";
}

const Snippetform = ({ snippet, type }: SnippetformProps) => {
	const queryClient = useQueryClient();
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm<z.infer<typeof SnippetSchema>>({
		resolver: zodResolver(SnippetSchema),
		defaultValues: snippet && type === "update" ? snippet : snippetDefaultValues,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: z.infer<typeof SnippetSchema>) => {
			if (type === "update") {
				const response = await axios.put("/api/update", {
					...values,
					id: snippet?.id,
				});
				return response.data;
			} else {
				const response = await axios.post("/api/create", values);
				return response.data;
			}
		},
		onError: (error: any) => {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					toast.error(error.response.data.error);
				} else {
					toast.error("An unexpected error occurred. Please try again.");
				}
			} else {
				toast.error("No changes made.");
			}
		},
		onSuccess: () => {
			toast.success(type === "update" ? "Snippet updated successfully" : "Snippet added successfully");
			form.reset();
			setIsOpen(false);

			queryClient.cancelQueries({ queryKey: ["GetAllSnippets"] });

			queryClient.refetchQueries({
				queryKey: ["GetAllSnippets"],
			});
		},
	});

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button
					variant={type === "update" ? "ghost" : "default"}
					onClick={() => {
						form.reset();
						setIsOpen(true);
					}}>
					{type === "update" ? (
						<>
							<Edit2 size={22} />
						</>
					) : (
						"Create Snippet"
					)}
				</Button>
			</SheetTrigger>
			<SheetContent className="md:min-w-[600px] w-full overflow-y-scroll">
				<SheetHeader>
					<SheetTitle>Create a new snippet</SheetTitle>
					<SheetDescription>And share with your friends</SheetDescription>
				</SheetHeader>
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
										<Select
											defaultValue={type === "update" ? snippet?.language || "" : ""}
											onValueChange={field.onChange}>
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
									<FormDescription>Describe your snippet in 1000 characters or less.</FormDescription>
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
												defaultValue={type === "update" ? snippet?.code || "" : ""}
												placeholder="Code"
												width="100%"
												mode="javascript"
												theme="monokai"
												name="code"
												onChange={(value) => field.onChange(value)}
												fontSize={16}
												lineHeight={24}
												showPrintMargin={true}
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
													highlightActiveLine: true,
												}}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled={isPending} type="submit">
							{isPending ? "Loading..." : type === "update" ? "Update" : "Create"}
						</Button>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
};

export default Snippetform;
