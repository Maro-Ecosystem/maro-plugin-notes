import { Command, getPath, openInEditor } from "@maro/maro";

export const OpenCommand: Command = {
  name: "open",
  aliases: ["o"],
  description: "Opens a given note in editor",
  run: async ({ ctx }) => {
    const ui = ctx.ui;
    const notes = getPath("notes");
    const dirs = notes.readDirs();
    const dir = await ui.promptChoice(dirs, { message: "Choose note dir" });
    const files = dir.readFiles();
    const file = await ui.promptChoice(files, { message: "Choose note" });
    openInEditor(file);
  }
};
