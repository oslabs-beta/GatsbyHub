import { TreeItem, Command, TreeItemCollapsibleState } from 'vscode';

export default class CLICommand extends TreeItem {
	constructor(
		public label: string,
		public contextValue?: string,
		public command?: Command,
		public children?: CLICommand[]
	) {
		super(
			label,
			children === undefined
				? TreeItemCollapsibleState.None
				: TreeItemCollapsibleState.Collapsed
		);
		this.label = label;
		this.contextValue = contextValue;
		this.children = children;
		this.command = command;
	}
}
