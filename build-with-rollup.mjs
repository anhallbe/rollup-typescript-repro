import typescriptPlugin from "@rollup/plugin-typescript";
import { rollup } from "rollup";

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

console.log("Waiting for 1 second...");
await new Promise((resolve) => setTimeout(resolve, 1000));

console.log("Done!");
