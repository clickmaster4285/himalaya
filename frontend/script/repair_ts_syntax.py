"""Repair orphaned comparison row blocks left by broken regex removal."""

from __future__ import annotations

import re
from pathlib import Path

TS_PATH = Path(__file__).resolve().parent.parent / "content" / "articles-batch1.ts"


def find_orphan_row_blocks(content: str) -> list[tuple[int, int, str]]:
    """Return (start, end, block_text) for orphaned row arrays."""
    orphans: list[tuple[int, int, str]] = []
    pattern = re.compile(
        r"(?P<block>(?:\n[ \t]+\{\n[ \t]+feature: [^\n]+\n(?:[ \t]+[a-e]: [^\n]+\n)+[ \t]+\},?\n)+[ \t]+\],\n[ \t]+\},)"
    )

    for match in pattern.finditer(content):
        start = match.start("block")
        # Must NOT already be inside a comparison block opening.
        lookback = content[max(0, start - 500) : start]
        if re.search(r'type: "comparison"|"type": "comparison"', lookback):
            if "rows: [" in lookback.split("},")[-1] or "rows: [" in lookback[-120:]:
                continue
        if "rows: [" in lookback[-80:]:
            continue
        orphans.append((start, match.end("block"), match.group("block")))

    return orphans


def infer_columns(first_row: dict[str, str]) -> list[str]:
    keys = ["feature"] + [k for k in "abcde" if k in first_row]
    defaults = {
        2: ["Feature", "Details"],
        3: ["Feature", "Option A", "Option B"],
        4: ["Feature", "Column A", "Column B", "Column C"],
        5: ["Month", "Column A", "Column B", "Column C", "Column D"],
        6: ["Month", "Column A", "Column B", "Column C", "Column D", "Column E"],
    }
    return defaults.get(len(keys), ["Feature", "Column A", "Column B"])


def parse_row_objects(block: str) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    row_pattern = re.compile(
        r"\{\s*feature: \"((?:\\.|[^\"])*)\"((?:,\s*[a-e]: \"((?:\\.|[^\"])*)\")+)\s*\}",
        re.MULTILINE,
    )
    for m in row_pattern.finditer(block):
        row = {"feature": m.group(1)}
        for part in re.finditer(r"([a-e]): \"((?:\\.|[^\"])*)\"", m.group(0)):
            row[part.group(1)] = part.group(2)
        rows.append(row)
    return rows


def infer_heading(lookback: str) -> str:
    heading_match = re.findall(r'heading: "([^"]{5,120})"', lookback)
    if heading_match:
        last = heading_match[-1]
        if last not in ("Factor", "Villa", "Period", "Month"):
            return "Comparison"
    return "Comparison"


def repair(content: str) -> tuple[str, int]:
    orphans = find_orphan_row_blocks(content)
    if not orphans:
        return content, 0

    # Repair from end to start to preserve offsets.
    fixed = 0
    for start, end, block in sorted(orphans, key=lambda x: x[0], reverse=True):
        lookback = content[max(0, start - 800) : start]
        rows = parse_row_objects(block)
        if len(rows) < 2:
            continue

        columns = infer_columns(rows[0])
        # Use month-style heading when rows look like months.
        months = {"December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November"}
        if rows[0]["feature"] in months or rows[0]["feature"] == "November":
            heading = "Winter Weather — Bhurban Month by Month"
            if "Temp Range" in lookback or "Summer Weather" in lookback:
                heading = "Summer Weather — Murree and Bhurban Month by Month"
            columns = ["Month", "Bhurban Temp Range", "Snowfall Likelihood", "Road Conditions", "Crowd Level"]
            if len(rows[0]) == 5:
                columns = ["Month", "Bhurban Temp Range", "Snowfall Likelihood", "Road Conditions", "Crowd Level"]
            elif len(rows[0]) == 4:
                columns = ["Month", "Bhurban Temp Range", "Snowfall Likelihood", "Road Conditions"]
        else:
            heading = "Comparison"

        col_lines = ",\n".join(f'        "{c}"' for c in columns)
        row_lines = []
        for row in rows:
            parts = [f'feature: "{row["feature"]}"']
            for key in "abcde":
                if key in row:
                    parts.append(f'{key}: "{row[key]}"')
            row_lines.append(f"        {{ {', '.join(parts)} }},")

        replacement = (
            "\n    {\n"
            '      type: "comparison",\n'
            f'      heading: "{heading}",\n'
            "      columns: [\n"
            f"{col_lines},\n"
            "      ],\n"
            "      rows: [\n"
            + "\n".join(row_lines)
            + "\n      ],\n"
            "    },"
        )

        content = content[:start] + replacement + content[end:]
        fixed += 1

    return content, fixed


def main() -> None:
    content = TS_PATH.read_text(encoding="utf-8")
    repaired, count = repair(content)
    TS_PATH.write_text(repaired, encoding="utf-8")
    print(f"Repaired {count} orphaned comparison blocks")


if __name__ == "__main__":
    main()
