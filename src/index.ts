import { PluginExport } from "@maro/maro";

import { EditCommand } from "./commands/edit";
import { OpenCommand } from "./commands/open";

const plugin: PluginExport = {
  name: "maro-plugin-notes",
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
