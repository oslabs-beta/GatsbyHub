import { workspace, window } from 'vscode';

export async function setWorkspace() {
  const { workspaceFolders } = workspace;
  if (!workspaceFolders) return;

  const workspaceNamesArr = workspaceFolders.map((elem) => elem.name);
  const workspaceName = await window.showQuickPick(workspaceNamesArr, {
    placeHolder: 'Choose workspace for Gatsby server',
    ignoreFocusOut: true,
  });
  return workspaceName;
}

export async function workspaceResolver() {
  const { workspaceFolders } = workspace;
  if (!workspaceFolders) return;

  const workspaceNamesArr = workspaceFolders.map((elem) => elem.name);

  // if only one workspace, then return file path to that workspace
  //   if (workspaceNamesArr.length === 1) {
  //     // turn path to fsPath if there are issues
  //     return workspaceFolders[0].uri.fsPath.replace(/\s/g, '\\ ');
  //   }

  // if multiple workspace folders, show quick pick for user to pick specific workspace
  const workspaceName = await window.showQuickPick(workspaceNamesArr, {
    placeHolder: 'Choose workspace for Gatsby server',
    ignoreFocusOut: true,
  });
  // get path to workspace
  const workspacePath = workspaceFolders
    .find((elem) => elem.name === workspaceName)
    ?.uri.fsPath.replace(/\s/g, '\\ ');
  // return path
  return workspacePath;
}
