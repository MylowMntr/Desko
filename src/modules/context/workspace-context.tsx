import { createContext, type ReactNode, useContext, useState } from "react";
import type { Workspace } from "@/types";

interface WorkspaceContextProps {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	editable: boolean;
	setEditable: React.Dispatch<React.SetStateAction<boolean>>;
	activeWorkspace: Workspace | null;
	setActiveWorkspace: React.Dispatch<React.SetStateAction<Workspace | null>>;
}

const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(
	undefined,
);

export const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [editable, setEditable] = useState(false);
	const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(
		null,
	);

	return (
		<WorkspaceContext.Provider
			value={{
				showModal,
				setShowModal,
				editable,
				setEditable,
				activeWorkspace,
				setActiveWorkspace,
			}}
		>
			{children}
		</WorkspaceContext.Provider>
	);
};

export const useWorkspaceContext = (): WorkspaceContextProps => {
	const context = useContext(WorkspaceContext);
	if (!context) {
		throw new Error(
			"useWorkspaceContext must be used within a WorkspaceProvider",
		);
	}
	return context;
};
