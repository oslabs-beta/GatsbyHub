import { TreeItem, Command, TreeItemCollapsibleState } from 'vscode';

export default class CLICommand extends TreeItem {
	constructor(
		public label: string,
		public command?: Command,
		public children?: CLICommand[],
		public tooltip?: string
	) {
		super(
			label,
			children === undefined
				? TreeItemCollapsibleState.None
				: TreeItemCollapsibleState.Collapsed
		);
		this.label = label;
		this.contextValue = label;
		this.children = children;
		this.command = command;
		this.tooltip = tooltip;
	}
}
