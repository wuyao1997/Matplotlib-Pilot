/**
 * @fileoverview
 * Register commands and webview view providers.
 */

import * as vscode from "vscode";
import SidebarProvider from "./sidebarProvider";
import { defineCustomTemplate } from "./commandHandlers/defineCustomTemplate";
import { loadtxt, load } from "./commandHandlers/loadCommands";
import {
  refreshSidebar,
  modifySidebar,
  resetSidebar,
} from "./commandHandlers/sidebarCommands";


function registerCommands(context: vscode.ExtensionContext) {
    let n: string = "matplotlib-pilot";
    const commands = [
      { command: `${n}.load`, callback: load },
      { command: `${n}.loadtxt`, callback: loadtxt },
      { command: `${n}.resetSidebar`, callback: resetSidebar },
      { command: `${n}.modifySidebar`, callback: modifySidebar },
      { command: `${n}.refreshSidebar`, callback: refreshSidebar },
      { command: `${n}.defineCustomTemplate`, callback: defineCustomTemplate },
    ];
  
    for (const { command, callback } of commands) {
      const disposable = vscode.commands.registerCommand(command, () => {
        callback(context);
      });
      context.subscriptions.push(disposable);
    }
  }
  
  function registerWebview(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.window.registerWebviewViewProvider(
        "mpSidebarView",
        new SidebarProvider(context.extensionUri)
      )
    );
  }


export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "matplotlib-pilot" is now active!');

    registerCommands(context);

    registerWebview(context);
}

// This method is called when your extension is deactivated
export function deactivate() {
    console.log('Extension "matplotlib-pilot" is now deactived!');
}
