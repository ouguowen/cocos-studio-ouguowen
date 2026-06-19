const SEVERITY_ORDER = { ERROR: 0, WARN: 1, INFO: 2 };

function createIssueCollector() {
  const issues = [];

  return {
    report(severity, table, row, field, value, reason, fix, owner) {
      issues.push({ severity, table, row, field, value, reason, fix, owner });
    },
    getIssues() {
      return [...issues];
    },
    hasErrors() {
      return issues.some((issue) => issue.severity === "ERROR");
    },
    counts() {
      return {
        errors: issues.filter((issue) => issue.severity === "ERROR").length,
        warnings: issues.filter((issue) => issue.severity === "WARN").length,
        info: issues.filter((issue) => issue.severity === "INFO").length,
      };
    },
  };
}

function sortIssues(issues) {
  return [...issues].sort((a, b) => {
    const bySeverity = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
    if (bySeverity !== 0) {
      return bySeverity;
    }

    return String(a.table).localeCompare(String(b.table));
  });
}

function printIssues(issues) {
  const sorted = sortIssues(issues);

  if (sorted.length === 0) {
    console.log("Validation passed. No issues found.");
    return;
  }

  for (const issue of sorted) {
    console.log(`[${issue.severity}] ${issue.table} row=${issue.row} field=${issue.field} value=${issue.value}`);
    console.log(`Reason: ${issue.reason}`);
    console.log(`Fix: ${issue.fix}`);
    console.log(`Owner: ${issue.owner}`);
    console.log("");
  }

  const counts = {
    errors: sorted.filter((issue) => issue.severity === "ERROR").length,
    warnings: sorted.filter((issue) => issue.severity === "WARN").length,
    info: sorted.filter((issue) => issue.severity === "INFO").length,
  };

  console.log(
    `Summary: ${counts.errors} error(s), ${counts.warnings} warning(s), ${counts.info} info item(s).`
  );
}

module.exports = {
  createIssueCollector,
  printIssues,
};
