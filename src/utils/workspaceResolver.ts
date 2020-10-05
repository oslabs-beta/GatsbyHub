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

// export async function workspaceResolver(fileUri?: string) {
//   const { workspaceFolders } = workspace;
//   if (!workspaceFolders) return;

//   const workspaceNamesArr = workspaceFolders.map((elem) => elem.name);

//   // if only one workspace, then return file path to that workspace
//   //   if (workspaceNamesArr.length === 1) {
//   //     // turn path to fsPath if there are issues
//   //     return workspaceFolders[0].uri.fsPath.replace(/\s/g, '\\ ');
//   //   }

//   if (fileUri) {
//     const selectedWorkspace = workspaceFolders.find((ws) =>
//       fileUri.startsWith(ws.uri.fsPath),
//     );
//     if (selectedWorkspace) {
//       return selectedWorkspace.uri.fsPath;
//     }
//   }

//   // if multiple workspace folders, show quick pick for user to pick specific workspace
//   const workspaceName = await window.showQuickPick(workspaceNamesArr, {
//     placeHolder: 'Choose workspace for Gatsby server',
//     ignoreFocusOut: true,
//   });
//   // get path to workspace
//   const workspacePath = workspaceFolders
//     .find((elem) => elem.name === workspaceName)
//     ?.uri.fsPath.replace(/\s/g, '\\ ');
//   // return path
//   return workspacePath;
// }

export function workspaceResolver(fileUri?: string) {
  return new Promise<string>((resolve) => {
    const { workspaceFolders } = workspace;
    if (!workspaceFolders) return;

    const workspaceNamesArr = workspaceFolders.map((elem) => elem.name);

    // if only one workspace, then return file path to that workspace
    //   if (workspaceNamesArr.length === 1) {
    //     // turn path to fsPath if there are issues
    //     return workspaceFolders[0].uri.fsPath.replace(/\s/g, '\\ ');
    //   }

    if (fileUri) {
      const selectedWorkspace = workspaceFolders.find((ws) =>
        fileUri.startsWith(ws.uri.fsPath),
      );
      if (selectedWorkspace) {
        return resolve(selectedWorkspace.uri.fsPath);
      }
    }

    // if multiple workspace folders, show quick pick for user to pick specific workspace
    window
      .showQuickPick(workspaceNamesArr, {
        placeHolder: 'Choose workspace for Gatsby server',
        ignoreFocusOut: true,
      })
      // get path to workspace
      .then((workspaceName) => {
        const workspacePath = workspaceFolders.find(
          (elem) => elem.name === workspaceName,
        )?.uri.fsPath;
        // return path
        return resolve(workspacePath);
      });
  });
}

// attempts to get path to the root folder of the file in the active text editor
export function getRootPath() {
  return (
    // gets path to file in active text editor
    window.activeTextEditor?.document.fileName
      // replaces spaces with backslash
      .replace(/\s/g, '\\ ')
      // drops fileName and common folders that aren't part of the root path
      .replace(
        /\/(src\/)?(pages\/)?(components\/)?[a-zA-Z\-\d]+\.(ts)?(js)?x?/,
        '',
      )
  );
}
