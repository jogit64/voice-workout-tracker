#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const gradleFile = path.join("android", "app", "capacitor.build.gradle");
let text = await fs.readFile(gradleFile, "utf8");

// Remplace toutes les occurrences VERSION_XX par VERSION_17
text = text.replace(/JavaVersion\.VERSION_\d+/g, "JavaVersion.VERSION_17");

await fs.writeFile(gradleFile, text);
console.log("✅ Patched Java version to 17 in capacitor.build.gradle");
