import typescriptPlugin from "@rollup/plugin-typescript";
import { copyFile, mkdir, rm, stat } from "fs/promises";
import { join } from "path";
import { rollup } from "rollup";

const TEMP_DIR =
  "_temporary-directory-with-a-really-really-long-name-that-may-be-too-long-for-windows";

await mkdir(TEMP_DIR);
await copyFile("hello.ts", join(TEMP_DIR, "hello.ts"));
process.chdir(TEMP_DIR);

const build = await rollup({
  input: "hello.ts",
  plugins: [
    typescriptPlugin({
      baseUrl: ".",
      sourceMap: false,
      declaration: false,
      noEmitOnError: true,
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      removeComments: true,
      skipLibCheck: true,
      skipDefaultLibCheck: true,
      moduleResolution: "node",
      lib: ["ES2022", "DOM"],
      target: "ES2021",
      useDefineForClassFields: false,
    }),
  ],
});

const output = await build.write({
  file: "hello.js",
  format: "system",
});

for (const chunk of output.output) {
  console.log("Chunk:", chunk.fileName);
}

await build.close();
if ((await stat("hello.js")).isFile()) {
  console.log("File exists!");
} else {
  console.error("ERROR: Output file was not created!");
}
process.chdir("../");
await rm(TEMP_DIR, { recursive: true });

await sleep(1000);

console.log("Done!");

function sleep(ms = 1000) {
  console.log(`Waiting for ${ms} milliseconds...`);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
