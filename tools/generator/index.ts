import * as fs from "fs";
import { generateComponent } from "./component";
import { generateTypes } from "./types";

export async function getDirectories(src: string) {
  return fs
    .readdirSync(src, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);
}

async function run() {
  const srcDir = `${__dirname}/assets`;
  const clients = await getDirectories(srcDir);

  await Promise.all(clients.map((client) => generateComponent(client)));

  await generateTypes(clients);
}

run();
