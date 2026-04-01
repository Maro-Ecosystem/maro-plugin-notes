import { Command, getPath, Repo, TempFile } from "@maro/maro";

const template = (title: string) => `---
title: ${title} 
tags: []
date: ${new Date().toLocaleDateString().replaceAll("/", "-")}
---
`

export const NewCommand: Command = {
  name: "new",
  aliases: ["n", "create"],
  description: "Create new note",
  run: async ({ ctx }) => {
    const ui = ctx.ui;
    const log = ctx.logger;
    const notes = getPath("notes");

    const repo = new Repo(notes);
    const dirs = notes.readDirs();
    const dir = await ui.promptChoice(dirs, { message: "Choose note dir" });
    const title = await ui.input({ message: "Title:" });

    const temp_file = new TempFile({
      content: template(title),
      ext: "md"
    })

    const { new_content, changed } = await temp_file.prompt()

    if (!changed) {
      log.warning("No changes made")
      return
    }

    const new_note = dir.createFile(`${title}.md`)
    new_note.write(new_content);

    const currentBranch = await repo.getCurrentBranch();
    await repo.add(new_note);
    await repo.commit(`Add ${new_note.name()}`);
    await repo.push(currentBranch);
  }
};
