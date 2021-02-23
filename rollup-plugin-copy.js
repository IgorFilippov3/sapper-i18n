import fs from "fs-extra"

export default function copy2(options = {}) {
  const { input, output } = options;

  let copied = false

  return {
    name: "copy",
    writeBundle: async () => {

      if (copied) return;

      try {
        await fs.copy(input, output);
        copied = true;
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }
}