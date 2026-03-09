import { Command, getPath, openInEditor, Repo } from "@maro/maro";

export const EditCommand: Command = {
  name: "edit",
  aliases: ["e"],
  description: "Edit a given note in editor",
  run: async ({ ctx }) => {
    const ui = ctx.ui;
    const log = ctx.logger;
    const notes = getPath("notes");

    const repo = new Repo(notes);
    const dirs = notes.readDirs();
    const dir = await ui.promptChoice(dirs, { message: "Choose note dir" });
    const files = dir.readFiles();
    const file = await ui.promptChoice(files, { message: "Choose note" });

    const m1 = file.getMd5();
    await openInEditor(file, { wait: true });
    const m2 = file.getMd5();
    if (m1 === m2) {
      log.info("No changes made");
      return;
    }

    const currentBranch = await repo.getCurrentBranch();
    await repo.add(file);
    await repo.commit(`Edit ${file.name()}`);
    await repo.push(currentBranch);
  }
};
