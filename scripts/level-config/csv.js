const fs = require("fs");
const path = require("path");

const { TABLE_DEFS } = require("./table-defs");

function loadTables(dataDir, collector) {
  const tables = {};

  for (const [tableName, def] of Object.entries(TABLE_DEFS)) {
    const fullPath = path.join(dataDir, def.file);
    if (!fs.existsSync(fullPath)) {
      if (def.required) {
        collector.report(
          "ERROR",
          def.file,
          "-",
          "-",
          "",
          "required table is missing",
          `add ${def.file} to the level-data directory`,
          def.owner
        );
      }
      continue;
    }

    tables[tableName] = parseCsvFile(fullPath, def, collector);
  }

  return tables;
}

function parseCsvFile(fullPath, def, collector) {
  const raw = fs.readFileSync(fullPath, "utf8").replace(/^\uFEFF/, "");
  const lines = raw.split(/\r?\n/).filter((line) => line.trim() !== "");

  if (lines.length === 0) {
    collector.report("ERROR", def.file, "-", "-", "", "table file is empty", "add header and data rows", def.owner);
    return { file: def.file, headers: [], rows: [] };
  }

  const headerCells = parseCsvLine(lines[0]);
  validateHeaders(def, headerCells, collector);

  const rows = [];
  for (let index = 1; index < lines.length; index += 1) {
    const cells = parseCsvLine(lines[index]);
    if (cells.length > headerCells.length) {
      collector.report(
        "WARN",
        def.file,
        index + 1,
        "-",
        "",
        "row has more cells than the header definition",
        "remove trailing cells or update the schema through the field-change process",
        def.owner
      );
    }

    const row = { _rowNumber: index + 1 };
    headerCells.forEach((header, cellIndex) => {
      row[header] = (cells[cellIndex] || "").trim();
    });
    rows.push(row);
  }

  return { file: def.file, headers: headerCells, rows };
}

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current);
  return result;
}

function validateHeaders(def, actualHeaders, collector) {
  const missing = def.headers.filter((header) => !actualHeaders.includes(header));
  const extras = actualHeaders.filter((header) => !def.headers.includes(header));

  for (const header of missing) {
    collector.report(
      "ERROR",
      def.file,
      1,
      header,
      "",
      "required header is missing",
      `add the ${header} column to ${def.file}`,
      def.owner
    );
  }

  for (const header of extras) {
    collector.report(
      "WARN",
      def.file,
      1,
      header,
      header,
      "header is not part of the approved schema",
      "remove the field or run the field-change process before using it in production",
      def.owner
    );
  }
}

module.exports = {
  loadTables,
};
