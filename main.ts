/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { InnerRenderFunction, RenderContext, start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import { configuration } from "./config.ts";

// This will be very confusing in the future.
import { config, setup } from "@twind";
import { virtualSheet } from "twind/sheets";

// Fetch stuff.

// Special interface for a very *special* file.
interface Dump {
  name: string;
  info: string | null;
  location: string;
  operational: boolean;
  downsince?: number;
}

// Main function where the pinging goes off.
async function pingServers() {
  const rawDump = await Deno.readTextFile("./dump.json");
  let dump: Dump[] = JSON.parse(rawDump);

  let d = new Date();

  for (const server of configuration.servers) {
    const k = await fetch(server.location);

    if (k.status === 200) {
      const dumpObj: Dump = {
        "name": server.name,
        "info": server.info ??= null,
        "location": server.location,
        "operational": true,
      };
      const itemIndex = dump.map((object) => object.name).indexOf(server.name);

      if (itemIndex === -1) {
        dump.push(dumpObj);
      } else {
        dump[itemIndex] = dumpObj;
      }
    } else {
      const dumpObj: Dump = {
        "name": server.name,
        "info": server.info ??= null,
        "location": server.location,
        "operational": false,
        "downsince": Math.floor(d.getTime(), 1000),
      };
      const itemIndex = dump.map((object) => object.name).indexOf(server.name);

      if (itemIndex === -1) {
        dump.push(dumpObj);
      } else {
        if (dump[itemIndex].operational === false) {
          continue;
        }

        dump[itemIndex] = dumpObj;
      }
    }
  }
  await Deno.writeTextFile("./dump.json", JSON.stringify(dump, null, "  "));
  setTimeout(pingServers(), configuration.interval);
}

// Fresh stuff.
const sheet = virtualSheet();
sheet.reset();
setup({ ...config, sheet });

function render(ctx: RenderContext, render: InnerRenderFunction) {
  const snapshot = ctx.state.get("twind") as unknown[] | null;
  sheet.reset(snapshot || undefined);
  render();
  ctx.styles.splice(0, ctx.styles.length, ...(sheet).target);
  const newSnapshot = sheet.reset();
  ctx.state.set("twind", newSnapshot);
}
await pingServers();
await start(manifest, { render });
