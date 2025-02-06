/**
 * @fileoverview
 * 实现一些具体的WebviewPanel，目前包括
 *  - StaticPanel：静态页面
 *  - NewFilePanel：点击按钮后创建新文件的面板
 */

import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

function checkFileExist(filename: string): boolean {
  const workspaceFolder = vscode.workspace.workspaceFolders![0];
  const targetPath = path.join(workspaceFolder.uri.fsPath, filename);
  return fs.existsSync(targetPath);
}

async function newFileByString(filename: string, content: string) {
  if (
    vscode.workspace.workspaceFolders === undefined ||
    vscode.workspace.workspaceFolders.length === 0
  ) {
    vscode.window.showErrorMessage("请先打开工作区.");
    return;
  }
  const workspaceFolder = vscode.workspace.workspaceFolders[0];

  const newFilePath = path.join(workspaceFolder.uri.fsPath + `/${filename}`);
  fs.mkdirSync(path.dirname(newFilePath), { recursive: true });
  fs.writeFileSync(newFilePath, content);

  vscode.window.showInformationMessage(`文件 ${filename} 在工作区路径创建成功`);
}

async function newFileByCopyPath(filename: string, templatePath: string) {
  if (
    vscode.workspace.workspaceFolders === undefined ||
    vscode.workspace.workspaceFolders.length === 0
  ) {
    vscode.window.showErrorMessage("请先打开工作区.");
    return;
  }
  const workspaceFolder = vscode.workspace.workspaceFolders[0];

  fs.readFile(templatePath, "utf-8", (err, template) => {
    if (err) {
      vscode.window.showErrorMessage(`读取文件 ${templatePath} 时发生错误，${err}`);
      return;
    }

    const newFilePath = path.join(workspaceFolder.uri.fsPath, filename);
    fs.mkdirSync(path.dirname(newFilePath), { recursive: true });
    fs.writeFileSync(newFilePath, template);

    vscode.window.showInformationMessage(`文件 ${filename} 在工作区路径创建成功`);
  });
}

export interface Panel {
  getName(): string;
  open(): void;
}

export class StaticPanel implements Panel {
  private panel: vscode.WebviewPanel | undefined;
  private extensionUri: vscode.Uri;
  private panelName: string;
  private panelTitle: string;
  private htmlPath: string;

  constructor(
    extensionUri: vscode.Uri,
    panelName: string,
    panelTitle: string,
    htmlPath: string
  ) {
    this.extensionUri = extensionUri;
    this.panelName = panelName;
    this.panelTitle = panelTitle;
    this.htmlPath = htmlPath;
  }

  getName(): string {
    return this.panelName;
  }

  open(): void {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.One);
    } else {
      this.panel = vscode.window.createWebviewPanel(
        this.panelName,
        this.panelTitle,
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      );

      this.panel.webview.html = fs.readFileSync(this.htmlPath, "utf8");

      this.panel.iconPath = vscode.Uri.file(
        path.join(this.extensionUri.fsPath, "resources", "logo", "MPC_filled.svg")
      );

      this.panel.onDidDispose(() => {
        this.panel = undefined;
      });
    }
  }
}

export class NewFilePanel implements Panel {
  private panel: vscode.WebviewPanel | undefined;
  private extensionUri: vscode.Uri;
  private panelName: string;
  private panelTitle: string;
  private htmlPath: string;
  private createMode: "string" | "copyPath";

  constructor(
    extensionUri: vscode.Uri,
    panelName: string,
    panelTitle: string,
    htmlPath: string,
    createMode: "string" | "copyPath" = "string"
  ) {
    this.extensionUri = extensionUri;
    this.panelName = panelName;
    this.panelTitle = panelTitle;
    this.htmlPath = htmlPath;
    this.createMode = createMode;
  }

  getName(): string {
    return this.panelName;
  }

  open(): void {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.One);
    } else {
      this.panel = vscode.window.createWebviewPanel(
        this.panelName,
        this.panelTitle,
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      );

      this.panel.webview.html = fs.readFileSync(this.htmlPath, "utf8");

      this.panel.iconPath = vscode.Uri.file(
        path.join(this.extensionUri.fsPath, "resources", "logo", "MPC_filled.svg")
      );

      this.panel.webview.onDidReceiveMessage(async (message) => {
        if (
          vscode.workspace.workspaceFolders === undefined ||
          vscode.workspace.workspaceFolders.length === 0
        ) {
          vscode.window.showWarningMessage("请先打开工作区.");
          return;
        }

        const filename = await vscode.window.showInputBox({
          prompt: "请输入ipynb文件名（无需后缀名）",
        });
        if (!filename) {
          vscode.window.showWarningMessage("未输入文件名.");
          return;
        }

        const isFileExist = checkFileExist(filename + ".ipynb");
        if (isFileExist) {
          vscode.window.showWarningMessage(
            `文件 ${filename}.ipynb 已存在，请更换名字或先手动移除该文件`
          );
          return;
        }

        if (this.createMode === "copyPath") {
          await newFileByCopyPath(filename + ".ipynb", message.ipynbpath);
          return;
        } else if (this.createMode === "string") {
          await newFileByString(filename + ".ipynb", message.ipynb);
          return;
        } else {
          vscode.window.showWarningMessage("未知的创建模式.");
          return;
        }
      });

      this.panel.onDidDispose(() => {
        this.panel = undefined;
      });
    }
  }
}
