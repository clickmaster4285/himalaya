"""
Fix comparison blocks in articles-batch1.ts from article id 61 onward.
Re-parses vertical-layout tables from DOCX and reconstructs from section blocks.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import mammoth

BASE_DIR = Path(__file__).resolve().parent
CONTENT_SOURCE_DIR = BASE_DIR.parent / "content-source"
CONTENT_DIR = BASE_DIR.parent / "content"
TS_PATH = CONTENT_DIR / "articles-batch1.ts"
JSON_PATH = CONTENT_DIR / "articles-batch1.json"
MIN_ARTICLE_ID = 61

FIRST_COLUMN_MARKERS = {
    "Factor",
    "Villa",
    "Time",
    "Month",
    "Season",
    "Detail",
    "Activity",
    "Activities",
    "Use Case",
    "Location",
    "Property type",
    "Period",
    "Date",
    "Venue Type",
    "Meal",
    "Distance",
    "Details",
    "Feature",
}

METADATA_MARKERS = {
    "url slug",
    "target keywords",
    "word count",
    "template",
    "cluster",
    "comparison |",
    "pseo template",
}

STOP_LINE_PATTERNS = [
    r"^❓",
    r"^Q:",
    r"^A:",
    r"^📎",
    r"^When to ",
    r"^Who ",
    r"^Book ",
    r"^Booking ",
    r"^How to book",
    r"^Getting ",
    r"^Lead time:",
    r"^Frequently Asked",
    r"^→ ",
    r"^WhatsApp",
    r"^Contact ",
    r"^Questions to Ask",
    r"^You're ",
    r"^You want ",
    r"^You've ",
    r"^Trekking ",
    r"^Photography ",
]


def clean_text(text: str, max_len: int = 500) -> str:
    if not text:
        return ""
    text = text.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ")
    text = re.sub(r"\s+", " ", text)
    if len(text) > max_len:
        text = text[:max_len] + "..."
    return text


def is_stop_line(line: str) -> bool:
    return any(re.match(pat, line, re.IGNORECASE) for pat in STOP_LINE_PATTERNS)


def is_metadata_line(line: str) -> bool:
    lower = line.lower().strip()
    if lower.startswith("/"):
        return True
    if any(marker in lower for marker in METADATA_MARKERS):
        return True
    if re.match(r"^[\w\s,]+,\s*[\w\s,]+$", line) and len(line) > 80:
        return True
    return False


def is_section_heading(line: str) -> bool:
    if not line or is_stop_line(line) or is_metadata_line(line):
        return False
    if line in FIRST_COLUMN_MARKERS:
        return False
    if len(line) > 100:
        return False
    return True


def looks_like_value(text: str) -> bool:
    return bool(
        re.search(r"\d", text)
        or re.search(r"\b(feet|km|PKR|min|hour|★|°C|cm)\b", text, re.IGNORECASE)
        or "—" in text
        or "/" in text
    )


def looks_like_feature(text: str) -> bool:
    if not text or len(text) > 70:
        return False
    if looks_like_value(text):
        return False
    if text.startswith("/"):
        return False
    return True


def valid_header_cell(text: str) -> bool:
    if not text or is_metadata_line(text):
        return False
    if re.search(r"\d", text):
        return False
    if len(text) > 60:
        return False
    return True


def score_table_layout(lines: List[str], header_start: int, ncol: int, min_rows: int = 2) -> int:
    headers = lines[header_start : header_start + ncol]
    if len(headers) < ncol or not all(headers):
        return -1
    if not all(valid_header_cell(h) for h in headers):
        return -1
    if any(is_metadata_line(h) for h in headers):
        return -1

    data_start = header_start + ncol
    rows = 0
    score = 0
    i = data_start
    while i + ncol <= len(lines):
        chunk = lines[i : i + ncol]
        if not all(chunk):
            break
        if is_stop_line(chunk[0]):
            break
        if is_metadata_line(chunk[0]):
            break
        if not looks_like_feature(chunk[0]):
            score -= 8
            break
        for value in chunk[1:]:
            if not looks_like_value(value) and not looks_like_feature(value):
                score -= 1
            elif looks_like_value(value):
                score += 2
        rows += 1
        score += 4
        i += ncol

    if rows < min_rows:
        return -1
    # Prefer wider tables when scores are comparable.
    score += ncol * 3
    return score + rows


def parse_vertical_table_at(lines: List[str], header_start: int, heading: str) -> Optional[Tuple[str, List[str], List[Dict[str, str]], int]]:
    best_ncol = None
    best_score = -1

    for ncol in range(2, 7):
        if header_start + ncol >= len(lines):
            continue
        s = score_table_layout(lines, header_start, ncol)
        if s > best_score:
            best_score = s
            best_ncol = ncol

    if not best_ncol or best_score < 0:
        return None

    headers = [lines[header_start + i].strip() for i in range(best_ncol)]
    rows: List[Dict[str, str]] = []
    i = header_start + best_ncol

    while i + best_ncol <= len(lines):
        chunk = [lines[j].strip() for j in range(i, i + best_ncol)]
        if not all(chunk) or is_stop_line(chunk[0]) or is_metadata_line(chunk[0]):
            break
        if len(chunk[0]) > 100:
            break
        row: Dict[str, str] = {"feature": chunk[0]}
        for idx, value in enumerate(chunk[1:]):
            row[chr(ord("a") + idx)] = value
        rows.append(row)
        i += best_ncol

    if len(rows) < 2:
        return None

    return heading, headers, rows, i


def extract_tables_from_lines(lines: List[str]) -> List[Dict[str, Any]]:
    comparisons: List[Dict[str, Any]] = []
    seen = set()
    i = 0

    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue

        if line in FIRST_COLUMN_MARKERS:
            heading = "Comparison"
            if i > 0 and is_section_heading(lines[i - 1]):
                heading = lines[i - 1].strip()

            parsed = parse_vertical_table_at(lines, i, heading)
            if parsed:
                heading, columns, rows, end = parsed
                key = (heading.lower(), tuple(columns), len(rows))
                if key not in seen and not any(is_metadata_line(c) for c in columns):
                    seen.add(key)
                    comparisons.append(
                        {"type": "comparison", "heading": heading, "columns": columns, "rows": rows}
                    )
                i = end
                continue
        i += 1

    return comparisons


def extract_comparison_blocks(text: str) -> List[Dict[str, Any]]:
    lines = [l.strip() for l in text.replace("\r\n", "\n").split("\n") if l.strip()]
    return extract_tables_from_lines(lines)


def reconstruct_from_sections(blocks: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    sections = [b for b in blocks if b.get("type") == "section"]
    comparisons: List[Dict[str, Any]] = []

    def append_table(heading: str, columns: List[str], rows: List[Dict[str, str]]) -> None:
        if len(rows) >= 3:
            comparisons.append(
                {"type": "comparison", "heading": heading, "columns": columns, "rows": rows}
            )

    for idx, sec in enumerate(sections):
        heading = sec.get("heading", "")
        if heading != "Factor":
            continue

        paras = sec.get("paragraphs") or []
        col_b = paras[0] if paras else None
        col_c = None
        start_rows = idx + 1

        if idx + 1 < len(sections):
            nxt = sections[idx + 1]
            nxt_paras = nxt.get("paragraphs") or []
            if not nxt_paras and nxt.get("heading"):
                col_c = nxt["heading"]
                start_rows = idx + 2

        if not col_b or not col_c:
            continue

        columns = ["Factor", col_b, col_c]
        rows: List[Dict[str, str]] = []
        table_heading = "Comparison"
        for back in range(idx - 1, max(idx - 5, -1), -1):
            candidate = sections[back].get("heading", "")
            if candidate and candidate not in columns and is_section_heading(candidate):
                table_heading = candidate
                break

        j = start_rows
        while j < len(sections):
            s = sections[j]
            paras = s.get("paragraphs") or []
            if len(paras) >= 2:
                rows.append({"feature": s["heading"], "a": paras[0], "b": paras[1]})
                j += 1
            elif len(paras) == 1 and j + 1 < len(sections):
                nxt = sections[j + 1]
                nxt_paras = nxt.get("paragraphs") or []
                if not nxt_paras and nxt.get("heading"):
                    rows.append({"feature": s["heading"], "a": paras[0], "b": nxt["heading"]})
                    j += 2
                else:
                    break
            else:
                break

        append_table(table_heading, columns, rows)

    for idx, sec in enumerate(sections):
        if sec.get("heading") != "Villa":
            continue
        table_heading = "Recommended Configuration"
        if idx > 0 and is_section_heading(sections[idx - 1].get("heading", "")):
            table_heading = sections[idx - 1]["heading"]

        rows = []
        for s in sections[idx + 1 :]:
            paras = s.get("paragraphs") or []
            if len(paras) >= 3:
                rows.append(
                    {
                        "feature": s["heading"],
                        "a": paras[0],
                        "b": paras[1],
                        "c": paras[2],
                    }
                )
            else:
                break

        if rows:
            append_table(
                table_heading,
                ["Villa", "Capacity", "Rate (approx)", "Role"],
                rows,
            )

    # Generic two-column rows already split into section heading + two paragraphs.
    seen_features = set()
    for idx, sec in enumerate(sections):
        paras = sec.get("paragraphs") or []
        if len(paras) < 2:
            continue
        if sec.get("heading") in FIRST_COLUMN_MARKERS:
            continue
        if sec.get("heading") in ("Side-by-Side Comparison", "Recommended Configuration", "Villa", "Role"):
            continue

        # Build a run of consecutive 2-paragraph sections.
        run = []
        j = idx
        while j < len(sections):
            s = sections[j]
            p = s.get("paragraphs") or []
            if len(p) >= 2:
                run.append({"feature": s["heading"], "a": p[0], "b": p[1]})
                j += 1
            else:
                break
        if len(run) >= 3:
            table_heading = "Comparison"
            for back in range(idx - 1, max(idx - 4, -1), -1):
                candidate = sections[back].get("heading", "")
                if candidate in ("Side-by-Side Comparison", "The Core Differences", "Direct Comparison"):
                    table_heading = candidate
                    break
                if is_section_heading(candidate) and candidate not in FIRST_COLUMN_MARKERS:
                    table_heading = candidate
            cols = ["Factor", "Option A", "Option B"]
            if idx > 0 and sections[idx - 1].get("heading") == "PC Hotel Bhurban":
                cols = ["Factor", "PC Hotel Bhurban", "Himalaya Villas & Resorts"]
            key = (table_heading, tuple(r["feature"] for r in run[:3]))
            if key in seen_features:
                continue
            seen_features.add(key)
            append_table(table_heading, cols, run)

    return comparisons


def is_valid_comparison(comp: Dict[str, Any]) -> bool:
    rows = comp.get("rows") or []
    columns = comp.get("columns") or []
    heading = comp.get("heading", "")

    if len(rows) < 3:
        return False
    if not columns:
        return False
    if any(is_metadata_line(c) for c in columns):
        return False
    if heading.startswith("/") or is_metadata_line(heading):
        return False
    if len(heading) > 120 and "," in heading:
        return False
    if heading.lower().startswith("the two premium properties") and len(columns) == 2:
        return False
    return True


def choose_best_comparisons(comparisons: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    valid = [c for c in comparisons if is_valid_comparison(c)]
    if not valid:
        return []

    # Keep the richest valid table; allow a second only if clearly different heading.
    valid.sort(key=lambda c: (-len(c["rows"]), -len(c["columns"]), c["heading"]))
    best = [valid[0]]
    for comp in valid[1:]:
        if comp["heading"].lower() != best[0]["heading"].lower() and len(comp["rows"]) >= 5:
            best.append(comp)
    return best


def load_docx_comparisons() -> Dict[str, List[Dict[str, Any]]]:
    slug_map: Dict[str, List[Dict[str, Any]]] = {}

    for docx_path in sorted(CONTENT_SOURCE_DIR.glob("*.docx")):
        with open(docx_path, "rb") as doc:
            raw_text = mammoth.extract_raw_text(doc).value.strip()

        parts = re.split(r"(ARTICLE\s+\d+)", raw_text)
        current_id: Optional[str] = None
        current_content: List[str] = []

        def flush() -> None:
            nonlocal current_id, current_content
            if not current_id or not current_content:
                return
            if int(current_id) < MIN_ARTICLE_ID:
                return
            full_content = "\n".join(current_content).strip()
            slug_match = re.search(r"URL Slug\s*\n\s*/([\w-]+)", full_content, re.IGNORECASE)
            if slug_match:
                slug = slug_match.group(1).strip()
                tables = extract_comparison_blocks(full_content)
                existing = slug_map.get(slug, [])
                if not existing or sum(len(t.get("rows", [])) for t in tables) > sum(
                    len(t.get("rows", [])) for t in existing
                ):
                    slug_map[slug] = tables

        for part in parts:
            part = part.strip()
            if not part:
                continue
            match = re.match(r"ARTICLE\s+(\d+)", part)
            if match:
                flush()
                current_id = match.group(1)
                current_content = []
            else:
                current_content.append(part)
        flush()

    return slug_map


def render_comparison_block(block: Dict[str, Any], indent: str = "    ", use_double_quotes: bool = False) -> str:
    q = '"'
    type_key = '"type"' if use_double_quotes else "type"
    heading_key = '"heading"' if use_double_quotes else "heading"
    columns_key = '"columns"' if use_double_quotes else "columns"
    rows_key = '"rows"' if use_double_quotes else "rows"

    lines = [
        f"{indent}{{",
        f'{indent}  {type_key}: "comparison",',
        f'{indent}  {heading_key}: "{clean_text(block["heading"], 200)}",',
        f"{indent}  {columns_key}: [",
    ]
    for col in block["columns"]:
        lines.append(f'{indent}    "{clean_text(col, 80)}",')
    lines.append(f"{indent}  ],")
    lines.append(f"{indent}  {rows_key}: [")
    for row in block["rows"]:
        parts = []
        for key in ["feature", "a", "b", "c", "d", "e"]:
            if key in row and row[key]:
                parts.append(f'{key}: "{clean_text(row[key], 300)}"')
        lines.append(f"{indent}    {{ {', '.join(parts)} }},")
    lines.append(f"{indent}  ],")
    lines.append(f"{indent}}},")
    return "\n".join(lines)


def find_article_bounds(ts_content: str, article_id: str) -> Optional[Tuple[int, int]]:
    marker = f"export const article{article_id}: Article = {{"
    start = ts_content.find(marker)
    if start == -1:
        return None
    next_match = re.search(r"\nexport const article\d+: Article = \{", ts_content[start + len(marker) :])
    end = start + len(marker) + next_match.start() if next_match else len(ts_content)
    return start, end


def uses_quoted_keys(article_chunk: str) -> bool:
    return '"type": "comparison"' in article_chunk or '"slug":' in article_chunk[:400]


def remove_comparison_blocks(article_chunk: str) -> str:
    """Remove comparison blocks without breaking nested row objects."""
    result = []
    i = 0
    while i < len(article_chunk):
        match = re.search(r'\{\s*(?:"type": "comparison"|type: "comparison")', article_chunk[i:])
        if not match:
            result.append(article_chunk[i:])
            break

        start = i + match.start()
        result.append(article_chunk[i:start])

        brace_start = article_chunk.find("{", start)
        depth = 0
        end = brace_start
        for j in range(brace_start, len(article_chunk)):
            ch = article_chunk[j]
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    end = j + 1
                    break

        trailing = end
        if trailing < len(article_chunk) and article_chunk[trailing] == ",":
            trailing += 1

        i = trailing

    return "".join(result)


def patch_article_comparisons(article_chunk: str, new_comparisons: List[Dict[str, Any]]) -> str:
    quoted = uses_quoted_keys(article_chunk)
    cleaned = remove_comparison_blocks(article_chunk)

    if not new_comparisons:
        return cleaned

    rendered_blocks = "\n" + "\n".join(render_comparison_block(b, use_double_quotes=quoted) for b in new_comparisons)

    insert_patterns = [
        r'\n\s*\{\s*(?:"type": "faqs"|type: "faqs")',
        r'\n\s*\{\s*(?:"type": "cta"|type: "cta")',
        r'\n\s*\{\s*(?:"type": "related"|type: "related")',
    ]
    insert_at = None
    for pat in insert_patterns:
        m = re.search(pat, cleaned)
        if m:
            insert_at = m.start()
            break

    if insert_at is None:
        blocks_close = cleaned.rfind("  ],")
        return cleaned[:blocks_close] + rendered_blocks + "\n" + cleaned[blocks_close:] if blocks_close != -1 else cleaned

    return cleaned[:insert_at] + rendered_blocks + cleaned[insert_at:]


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")

    with open(JSON_PATH, encoding="utf-8") as f:
        articles = json.load(f)

    docx_map = load_docx_comparisons()
    print(f"DOCX tables found for {len(docx_map)} slugs")

    with open(TS_PATH, encoding="utf-8") as f:
        ts_content = f.read()

    updated = 0

    for article in articles:
        article_id = str(article["id"])
        if int(article_id) < MIN_ARTICLE_ID:
            continue

        slug = article.get("slug", "")
        docx_comparisons = choose_best_comparisons(docx_map.get(slug, []))
        reconstructed = choose_best_comparisons(reconstruct_from_sections(article.get("blocks", [])))

        if docx_comparisons:
            comparisons = docx_comparisons
        else:
            comparisons = reconstructed

        bounds = find_article_bounds(ts_content, article_id)
        if not bounds:
            continue

        start, end = bounds
        article_chunk = ts_content[start:end]
        patched = patch_article_comparisons(article_chunk, comparisons)
        if patched != article_chunk:
            ts_content = ts_content[:start] + patched + ts_content[end:]
            updated += 1

        old_blocks = article["blocks"]
        non_comparison = [b for b in old_blocks if b.get("type") != "comparison"]
        if comparisons:
            insert_idx = len(non_comparison)
            for idx, block in enumerate(non_comparison):
                if block.get("type") in ("faqs", "cta", "related"):
                    insert_idx = idx
                    break
            article["blocks"] = non_comparison[:insert_idx] + comparisons + non_comparison[insert_idx:]
        else:
            article["blocks"] = non_comparison

    with open(TS_PATH, "w", encoding="utf-8") as f:
        f.write(ts_content)
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)

    print(f"Patched {updated} articles in TS")


if __name__ == "__main__":
    main()
