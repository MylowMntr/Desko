import { useEffect, useState } from "react";
export function ClockWidgetView({ widget }) {
	const [now, setNow] = useState(new Date());
	useEffect(() => {
		const timer = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);
	return (
		<div className="flex flex-col items-center">
			<span className="text-2xl font-mono">
				{now.toLocaleTimeString("fr-FR", {
					timeZone: widget.config.timezone || "Europe/Paris",
				})}
			</span>
			<span className="text-xs text-muted-foreground">
				{widget.config.timezone || "Local"}
			</span>
		</div>
	);
}
