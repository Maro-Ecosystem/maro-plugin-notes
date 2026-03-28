import { FileFormatter, ObjectFile } from "@maro/maro";

type MdContent = {
  title?: string
  subtitle?: string
  content: string,
}

class InvalidMdFile extends Error {
  constructor(path: string) {
    super()
    this.message = `Invalid note file ${path}`
  }
}

export class MdFileFormatter extends FileFormatter<MdContent> {
  override exception(path: string): Error | void {
    return new InvalidMdFile(path)
  }

  override toString(input: MdContent): string {
    let content = ""
    if (input.title) content += `# ${input.title}
`
    if (input.subtitle) content += `## ${input.subtitle}
`
    if (input.content) content += input.content
    return content
  }

  override fromString(content: string): MdContent {
    const lines = content.split(/\r?\n/);
    let title: string | undefined;
    let subtitle: string | undefined;

    let i = 0;

    if (lines[i]?.startsWith("# ")) {
      title = lines[i]?.slice(2).trim();
      i++;
    }

    if (lines[i]?.startsWith("## ")) {
      subtitle = lines[i]?.slice(3).trim();
      i++;
    }

    const body = lines.slice(i).join("\n").trim();
    return {
      title,
      subtitle,
      content: body
    };
  }
}

export class MdFile extends ObjectFile<MdContent> {
  constructor(path: string) {
    super(path, new MdFileFormatter())
  }
}
