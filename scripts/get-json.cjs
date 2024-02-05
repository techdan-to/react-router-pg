// scripts/generateData.js
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const dataDir = path.join(__dirname, "../data"); // Adjust the path to your data directory

const outputFilePath = path.join(__dirname, "../manifest/");

console.log("outputfilepath", outputFilePath);

const folders = fs.readdirSync(dataDir);

folders.forEach((folder) => {
  const folderPath = path.join(dataDir, folder);
  const files = fs.readdirSync(folderPath);
  const folderData = {};

  files.forEach((file) => {
    if (file.endsWith(".yaml")) {
      const filePath = path.join(folderPath, file);
      const content = fs.readFileSync(filePath, "utf8");
      const parsed = yaml.load(content);
      const key = file.replace(".yaml", "");
      folderData[key] = parsed;
    }
  });

  fs.writeFileSync(
    path.join(outputFilePath, folder + ".json"),
    JSON.stringify(folderData, null, 2),
    "utf8"
  );
});

console.log("Data generated successfully.");
