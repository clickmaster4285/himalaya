"""
convert_articles.py
Converts DOCX articles to full TypeScript article files with proper Article type structure.
Handles ALL block types: callout-qa, paragraph, section, facts, comparison, audience, cta, faqs, related.
Place in: frontend/script/
Run: python convert_articles.py
"""

import mammoth
import json
import os
import re
from typing import List, Dict, Any
from pathlib import Path

# -----------------------------
# PATH SETUP
# -----------------------------
BASE_DIR = os.path.dirname(__file__)
CONTENT_SOURCE_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "content-source"))
OUTPUT_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "content"))

print(f"📁 Base dir: {BASE_DIR}")
print(f"📁 Content source: {CONTENT_SOURCE_DIR}")
print(f"📁 Output dir: {OUTPUT_DIR}")

# -----------------------------
# CLEAN TEXT HELPERS
# -----------------------------

def clean_text(text: str, max_len: int = 500) -> str:
    """Clean text for TypeScript output."""
    if not text:
        return ""
    text = text.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')
    text = re.sub(r'\s+', ' ', text)
    if len(text) > max_len:
        text = text[:max_len] + "..."
    return text

def extract_metadata(text: str, pattern: str) -> str:
    """Extract metadata using regex pattern."""
    match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

def parse_slug_from_url(text: str) -> str:
    """Extract slug from URL line."""
    match = re.search(r'URL\s*\n\s*/([\w-]+)', text, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    return ""

# -----------------------------
# TABLE DETECTION
# -----------------------------

def detect_and_parse_table(content: str) -> List[str]:
    """Detect if content contains a table and parse it into markdown format."""
    lines = [l.strip() for l in content.split('\n') if l.strip()]
    
    if len(lines) < 2:
        return None
    
    if '|' in lines[0]:
        rows = []
        for line in lines:
            if line.startswith('|---') or line.startswith('| ---'):
                continue
            cells = [c.strip() for c in line.split('|') if c.strip()]
            if cells:
                rows.append(cells)
        if len(rows) >= 2:
            md_rows = []
            md_rows.append("| " + " | ".join(rows[0]) + " |")
            md_rows.append("| " + " | ".join(["---"] * len(rows[0])) + " |")
            for row in rows[1:]:
                while len(row) < len(rows[0]):
                    row.append("")
                md_rows.append("| " + " | ".join(row[:len(rows[0])]) + " |")
            return md_rows
    
    tab_lines = []
    for line in lines:
        parts = re.split(r'\s{2,}|\t', line)
        parts = [p.strip() for p in parts if p.strip()]
        if len(parts) >= 3:
            tab_lines.append(parts)
    
    if len(tab_lines) >= 2:
        headers = tab_lines[0]
        if all(len(h) < 20 for h in headers):
            md_rows = []
            md_rows.append("| " + " | ".join(headers) + " |")
            md_rows.append("| " + " | ".join(["---"] * len(headers)) + " |")
            for row in tab_lines[1:]:
                while len(row) < len(headers):
                    row.append("")
                md_rows.append("| " + " | ".join(row[:len(headers)]) + " |")
            return md_rows
    
    return None


def detect_table_from_lines(lines: List[str]) -> List[str]:
    """Detect table from lines where data is on separate lines."""
    if len(lines) < 5:
        return None
    
    first_line = lines[0].strip()
    if len(first_line) < 20 and not first_line.endswith('.'):
        headers = []
        for i in range(min(5, len(lines))):
            if i < len(lines):
                line = lines[i].strip()
                if len(line) < 30 and not re.search(r'\d', line):
                    headers.append(line)
                else:
                    break
        
        if len(headers) >= 2:
            data_start = len(headers)
            data_rows = []
            for i in range(data_start, len(lines)):
                line = lines[i].strip()
                if line.startswith('Week') or re.search(r'\d', line):
                    parts = re.split(r'\s{2,}', line)
                    parts = [p.strip() for p in parts if p.strip()]
                    if parts:
                        data_rows.append(parts)
                else:
                    if data_rows and len(data_rows) > 0:
                        data_rows[-1].append(line)
            
            if len(data_rows) >= 2:
                md_rows = []
                md_rows.append("| " + " | ".join(headers) + " |")
                md_rows.append("| " + " | ".join(["---"] * len(headers)) + " |")
                for row in data_rows:
                    while len(row) < len(headers):
                        row.append("")
                    md_rows.append("| " + " | ".join(row[:len(headers)]) + " |")
                return md_rows
    
    return None


def is_faq_article(text: str) -> bool:
    """Check if this is a FAQ-style article with Q: A: pairs."""
    q_count = len(re.findall(r'Q:\s*[^?]+\?', text))
    section_count = len(re.findall(r'Questions\s+[\d-]+', text))
    return q_count >= 5 or section_count >= 2


# -----------------------------
# PARSE ARTICLE - MAIN
# -----------------------------

def parse_article_content(text: str, article_id: str) -> Dict[str, Any]:
    """Parse raw article text into structured article data with blocks."""
    
    article = {
        "id": article_id,
        "slug": "",
        "title": "",
        "metaDescription": "",
        "keywords": "",
        "eyebrow": "",
        "h1": "",
        "heroTagline": "",
        "heroImage": f"/images/articles/article{article_id}-hero.jpg",
        "blocks": []
    }
    
    text = text.replace('\r\n', '\n')
    
    # ============================================
    # 1. EXTRACT METADATA
    # ============================================
    slug_match = re.search(r'URL\s*\n\s*/([\w-]+)', text, re.IGNORECASE)
    if slug_match:
        article["slug"] = slug_match.group(1).strip()
    
    kw_match = re.search(r'KW\s*\n\s*([^\n]+)', text, re.IGNORECASE)
    if kw_match:
        article["keywords"] = kw_match.group(1).strip()
    
    template_match = re.search(r'T\s*\n\s*([^\n]+)', text, re.IGNORECASE)
    cluster_match = re.search(r'C\s*\n\s*([^\n]+)', text, re.IGNORECASE)
    
    eyebrow_parts = []
    if template_match:
        eyebrow_parts.append(template_match.group(1).strip())
    if cluster_match:
        eyebrow_parts.append(cluster_match.group(1).strip())
    
    if eyebrow_parts:
        article["eyebrow"] = f"Backlink Guest Post · {' | '.join(eyebrow_parts)}"
    
    # ============================================
    # 2. EXTRACT TITLE
    # ============================================
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    
    title_parts = []
    for line in lines:
        if line.startswith('ARTICLE') or line.startswith('URL') or line.startswith('KW'):
            continue
        if line.startswith('WC') or line.startswith('T') or line.startswith('C'):
            continue
        if line.startswith('Template') or line.startswith('Cluster'):
            continue
        if line.startswith('Seasonal') or re.match(r'^[A-Za-z\s]+\|\s*Cluster', line):
            continue
        if '|' in line:
            continue
        title_parts.append(line)
        if len(title_parts) >= 2:
            break
    
    if title_parts:
        title = ' '.join(title_parts).strip()
        title = re.sub(r'\s+[A-Za-z\s]+\|\s*Cluster\s*\d+.*$', '', title)
        title = re.sub(r'\s+~\d+w.*$', '', title)
        title = re.sub(r'\s+/[\w-]+$', '', title)
        article["title"] = title.strip()
    if not article["title"]:
        article["title"] = f"Article {article_id}"
    
    article["h1"] = article["title"]
    
    # ============================================
    # 3. EXTRACT HERO TAGLINE
    # ============================================
    hero_lines = []
    found_title = False
    for line in lines:
        if '|' in line:
            continue
        if not found_title:
            if line == article["title"] or line.startswith(article["title"][:30]):
                found_title = True
            continue
        if line and not line.startswith('❓') and not line.startswith('📎'):
            if not re.match(r'^[A-Za-z\s]+\|\s*Cluster', line):
                if not line.startswith('Q:') and not line.startswith('A:'):
                    if not line.startswith('Week') and not line.startswith('Why November'):
                        if not line.startswith('Property Facts') and not line.startswith('Direct Comparison'):
                            hero_lines.append(line)
                            if len(' '.join(hero_lines)) > 100:
                                break
    
    if hero_lines:
        article["heroTagline"] = clean_text(' '.join(hero_lines), 400)
    
    if not article["heroTagline"]:
        hero_match = re.search(r'\n\n([^❓📎\n]{100,800}?)\n\n', text)
        if hero_match:
            hero_text = hero_match.group(1).strip()
            if not re.match(r'^[A-Za-z\s]+\|\s*Cluster', hero_text):
                article["heroTagline"] = clean_text(hero_text, 400)
    
    # ============================================
    # 4. PARSE BLOCKS
    # ============================================
    blocks = parse_all_blocks(text, article_id)
    
    # ============================================
    # 5. FINALIZE
    # ============================================
    
    if not blocks:
        blocks.append({
            "type": "section",
            "eyebrow": "Overview",
            "heading": article["title"][:100],
            "paragraphs": ["Content details coming soon."]
        })
    
    if not article["metaDescription"] and article["heroTagline"]:
        article["metaDescription"] = clean_text(article["heroTagline"], 200)
    
    if not article["metaDescription"] and blocks and blocks[0].get("paragraphs"):
        article["metaDescription"] = clean_text(blocks[0]["paragraphs"][0], 200)
    
    article["blocks"] = blocks
    return article


# -----------------------------
# PARSE ALL BLOCKS
# -----------------------------

def parse_all_blocks(text: str, article_id: str) -> List[Dict[str, Any]]:
    """Parse all blocks from text - handles all block types."""
    blocks = []
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    
    # ============================================
    # 1. FIND CALLOUT-QA (❓ sections)
    # ============================================
    qa_pattern = r'❓\s*([^?]+\?)\s*\n\s*([^❓📎]+?)(?=\n❓|\n📎|$|\n[A-Z][A-Za-z\s\-—]+?\n)'
    qa_matches = re.finditer(qa_pattern, text, re.DOTALL)
    
    for match in qa_matches:
        question = match.group(1).strip()
        answer = match.group(2).strip()
        if question and answer and len(question) > 5:
            blocks.append({
                "type": "callout-qa",
                "question": clean_text(question, 300),
                "answer": clean_text(answer, 700)
            })
    
    # ============================================
    # 2. FIND PARAGRAPHS (standalone text)
    # ============================================
    para_pattern = r'\n\n([^❓📎\n]{100,800}?)\n\n(?=[A-Z][A-Za-z\s\-—]+?\n|❓|📎|$)'
    para_matches = re.finditer(para_pattern, text, re.DOTALL)
    
    for match in para_matches:
        para_text = match.group(1).strip()
        if para_text and not para_text.startswith('❓') and not para_text.startswith('📎'):
            if not re.match(r'^[A-Za-z\s]+\|\s*Cluster', para_text):
                if '|' not in para_text:
                    if len(para_text) > 50:
                        if not para_text.startswith('Week') and not para_text.startswith('Why November'):
                            if not para_text.startswith('Property Facts') and not para_text.startswith('Direct Comparison'):
                                blocks.append({
                                    "type": "paragraph",
                                    "text": clean_text(para_text, 500)
                                })
    
    # ============================================
    # 3. FIND SECTIONS, FACTS, COMPARISON, AUDIENCE, CTA, FAQS, RELATED
    # ============================================
    
    # First, detect special sections by their headers
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Skip if too short or has pipe
        if len(line) < 4 or '|' in line:
            i += 1
            continue
        
        # Skip metadata lines
        if any(line.startswith(p) for p in ['ARTICLE', 'URL', 'KW', 'WC', 'T', 'C', 'Template', 'Cluster', '❓', '📎']):
            i += 1
            continue
        if re.match(r'^[A-Za-z\s]+\|\s*Cluster', line):
            i += 1
            continue
        
        # Check if this is a section header
        if re.match(r'^[A-Z][A-Za-z\s\-—]+$', line) or re.match(r'^[A-Z][A-Za-z\s\-—]+:', line):
            
            # Skip table-like headers
            if line in ["Week", "Temperature", "Forest Character", "Crowd", "Fire Pit"]:
                i += 1
                continue
            if line in ["Very low", "Minimal", "Essential from 4:30pm"]:
                i += 1
                continue
            
            # Collect content until next header
            content_lines = []
            i += 1
            while i < len(lines):
                next_line = lines[i].strip()
                if next_line and (re.match(r'^[A-Z][A-Za-z\s\-—]+$', next_line) or re.match(r'^[A-Z][A-Za-z\s\-—]+:', next_line)):
                    break
                if next_line:
                    content_lines.append(next_line)
                i += 1
            
            # ============================================
            # DETECT BLOCK TYPE FROM HEADER + CONTENT
            # ============================================
            
            # --- FACTS BLOCK ---
            if 'Property Facts' in line or 'Key Facts' in line or 'Facts' in line and len(line) < 30:
                items = []
                for cl in content_lines:
                    if ':' in cl:
                        parts = cl.split(':', 1)
                        label = parts[0].strip()
                        value = parts[1].strip() if len(parts) > 1 else ''
                        if label and value:
                            items.append({"label": clean_text(label, 50), "value": clean_text(value, 150)})
                if items:
                    blocks.append({
                        "type": "facts",
                        "heading": clean_text(line, 200),
                        "items": items
                    })
                    continue
            
            # --- COMPARISON BLOCK ---
            if 'Comparison' in line or 'vs' in line.lower():
                # Try to parse as comparison table
                columns = []
                rows = []
                
                # Check if content has column headers
                if content_lines and '|' in content_lines[0]:
                    # Parse pipe table
                    pipe_rows = []
                    for cl in content_lines:
                        if '|' in cl and not cl.startswith('|---'):
                            cells = [c.strip() for c in cl.split('|') if c.strip()]
                            if cells:
                                pipe_rows.append(cells)
                    if len(pipe_rows) >= 2:
                        columns = pipe_rows[0]
                        for row in pipe_rows[1:]:
                            if len(row) >= 2:
                                rows.append({
                                    "feature": clean_text(row[0], 100),
                                    "a": clean_text(row[1], 200) if len(row) > 1 else "",
                                    "b": clean_text(row[2], 200) if len(row) > 2 else ""
                                })
                        if rows:
                            blocks.append({
                                "type": "comparison",
                                "heading": clean_text(line, 200),
                                "columns": columns,
                                "rows": rows
                            })
                            continue
                
                # Try space-separated comparison
                if len(content_lines) >= 3:
                    # Check if first line has headers like "Feature | A | B"
                    first_line = content_lines[0] if content_lines else ""
                    if 'Feature' in first_line or 'Factor' in first_line:
                        # Parse as comparison
                        headers = re.split(r'\s{2,}|\t|\|', first_line)
                        headers = [h.strip() for h in headers if h.strip()]
                        if len(headers) >= 3:
                            columns = headers
                            comp_rows = []
                            for cl in content_lines[1:]:
                                if cl:
                                    parts = re.split(r'\s{2,}|\t|\|', cl)
                                    parts = [p.strip() for p in parts if p.strip()]
                                    if len(parts) >= 3:
                                        comp_rows.append({
                                            "feature": clean_text(parts[0], 100),
                                            "a": clean_text(parts[1], 200),
                                            "b": clean_text(parts[2], 200)
                                        })
                            if comp_rows:
                                blocks.append({
                                    "type": "comparison",
                                    "heading": clean_text(line, 200),
                                    "columns": columns,
                                    "rows": comp_rows
                                })
                                continue
            
            # --- AUDIENCE BLOCK ---
            if 'Who Should Choose' in line or 'Who Should Book' in line or 'Best For' in line:
                items = []
                current_title = ""
                current_text = ""
                for cl in content_lines:
                    if cl.endswith(':') or (len(cl) < 50 and ':' in cl):
                        if current_title and current_text:
                            items.append({"title": clean_text(current_title, 100), "text": clean_text(current_text, 300)})
                        current_title = cl.replace(':', '').strip()
                        current_text = ""
                    elif current_title:
                        current_text += " " + cl
                if current_title and current_text:
                    items.append({"title": clean_text(current_title, 100), "text": clean_text(current_text, 300)})
                if items:
                    blocks.append({
                        "type": "audience",
                        "heading": clean_text(line, 200),
                        "items": items
                    })
                    continue
            
            # --- CTA BLOCK ---
            if 'Book' in line or 'WhatsApp' in line or 'Enquire' in line:
                # Check if it's a CTA
                button_match = re.search(r'WhatsApp[\s:]*\+92\s*3\d{2}\s*\d{7}', text)
                button_label = "WhatsApp: +92 304 567 9000  |  wa.me/923045679000"
                button_href = "https://wa.me/923045679000"
                
                # Build text from content
                cta_text = ' '.join(content_lines[:3]) if content_lines else ""
                
                blocks.append({
                    "type": "cta",
                    "eyebrow": clean_text(line, 120),
                    "heading": clean_text(line, 200),
                    "text": clean_text(cta_text, 300),
                    "buttonLabel": button_label,
                    "buttonHref": button_href,
                    "footnote": "Direct bookings receive priority response and best available rate."
                })
                continue
            
            # --- FAQS BLOCK ---
            if 'Frequently Asked Questions' in line or 'FAQs' in line or 'FAQ' in line:
                items = []
                q = ""
                a = ""
                for cl in content_lines:
                    if cl.startswith('Q:') or cl.startswith('Q -') or cl.startswith('Q.'):
                        if q and a:
                            items.append({"q": clean_text(q, 200), "a": clean_text(a, 350)})
                        q = cl.replace('Q:', '').replace('Q -', '').replace('Q.', '').strip()
                        a = ""
                    elif cl.startswith('A:') or cl.startswith('A -') or cl.startswith('A.'):
                        a = cl.replace('A:', '').replace('A -', '').replace('A.', '').strip()
                    elif q and not a:
                        # If we have a question but no answer yet, this might be the answer
                        if len(cl) > 10:
                            a += " " + cl
                if q and a:
                    items.append({"q": clean_text(q, 200), "a": clean_text(a, 350)})
                if items:
                    blocks.append({
                        "type": "faqs",
                        "heading": clean_text(line, 200),
                        "items": items
                    })
                    continue
            
            # --- RELATED BLOCK ---
            if 'Related Pages' in line or 'Internal Links' in line:
                items = []
                for cl in content_lines:
                    if cl.startswith('→') or cl.startswith('-') or cl.startswith('•'):
                        # Try to extract href and label
                        href_match = re.search(r'/([\w-]+(?:/[\w-]+)*)', cl)
                        label = cl.replace('→', '').replace('-', '').replace('•', '').strip()
                        if href_match:
                            href = '/' + href_match.group(1)
                            items.append({"href": href, "label": clean_text(label, 100)})
                if items:
                    blocks.append({
                        "type": "related",
                        "heading": clean_text(line, 200),
                        "items": items
                    })
                    continue
            
            # --- REGULAR SECTION ---
            # Check if it's a table
            table_md = detect_and_parse_table('\n'.join(content_lines))
            if not table_md:
                table_md = detect_table_from_lines(content_lines)
            
            if table_md:
                blocks.append({
                    "type": "section",
                    "eyebrow": clean_text(line.split('—')[0].strip() if '—' in line else line, 100),
                    "heading": clean_text(line, 200),
                    "paragraphs": table_md
                })
                continue
            
            # Regular section with paragraphs
            paragraphs = []
            bullets = []
            for p in content_lines:
                if '|' in p:
                    continue
                if p.startswith('•') or p.startswith('-') or p.startswith('*'):
                    # Check if it has a label (e.g., "Shared common areas: text")
                    if ':' in p and len(p.split(':', 1)[0]) < 30:
                        parts = p.split(':', 1)
                        label = parts[0].strip().lstrip('• - *')
                        text = parts[1].strip()
                        bullets.append({"label": clean_text(label, 50), "text": clean_text(text, 300)})
                    else:
                        bullets.append({"text": clean_text(p.lstrip('• - *'), 300)})
                elif p and not p.startswith('Q:') and not p.startswith('A:'):
                    if not p.startswith('Week') or len(p) > 20:
                        paragraphs.append(clean_text(p, 350))
            
            if paragraphs or bullets:
                block = {
                    "type": "section",
                    "eyebrow": clean_text(line.split('—')[0].strip() if '—' in line else line, 100),
                    "heading": clean_text(line, 200),
                }
                if paragraphs:
                    block["paragraphs"] = paragraphs[:12]
                if bullets:
                    block["bullets"] = bullets[:15]
                blocks.append(block)
                continue
        
        i += 1
    
    # ============================================
    # 4. FIND FAQS (Q: A: pairs not in sections)
    # ============================================
    qa_pairs = re.findall(r'Q:\s*([^?\n]+?)\s*\n\s*A:\s*([^❓📎\n]+(?:[^\n]+)?)', text, re.DOTALL)
    if qa_pairs:
        has_faq_block = any(b.get("type") == "faqs" for b in blocks)
        if not has_faq_block:
            items = []
            for question, answer in qa_pairs:
                q = question.strip()
                a = answer.strip()
                if q and a:
                    items.append({"q": clean_text(q, 200), "a": clean_text(a, 350)})
            if items:
                blocks.append({
                    "type": "faqs",
                    "heading": "Frequently Asked Questions",
                    "items": items
                })
    
    # ============================================
    # 5. FIND RELATED (→ links)
    # ============================================
    if not any(b.get("type") == "related" for b in blocks):
        related_items = []
        related_pattern = r'→\s*/([\w-]+(?:/[\w-]+)*)\s*[—\-]+\s*([^\n]+)'
        related_matches = re.finditer(related_pattern, text)
        for match in related_matches:
            href = '/' + match.group(1)
            label = match.group(2).strip()
            related_items.append({"href": href, "label": clean_text(label, 100)})
        
        if related_items:
            blocks.append({
                "type": "related",
                "heading": "Related Pages — Internal Links",
                "items": related_items
            })
    
    return blocks


# -----------------------------
# GENERATE TYPESCRIPT
# -----------------------------

def generate_typescript_file(articles: List[Dict[str, Any]], batch_num: int = 47) -> str:
    """Generate complete TypeScript file with all articles."""
    
    if not articles:
        return "// No articles found"
    
    start_num = min(int(a["id"]) for a in articles)
    end_num = max(int(a["id"]) for a in articles)
    
    ts_lines = [
        f"// articles-batch{batch_num}.ts",
        f"// Guest Posts {start_num}-{end_num} - Complete TypeScript file with all content preserved",
        "",
        'import type {{ Article }} from "./types";',
        "",
        "// ============================================",
        "// DUMMY IMAGE PATHS FOR ARTICLES",
        "// ============================================",
        ""
    ]
    
    for article in articles:
        article_id = article["id"]
        title_short = article["title"][:50] if article["title"] else f"Article {article_id}"
        ts_lines.extend([
            f"// Article {article_id} - {clean_text(title_short, 50)}",
            f"const article{article_id}Hero = \"/images/articles/article{article_id}-hero.jpg\";",
            f"const article{article_id}Image1 = \"/images/articles/article{article_id}-image1.jpg\";",
            f"const article{article_id}Image2 = \"/images/articles/article{article_id}-image2.jpg\";",
            ""
        ])
    
    article_constants = []
    article_slugs = {}
    
    for article in articles:
        article_id = article["id"]
        slug = article.get("slug", f"article-{article_id}")
        title = article["title"]
        meta_desc = article.get("metaDescription", title)
        keywords = article.get("keywords", "")
        eyebrow = article.get("eyebrow", f"Guest Post | Article {article_id}")
        h1 = article.get("h1", title)
        hero_tagline = article.get("heroTagline", title)
        hero_image_var = f"article{article_id}Hero"
        
        ts_lines.extend([
            f"// ============================================",
            f"// ARTICLE {article_id} - {clean_text(title, 80)}",
            f"// ============================================",
            f"export const article{article_id}: Article = {{",
            f'  slug: "{clean_text(slug, 100)}",',
            f'  title: "{clean_text(title, 200)}",',
            f'  metaDescription:',
            f'    "{clean_text(meta_desc, 300)}",',
            f'  keywords:',
            f'    "{clean_text(keywords, 200)}",',
            f'  eyebrow: "{clean_text(eyebrow, 150)}",',
            f'  h1: "{clean_text(h1, 200)}",',
            f'  heroTagline:',
            f'    "{clean_text(hero_tagline, 400)}",',
            f'  heroImage: {hero_image_var},',
            f'  blocks: [',
        ])
        
        blocks = article.get("blocks", [])
        for block_idx, block in enumerate(blocks):
            block_type = block.get("type", "section")
            ts_lines.append(f"    {{")
            ts_lines.append(f'      type: "{block_type}",')
            
            if block_type == "callout-qa":
                question = block.get("question", "")
                answer = block.get("answer", "")
                ts_lines.append(f'      question: "{clean_text(question, 250)}",')
                ts_lines.append(f'      answer: "{clean_text(answer, 700)}",')
            
            elif block_type == "paragraph":
                text_content = block.get("text", "")
                ts_lines.append(f'      text: "{clean_text(text_content, 500)}",')
            
            elif block_type == "section":
                eyebrow_text = block.get("eyebrow", "")
                heading = block.get("heading", "")
                paragraphs = block.get("paragraphs", [])
                bullets = block.get("bullets", [])
                
                if eyebrow_text:
                    ts_lines.append(f'      eyebrow: "{clean_text(eyebrow_text, 120)}",')
                ts_lines.append(f'      heading: "{clean_text(heading, 200)}",')
                
                if paragraphs:
                    ts_lines.append(f'      paragraphs: [')
                    for p in paragraphs[:20]:
                        ts_lines.append(f'        "{clean_text(p, 400)}",')
                    ts_lines.append(f'      ],')
                
                if bullets:
                    ts_lines.append(f'      bullets: [')
                    for b in bullets[:15]:
                        if "label" in b:
                            ts_lines.append(f'        {{ label: "{clean_text(b["label"], 50)}", text: "{clean_text(b["text"], 300)}" }},')
                        else:
                            ts_lines.append(f'        {{ text: "{clean_text(b["text"], 300)}" }},')
                    ts_lines.append(f'      ],')
                
                if block_idx > 0 and block_idx % 2 == 1:
                    image_num = 1 if block_idx == 1 else 2
                    ts_lines.append(f'      image: {{')
                    ts_lines.append(f'        src: article{article_id}Image{image_num},')
                    ts_lines.append(f'        alt: "{clean_text(heading, 100)}",')
                    ts_lines.append(f'      }},')
            
            elif block_type == "facts":
                heading = block.get("heading", "")
                items = block.get("items", [])
                ts_lines.append(f'      heading: "{clean_text(heading, 200)}",')
                if items:
                    ts_lines.append(f'      items: [')
                    for item in items[:15]:
                        ts_lines.append(f'        {{ label: "{clean_text(item.get("label", ""), 50)}", value: "{clean_text(item.get("value", ""), 150)}" }},')
                    ts_lines.append(f'      ],')
            
            elif block_type == "comparison":
                heading = block.get("heading", "")
                columns = block.get("columns", [])
                rows = block.get("rows", [])
                ts_lines.append(f'      heading: "{clean_text(heading, 200)}",')
                if columns:
                    ts_lines.append(f'      columns: [')
                    for col in columns[:5]:
                        ts_lines.append(f'        "{clean_text(col, 50)}",')
                    ts_lines.append(f'      ],')
                if rows:
                    ts_lines.append(f'      rows: [')
                    for row in rows[:15]:
                        ts_lines.append(f'        {{ feature: "{clean_text(row.get("feature", ""), 100)}", a: "{clean_text(row.get("a", ""), 200)}", b: "{clean_text(row.get("b", ""), 200)}" }},')
                    ts_lines.append(f'      ],')
            
            elif block_type == "audience":
                heading = block.get("heading", "")
                items = block.get("items", [])
                ts_lines.append(f'      heading: "{clean_text(heading, 200)}",')
                if items:
                    ts_lines.append(f'      items: [')
                    for item in items[:10]:
                        ts_lines.append(f'        {{ title: "{clean_text(item.get("title", ""), 100)}", text: "{clean_text(item.get("text", ""), 300)}" }},')
                    ts_lines.append(f'      ],')
            
            elif block_type == "cta":
                eyebrow_text = block.get("eyebrow", "")
                heading = block.get("heading", "")
                text_content = block.get("text", "")
                button_label = block.get("buttonLabel", "")
                button_href = block.get("buttonHref", "")
                footnote = block.get("footnote", "")
                
                if eyebrow_text:
                    ts_lines.append(f'      eyebrow: "{clean_text(eyebrow_text, 120)}",')
                ts_lines.append(f'      heading: "{clean_text(heading, 200)}",')
                ts_lines.append(f'      text: "{clean_text(text_content, 300)}",')
                ts_lines.append(f'      buttonLabel: "{clean_text(button_label, 100)}",')
                ts_lines.append(f'      buttonHref: "{clean_text(button_href, 100)}",')
                if footnote:
                    ts_lines.append(f'      footnote: "{clean_text(footnote, 200)}",')
            
            elif block_type == "faqs":
                heading = block.get("heading", "")
                items = block.get("items", [])
                ts_lines.append(f'      heading: "{clean_text(heading, 200)}",')
                if items:
                    ts_lines.append(f'      items: [')
                    for item in items[:15]:
                        ts_lines.append(f'        {{ q: "{clean_text(item.get("q", ""), 200)}", a: "{clean_text(item.get("a", ""), 350)}" }},')
                    ts_lines.append(f'      ],')
            
            elif block_type == "related":
                heading = block.get("heading", "")
                items = block.get("items", [])
                ts_lines.append(f'      heading: "{clean_text(heading, 200)}",')
                if items:
                    ts_lines.append(f'      items: [')
                    for item in items[:15]:
                        ts_lines.append(f'        {{ href: "{clean_text(item.get("href", ""), 100)}", label: "{clean_text(item.get("label", ""), 100)}" }},')
                    ts_lines.append(f'      ],')
            
            ts_lines.append(f"    }},")
        
        ts_lines.extend([
            f"  ],",
            f"}};",
            f""
        ])
        
        article_constants.append(f"  article{article_id},")
        if slug:
            article_slugs[slug] = f"article{article_id}"
    
    ts_lines.extend([
        f"// ============================================",
        f"// EXPORT ALL ARTICLES {start_num}-{end_num}",
        f"// ============================================",
        f"export const articlesBatch{batch_num} = [",
    ])
    
    for constant in article_constants:
        ts_lines.append(f"  {constant}")
    
    ts_lines.extend([
        f"];",
        f"",
        f"// Export articles by slug",
        f"export const articlesBySlugBatch{batch_num} = {{",
    ])
    
    for slug, const_name in article_slugs.items():
        ts_lines.append(f'  "{slug}": {const_name},')
    
    ts_lines.extend([
        f"}};",
        f"",
        f"export default articlesBatch{batch_num};",
    ])
    
    return '\n'.join(ts_lines)


# -----------------------------
# MAIN
# -----------------------------

def main():
    all_articles = []
    
    content_path = Path(CONTENT_SOURCE_DIR)
    if not content_path.exists():
        print(f"❌ Content source folder not found: {CONTENT_SOURCE_DIR}")
        content_path.mkdir(parents=True, exist_ok=True)
        print(f"📁 Please place your .docx files in: {CONTENT_SOURCE_DIR}")
        return
    
    docx_files = list(content_path.glob("*.docx"))
    
    if not docx_files:
        print(f"❌ No .docx files found in: {CONTENT_SOURCE_DIR}")
        return
    
    print(f"📁 Found {len(docx_files)} DOCX file(s)")
    print("=" * 60)
    
    for docx_path in docx_files:
        print(f"📄 Processing: {docx_path.name}")
        try:
            with open(docx_path, "rb") as doc:
                result = mammoth.extract_raw_text(doc)
            
            raw_text = result.value.strip()
            
            parts = re.split(r"(ARTICLE\s+\d+)", raw_text)
            
            articles_data = []
            current_id = None
            current_content = []
            
            for part in parts:
                part = part.strip()
                if not part:
                    continue
                
                match = re.match(r"ARTICLE\s+(\d+)", part)
                if match:
                    if current_id and current_content:
                        full_content = '\n'.join(current_content).strip()
                        if full_content:
                            parsed = parse_article_content(full_content, current_id)
                            articles_data.append(parsed)
                    
                    current_id = match.group(1)
                    current_content = []
                else:
                    current_content.append(part)
            
            if current_id and current_content:
                full_content = '\n'.join(current_content).strip()
                if full_content:
                    parsed = parse_article_content(full_content, current_id)
                    articles_data.append(parsed)
            
            print(f"  ✅ Found {len(articles_data)} articles in {docx_path.name}")
            all_articles.extend(articles_data)
            
        except Exception as e:
            print(f"  ❌ Error processing {docx_path.name}: {e}")
            import traceback
            traceback.print_exc()
    
    print("=" * 60)
    print(f"✅ Total articles parsed: {len(all_articles)}")
    
    if not all_articles:
        print("❌ No articles found in any DOCX file.")
        return
    
    all_articles.sort(key=lambda x: int(x["id"]) if x["id"].isdigit() else 999999)
    
    batch_num = 47
    if all_articles and all_articles[0]["id"].isdigit():
        first_id = int(all_articles[0]["id"])
        batch_num = (first_id // 10) + 1
        if first_id % 10 == 0:
            batch_num = first_id // 10
    
    ts_content = generate_typescript_file(all_articles, batch_num)
    
    ts_path = os.path.join(OUTPUT_DIR, f"articles-batch{batch_num}.ts")
    with open(ts_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"✅ TypeScript saved: {ts_path}")
    
    json_path = os.path.join(OUTPUT_DIR, f"articles-batch{batch_num}.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(all_articles, f, ensure_ascii=False, indent=2)
    print(f"✅ JSON saved: {json_path}")
    
    print("\n📋 Article Summary:")
    for article in all_articles:
        blocks_count = len(article.get("blocks", []))
        print(f"  Article {article['id']}: {article['title'][:60]}...")
        print(f"    Slug: /{article.get('slug', 'N/A')}")
        print(f"    Blocks: {blocks_count}")


if __name__ == "__main__":
    main()