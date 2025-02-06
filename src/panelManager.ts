/**
 * @fileoverview
 * 管理WebviewPanel的面板的中间类
 */

import * as vscode from "vscode";
import { Panel } from "./panel";

export class PanelManager {
  private panels: Map<string, Panel> = new Map();

  registerPanel(panel: Panel) {
    this.panels.set(panel.getName(), panel);
  }

  openPanel(name: string) {
    const panel = this.panels.get(name);
    if (panel) {
      panel.open();
    } else {
      vscode.window.showErrorMessage(`Panel ${name} not found.`);
    }
  }

  hasPanel(name: string): boolean {
    return this.panels.has(name);
  }
}
