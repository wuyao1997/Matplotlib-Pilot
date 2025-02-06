import * as vscode from "vscode";
import * as fs from "fs/promises";
import * as path from "path";
import * as cheerio from "cheerio";

export async function defineCustomTemplate(context: vscode.ExtensionContext) {
  const options: vscode.OpenDialogOptions = {
    canSelectFiles: true,
    canSelectFolders: false,
    canSelectMany: false,
    openLabel: "Open File",
    filters: {
      "Text files": ["html"],
      "All files": ["*"],
    },
  };

  const selectedUris = await vscode.window.showOpenDialog(options);

  if (selectedUris && selectedUris.length > 0) {
    const selectedUri = selectedUris[0];
    let htmlContent = await fs.readFile(selectedUri.fsPath, "utf-8");

    const $ = cheerio.load(htmlContent);
    const cssContent = await fs.readFile(
      path.join(context.extensionUri.fsPath, "resources", "css", "template.css"),
      "utf-8"
    );
    const jsContent = await fs.readFile(
      path.join(context.extensionUri.fsPath, "resources", "js", "template.js"),
      "utf-8"
    );
    const defaultCoverData = await fs.readFile(
      path.join(context.extensionUri.fsPath, "resources", "default_cover.png")
    );
    const defaultCover_base64 = Buffer.from(defaultCoverData).toString("base64");

    $("head").append(`<style>${cssContent}</style>`);
    $("body").append(`<script>${jsContent}</script>`);

    const imgElements = $("img");
    for (const element of imgElements) {
      const src = $(element).attr("src");
      if (src) {
        const imagePath = path.join(path.dirname(selectedUri.fsPath), src);
        try {
          const imageData = await fs.readFile(imagePath);
          const base64Data = Buffer.from(imageData).toString("base64");
          $(element).attr("src", `data:image/png;base64,${base64Data}`);
        } catch (error) {
          $(element).attr("src", `data:image/png;base64,${defaultCover_base64}`);
          vscode.window.showWarningMessage(
            `读取封面文件 ${imagePath} 失败: ${error}，使用默认模板封面`
          );
        }
      }
    }

    const newFilePath = path.join(
      path.dirname(selectedUri.fsPath),
      "customTemplate.html"
    );
    await fs.writeFile(newFilePath, $.html());

    // 写入配置项
    const config = vscode.workspace.getConfiguration();
    config.update(
      "plt-snippet.customTemplateHtml",
      newFilePath,
      vscode.ConfigurationTarget.Global
    );

    vscode.window.showInformationMessage(
      `自定义模板文件写出到 ${newFilePath}，并重设配置项 Custom Template Html 为该文件，` +
        `重启 VSCode 生效。`
    );
  }
}
