import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/providers/theme-provider";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="flex items-center pt-2">
			<Switch
				id="dark-mode"
				defaultChecked
				checked={theme === "dark"}
				onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
			/>
		</div>
	);
}