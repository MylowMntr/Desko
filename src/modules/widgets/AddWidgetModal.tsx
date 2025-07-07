/** biome-ignore-all lint/suspicious/noExplicitAny: This is a dynamic form, so we need to use any for config */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useDeskoStore } from "@/store/appStore";
import type { WidgetType } from "@/types";
import { widgetDefinitions } from "./definitions";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	workspaceId: string;
}

export function AddWidgetModal({ open, onOpenChange, workspaceId }: Props) {
	const addWidget = useDeskoStore((s) => s.addWidget);

	const widgetTypes = Object.keys(widgetDefinitions) as WidgetType[];
	const [type, setType] = useState<WidgetType>(widgetTypes[0]);
	const [title, setTitle] = useState("");
	const [config, setConfig] = useState<any>(
		widgetDefinitions[type].initialConfig,
	);

	function handleTypeChange(newType: WidgetType) {
		setType(newType);
		setConfig(widgetDefinitions[newType].initialConfig);
	}

	function handleFieldChange(key: string, value: string) {
		setConfig((prev: any) => ({ ...prev, [key]: value }));
	}

	function handleAdd() {
		addWidget(workspaceId, {
			id: uuidv4(),
			type,
			title: title || widgetDefinitions[type].label,
			position: { x: 0, y: 0 },
			size: { w: 4, h: 4 },
			config,
		});
		onOpenChange(false);
		setTitle("");
		setConfig(widgetDefinitions[type].initialConfig);
	}

	const fields = widgetDefinitions[type].fields;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Ajouter un widget</DialogTitle>
				</DialogHeader>
				<div className="space-y-2">
					<Label className="block">Type :</Label>
					<Select value={type} onValueChange={handleTypeChange}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Choisir un type" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Type</SelectLabel>
								{widgetTypes.map((t) => (
									<SelectItem key={t} value={t}>
										{widgetDefinitions[t].label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					<Input
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					{fields.map((field) => (
						<div key={field.key}>
							<Label>{field.label}</Label>
							{field.type === "textarea" ? (
								<textarea
									className="w-full border rounded px-2 py-1"
									placeholder={field.placeholder}
									value={config[field.key] || ""}
									onChange={(e) => handleFieldChange(field.key, e.target.value)}
								/>
							) : (
								<Input
									placeholder={field.placeholder}
									value={config[field.key] || ""}
									onChange={(e) => handleFieldChange(field.key, e.target.value)}
								/>
							)}
						</div>
					))}
				</div>
				<DialogFooter>
					<Button onClick={handleAdd}>Add</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
