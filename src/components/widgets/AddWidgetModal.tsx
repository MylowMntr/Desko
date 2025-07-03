/** biome-ignore-all lint/suspicious/noExplicitAny: false positive */
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
import { useMylowDeskStore } from "@/store/appStore";
import type { WidgetType } from "@/types";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	workspaceId: string;
}

export function AddWidgetModal({ open, onOpenChange, workspaceId }: Props) {
	const addWidget = useMylowDeskStore((s) => s.addWidget);

	const [type, setType] = useState<WidgetType>("iframe");
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	const [content, setContent] = useState("");
	const [label, setLabel] = useState("");
	const [code, setCode] = useState("");

	function handleAdd() {
		let config: any = {};
		if (type === "iframe") config = { url };
		if (type === "note") config = { content };
		if (type === "link") config = { url, label };
		if (type === "script") config = { code };

		addWidget(workspaceId, {
			id: uuidv4(),
			type,
			title: title || "Widget",
			position: { x: 0, y: 0 },
			size: { w: 4, h: 4 },
			config,
		});
		onOpenChange(false);
		// Reset form
		setTitle("");
		setUrl("");
		setContent("");
		setLabel("");
		setCode("");
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Ajouter un widget</DialogTitle>
				</DialogHeader>
				<div className="space-y-2">
					<label className="block">
						Type&nbsp;:
						<select
							value={type}
							onChange={(e) => setType(e.target.value as WidgetType)}
							className="ml-2"
						>
							<option value="iframe">Iframe</option>
							<option value="note">Note</option>
							<option value="link">Lien</option>
							<option value="script">Script</option>
						</select>
					</label>
					<Input
						placeholder="Titre"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					{type === "iframe" && (
						<Input
							placeholder="URL"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
						/>
					)}
					{type === "note" && (
						<Input
							placeholder="Contenu"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					)}
					{type === "link" && (
						<>
							<Input
								placeholder="URL"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
							/>
							<Input
								placeholder="Label (optionnel)"
								value={label}
								onChange={(e) => setLabel(e.target.value)}
							/>
						</>
					)}
					{type === "script" && (
						<Input
							placeholder="Code (non exécutable)"
							value={code}
							onChange={(e) => setCode(e.target.value)}
						/>
					)}
				</div>
				<DialogFooter>
					<Button onClick={handleAdd}>Ajouter</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
