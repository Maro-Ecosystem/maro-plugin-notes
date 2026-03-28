import { FileFormatter, JsonFormatter, ObjectFile, YamlFormatter } from "@maro/maro";

type Note = {
  content: string,
  metadata: {
    title: string
    tags: string[]
    date: string
  }
}

class InvalidNoteFile extends Error {
  constructor(path: string) {
    super()
    this.message = `Invalid note file ${path}`
  }
}

export class NoteFileFormatter extends FileFormatter<Note> {
  override exception(path: string): Error | void {
    return new InvalidNoteFile(path)
  }

  override toString(input: Note): string {
    const json = new JsonFormatter()
    return `---
title: ${input.metadata.title}
tags: ${json.toString(input.metadata.tags)}
date: ${input.metadata.date}
---
${input.content}`
  }

  override fromString(content: string): Note {
    const yaml = new YamlFormatter<Note["metadata"]>()
    const match = new RegExp(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/).exec(content);
    if (!match) throw new Error()
    const [, meta, body] = match;
    if (!meta || !body) throw new Error()

    const metadata = yaml.fromString(meta)
    return {
      metadata,
      content: body.trim()
    };
  }

}

export class NoteFile extends ObjectFile<Note> {
  constructor(path: string) {
    super(path, new NoteFileFormatter())
  }
}
