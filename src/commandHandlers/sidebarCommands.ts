import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as cheerio from "cheerio";

function createButton(snippets: string, name: string, title: string): string {
  // 手动转义snippets中的双引号
  const escapedSnippets = snippets.replace(/"/g, "&quot;");
  if (title) {
    return `<button title="${title}" 
            data-snippets="${escapedSnippets}" 
            style="width: 48%;">${name}</button>`;
  } else {
    return `<button data-snippets="${escapedSnippets}" 
            style="width: 48%;">${name}</button>`;
  }
}

function createH4Header(title: string): string {
  return `<h4 style="text-align: center;">${title}</h4>`;
}

function ipynb2sidebarHtmlString(
  notebookContent: string,
  context: vscode.ExtensionContext
): string {
  const notebook = JSON.parse(notebookContent);
  const elements: string[] = [];

  for (const cell of notebook.cells) {
    if (cell.cell_type === "code") {
      // 检查是否为代码单元格
      let sourceLines: string[] = [];
      if (typeof cell.source === "string") {
        sourceLines = [cell.source];
      } else if (Array.isArray(cell.source)) {
        sourceLines = cell.source;
      }

      const combinedSource = sourceLines.join("");
      const lines = combinedSource.split("\n");
      if (lines.length > 0 && lines[0].startsWith("#")) {
        // 第一行是注释
        try {
          const comment = lines[0].slice(1).trim(); // 去掉#号及首尾空白字符
          const data = JSON.parse(comment);
          if ("name" in data) {
            const name = data.name;
            // 将剩余行组合成一个字符串，并作为data-snippets的值
            const snippets = lines.slice(1).join("\n");
            if ("title" in data) {
              elements.push(createButton(snippets, name, data.title));
            } else {
              elements.push(createButton(snippets, name, ""));
            }
          }
        } catch (error) {
          console.warn(`Warning: Invalid JSON comment ${lines[0].slice(1).trim()}`);
        }
      }
    } else if (cell.cell_type === "markdown") {
      // 检查是否为Markdown单元格
      let sourceLines: string[] = [];
      if (typeof cell.source === "string") {
        sourceLines = [cell.source];
      } else if (Array.isArray(cell.source)) {
        sourceLines = cell.source;
      }

      const combinedSource = sourceLines.join("\n");
      if (combinedSource.startsWith("## ")) {
        // 检查是否为二级标题
        const title = combinedSource.slice(3).trim(); // 去掉前三个字符（两个#和空格）
        elements.push(createH4Header(title));
      }
    }
  }

  const htmlContent = fs.readFileSync(
    path.join(context.extensionUri.fsPath, "resources", "html", "snippets.html"),
    "utf-8"
  );
  const cssContent = fs.readFileSync(
    path.join(context.extensionUri.fsPath, "resources", "css", "snippets.css"),
    "utf-8"
  );
  const jsContent = fs.readFileSync(
    path.join(context.extensionUri.fsPath, "resources", "js", "snippets.js"),
    "utf-8"
  );

  const $ = cheerio.load(htmlContent);
  $("head").append(`<style>${cssContent}</style>`);
  $("body").prepend(elements.join("\n"));
  $("body").append(`<script>${jsContent}</script>`);

  return $.html();
}

function getFileNameWithoutExtension(path: string): string {
  const parts = path.split(/[\\/]/);
  const fileNameWithExtension = parts[parts.length - 1];
  const fileNameParts = fileNameWithExtension.split(".");
  return fileNameParts.slice(0, -1).join(".");
}

export async function refreshSidebar(context: vscode.ExtensionContext) {
  let customSideBarNotebookPath: string = vscode.workspace
    .getConfiguration()
    .get("matplotlib-pilot.customSideBarNotebookPath") as string;

  if (customSideBarNotebookPath) {
    const uri = vscode.Uri.file(customSideBarNotebookPath);
    let nb_string = await fs.readFileSync(uri.fsPath, "utf-8");

    let filename = getFileNameWithoutExtension(customSideBarNotebookPath);

    let htmlString: string = ipynb2sidebarHtmlString(nb_string, context);
    const newFilePath = path.join(path.dirname(uri.fsPath), `${filename}.html`);
    await fs.writeFileSync(newFilePath, htmlString);
    vscode.window.showInformationMessage(`HTML have been written to ${newFilePath}.`);

    const config = vscode.workspace.getConfiguration();
    config.update(
      "matplotlib-pilot.customSideBarHtmlPath",
      newFilePath,
      vscode.ConfigurationTarget.Global
    );
  } else {
    vscode.window.showInformationMessage(
      "Not refresh the sidebar view because the Custom SideBar Notebook Path " +
      "is not configured."
    );
  }
}

export async function modifySidebar(context: vscode.ExtensionContext) {
  let customSideBarPath: string = vscode.workspace
    .getConfiguration()
    .get("matplotlib-pilot.customSideBarNotebookPath") as string;
  if (!customSideBarPath) {
    vscode.window.showInformationMessage(
        "Save the native template to initialize the custom sidebar, " +
        "please save to a stable path."
    );
  }
  if (customSideBarPath && fs.existsSync(customSideBarPath)) {
    const customSideBarUri = vscode.Uri.file(customSideBarPath);
    await vscode.commands.executeCommand("vscode.open", customSideBarUri);
  } else {
    try {
      const notebookPath = path.join(
        context.extensionUri.fsPath,
        "pages",
        "snippets",
        "snippets.ipynb"
      );
      const notebookContent = fs.readFileSync(notebookPath, "utf8");

      vscode.window
        .showSaveDialog({
          filters: {
            notebook: ["ipynb"],
            "All Files": ["*"],
          },
        })
        .then((fileUri) => {
          if (fileUri) {
            fs.writeFileSync(fileUri.fsPath, notebookContent);
            vscode.window.showInformationMessage(
              `Custom Sidebar Notebook has been save to ${fileUri.fsPath}.`
            );

            const config = vscode.workspace.getConfiguration();
            config.update(
              "matplotlib-pilot.customSideBarNotebookPath",
              fileUri.fsPath,
              vscode.ConfigurationTarget.Global
            );
          }
        });
    } catch (error) {
      vscode.window.showErrorMessage(`Error: ${error}`);
    }
  }
}

export async function resetSidebar(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration();
  config.update("matplotlib-pilot.customSideBar", false, vscode.ConfigurationTarget.Global);
  config.update(
    "matplotlib-pilot.customSideBarNotebookPath",
    "",
    vscode.ConfigurationTarget.Global
  );
  config.update(
    "matplotlib-pilot.customSideBarHtmlPath",
    "",
    vscode.ConfigurationTarget.Global
  );
  config.update(
    "matplotlib-pilot.customTemplateHtml",
    "",
    vscode.ConfigurationTarget.Global
  );
}
