function hasValue(value) {
  return value !== undefined && value !== null && String(value).trim() !== "";
}

function isEnabled(row) {
  return row && row.enabled === "1";
}

function isBoolean01(value) {
  return value === "0" || value === "1";
}

function isInteger(value) {
  return /^-?\d+$/.test(String(value).trim());
}

function isNumber(value) {
  return /^-?\d+(\.\d+)?$/.test(String(value).trim());
}

function indexUnique(table, field) {
  const map = new Map();
  if (!table) {
    return map;
  }

  for (const row of table.rows) {
    if (hasValue(row[field]) && !map.has(row[field])) {
      map.set(row[field], row);
    }
  }

  return map;
}

function groupBy(table, field) {
  const map = new Map();
  if (!table) {
    return map;
  }

  for (const row of table.rows) {
    if (!hasValue(row[field])) {
      continue;
    }

    if (!map.has(row[field])) {
      map.set(row[field], []);
    }

    map.get(row[field]).push(row);
  }

  return map;
}

function toCamelCase(value) {
  return String(value).replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

function toLowerCamelCase(value) {
  const camel = toCamelCase(value);
  return camel.charAt(0).toLowerCase() + camel.slice(1);
}

function mapToObject(map, project) {
  const object = {};
  for (const [key, value] of map.entries()) {
    object[key] = project ? project(value, key) : value;
  }
  return object;
}

function normalizeValue(field, value, def) {
  if (!hasValue(value)) {
    return null;
  }

  if ((def.booleans || []).includes(field)) {
    return value === "1";
  }

  if ((def.ints || []).includes(field) || (def.numbers || []).includes(field)) {
    return Number(value);
  }

  if (field === "tags") {
    return value.split("|").map((item) => item.trim()).filter(Boolean);
  }

  return value;
}

module.exports = {
  groupBy,
  hasValue,
  indexUnique,
  isBoolean01,
  isEnabled,
  isInteger,
  isNumber,
  mapToObject,
  normalizeValue,
  toCamelCase,
  toLowerCamelCase,
};
