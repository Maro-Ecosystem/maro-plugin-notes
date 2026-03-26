import { PathRegistry, PluginExport } from "@maro/maro";

import { EditCommand } from "./commands/edit";
import { OpenCommand } from "./commands/open";

const plugin: PluginExport = {
  name: "maro-plugin-notes",
  onLoad() {
    PathRegistry.register("notes", "Path to notes repository")
  },
  commands: [
    {
      name: "note",
      aliases: ["notes"],
      subcommands: [
        OpenCommand,
        EditCommand
      ]
    }
  ]
};

export default plugin;
