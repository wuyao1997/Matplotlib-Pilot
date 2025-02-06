/**
 * @fileoverview
 * Provide sidebar view for matplotlib-pilot.
 *  - Snippets Button
 *  - Concept Button
 *  - Template Button
 *  - Custom Template Button
 *  - Sidebar management Button
 */

import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { PanelManager } from "./panelManager";
import { StaticPanel, NewFilePanel } from "./panel";

let htmlStringNative: string;
let htmlStringCustom: string;

async function getHtmlForWebview(filePath: string): Promise<string> {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    vscode.window.showErrorMessage(`Load file ${filePath} error, ${error}`);
    return `Load file ${filePath} error, ${error}`;
  }
}

export default class SidebarProvider {
  private panelManager: PanelManager;

  constructor(private readonly extensionUri: vscode.Uri) {
    this.panelManager = new PanelManager();

    let conceptPath = path.join(extensionUri.fsPath, "pages", "concept.html");
    this.panelManager.registerPanel(
      new StaticPanel(extensionUri, "concept", "Matplotlib Concept", conceptPath)
    );

    let templatePath = path.join(extensionUri.fsPath, "pages", "template.vscode.html");
    this.panelManager.registerPanel(
      new NewFilePanel(extensionUri, "template", "Matplotlib Template", templatePath)
    );

    let customTemplateHtml: string = vscode.workspace
      .getConfiguration()
      .get("matplotlib-pilot.customTemplateHtml") as string;

    if (fs.existsSync(customTemplateHtml)) {
      this.panelManager.registerPanel(
        new NewFilePanel(
          extensionUri,
          "customTemplate",
          "Custom Matplotlib Template",
          customTemplateHtml,
          "copyPath"
        )
      );
    } else {
      // vscode.window.showWarningMessage(`自定义模板文件 ${customTemplateHtml} 不存在`);
    }
  }

  async resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };

    htmlStringNative = await getHtmlForWebview(
      path.join(this.extensionUri.fsPath, "pages", "snippets.html")
    );
    htmlStringCustom = htmlStringNative;
    let customSideBarHtmlPath: string = vscode.workspace
      .getConfiguration()
      .get("matplotlib-pilot.customSideBarHtmlPath") as string;
    if (customSideBarHtmlPath) {
      if (fs.existsSync(customSideBarHtmlPath)) {
        htmlStringCustom = await getHtmlForWebview(customSideBarHtmlPath);
      } else {
        vscode.window.showWarningMessage(
          `The sidebar description file ${customSideBarHtmlPath} does not exist, use the default sidebar`
        );
      }
    }
    else {
      console.log("No custom sidebar html path");
    }

    let customSideBar: boolean = vscode.workspace
      .getConfiguration()
      .get("matplotlib-pilot.customSideBar") as boolean;
    if (customSideBar) {
      webviewView.webview.html = htmlStringCustom;
    } else {
      webviewView.webview.html = htmlStringNative;
    }

    webviewView.webview.onDidReceiveMessage(async (message) => {
      const editor = vscode.window.activeTextEditor!;

      if ("snippets" in message) {
        let text = message.snippets;
        editor.edit((build) => {
          build.insert(editor.selection.end, text);
        });
      }

      if (message.id && this.panelManager.hasPanel(message.id)) {
        this.panelManager.openPanel(message.id);
      }

      if (message.id === "modify") {
        vscode.commands.executeCommand("matplotlib-pilot.modifySidebar");
      }

      if (message.id === "refresh") {
        vscode.commands.executeCommand("matplotlib-pilot.refreshSidebar");

        setTimeout(async () => {
          customSideBarHtmlPath = (await vscode.workspace
            .getConfiguration()
            .get("matplotlib-pilot.customSideBarHtmlPath")) as string;

          if (customSideBarHtmlPath === undefined || customSideBarHtmlPath === "") {
            return;
          } else if (!fs.existsSync(customSideBarHtmlPath)) {
            vscode.window.showWarningMessage(
              `The sidebar description file ${customSideBarHtmlPath} does not exist, use the default sidebar`
            );
            return;
          } else {
            htmlStringCustom = await getHtmlForWebview(customSideBarHtmlPath);
          }
        }, 1000);
      }

      if (message.id === "toggleBar") {
        console.log(message.native);
        if (message.native) {
          webviewView.webview.html = htmlStringNative;
          console.log("native");
        } else {
          webviewView.webview.html = htmlStringCustom;
          console.log("Custom");
        }
      }

      return;
    });
  }
}
