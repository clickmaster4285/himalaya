"""
convert_articles.py
Converts DOCX articles to full TypeScript article files with proper Article type structure.
"""

import mammoth
import json
import os
import re
from typing import List, Dict, Any, Optional, Tuple
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

# -----------------------------
# BLOCK DETECTION
# -----------------------------

def detect_block_type(line: str, next_lines: List[str] = None, idx: int = 0) -> str:
    """Detect the block type from a line of text with context."""
    if not line:
        return 'empty'
    
    # Callout QA - starts with ❓
    if line.startswith('❓'):
        return 'callout-qa'
    
    # FAQ - contains FAQ or Frequently Asked Questions
    if 'Frequently Asked Questions' in line or 'FAQ' in line:
        return 'faqs'
    
    # Check for Q: pattern (this is FAQ content)
    if line.startswith('Q:') or line.startswith('A:'):
        return 'faqs'
    
    # Comparison - contains comparison keywords or looks like a table
    if any(kw in line for kw in ['Direct Comparison', 'vs', 'VS']):
        return 'comparison'
    
    # Check if this looks like a comparison table row (Feature + 3+ space-separated values)
    parts = re.split(r'\s{3,}', line)
    parts = [p.strip() for p in parts if p.strip()]
    if len(parts) >= 3:
        # Check if it's a comparison table (Feature + 2+ values)
        # Skip if it's a heading (starts with capital, short)
        if not re.match(r'^[A-Z][A-Za-z\s\-—]{3,40}$', line):
            return 'comparison'
    
    # Facts - contains facts keywords
    if any(kw in line for kw in ['Property Facts', 'Key Facts', 'Quick Facts']):
        return 'facts'
    
    # CTA - contains booking keywords (but not FAQ content)
    if any(kw in line for kw in ['Book Your', 'How to Book', 'Book Now', 'WhatsApp', 'Stay at', 'Enquire']):
        # Don't detect if it's in FAQ
        if not line.startswith('Q:') and not line.startswith('A:'):
            return 'cta'
    
    # Audience - contains audience keywords
    if any(kw in line for kw in ['Who Should Choose', 'Best For', 'Guest Type', 'Perfect For']):
        return 'audience'
    
    # Related - contains related keywords
    if any(kw in line for kw in ['Related Pages', 'Internal Links', 'See Also']):
        return 'related'
    
    # Section heading - starts with capital, 3-60 chars, doesn't end with . or ?
    if re.match(r'^[A-Z][A-Za-z\s\-—]{3,60}$', line) and not line.endswith('.') and not line.endswith('?'):
        return 'section'
    
    # Paragraph - everything else with content
    if len(line) > 15:
        return 'paragraph'
    
    return 'empty'

# -----------------------------
# FIND BLOCK END
# -----------------------------

def find_block_end(lines: List[str], start_idx: int, block_type: str) -> int:
    """Find where the current block ends."""
    i = start_idx + 1
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
        
        next_type = detect_block_type(line, lines, i)
        
        # For comparison tables, capture all rows
        if block_type == 'comparison':
            # Check if this line continues the table
            parts = re.split(r'\s{3,}', line)
            parts = [p.strip() for p in parts if p.strip()]
            if len(parts) >= 3:
                i += 1
                continue
            # Stop if we hit a new block
            if next_type in ['callout-qa', 'section', 'facts', 'audience', 'cta', 'faqs', 'related']:
                break
            i += 1
            continue
        
        # For FAQ, capture all Q&A pairs
        if block_type == 'faqs':
            if next_type in ['callout-qa', 'section', 'facts', 'comparison', 'audience', 'cta', 'related']:
                break
            i += 1
            continue
        
        # For other blocks
        if next_type in ['callout-qa', 'section', 'facts', 'comparison', 'audience', 'cta', 'faqs', 'related']:
            break
        
        i += 1
    
    return i

# -----------------------------
# BLOCK PARSING
# -----------------------------

def parse_callout_qa(lines: List[str], start_idx: int, end_idx: int) -> Dict:
    """Parse Q&A callout block."""
    question = lines[start_idx].strip().replace('❓', '').strip()
    answer = ' '.join([l.strip() for l in lines[start_idx+1:end_idx] if l.strip() and not l.startswith('📎')])
    return {
        'type': 'callout-qa',
        'question': clean_text(question, 250),
        'answer': clean_text(answer, 700)
    }

def parse_paragraph(lines: List[str], start_idx: int, end_idx: int) -> Dict:
    """Parse paragraph block."""
    text = ' '.join([l.strip() for l in lines[start_idx:end_idx] if l.strip() and not l.startswith('📎')])
    return {
        'type': 'paragraph',
        'text': clean_text(text, 500)
    }

def parse_section(lines: List[str], start_idx: int, end_idx: int) -> Dict:
    """Parse section block with heading, paragraphs, and bullets."""
    heading = lines[start_idx].strip()
    paragraphs = []
    bullets = []
    
    for line in lines[start_idx+1:end_idx]:
        line = line.strip()
        if not line or line.startswith('📎'):
            continue
        
        if line.startswith('•') or line.startswith('-') or line.startswith('→'):
            bullet_text = re.sub(r'^[•\-→]\s*', '', line)
            label_match = re.match(r'^([A-Za-z\s]+):\s*(.+)', bullet_text)
            if label_match:
                bullets.append({
                    'label': label_match.group(1).strip(),
                    'text': label_match.group(2).strip()
                })
            else:
                bullets.append({'text': bullet_text})
        else:
            paragraphs.append(line)
    
    return {
        'type': 'section',
        'heading': clean_text(heading, 200),
        'paragraphs': [clean_text(p, 500) for p in paragraphs if p],
        'bullets': bullets if bullets else None
    }

def parse_facts(lines: List[str], start_idx: int, end_idx: int) -> Dict:
    """Parse facts block."""
    heading = lines[start_idx].strip()
    items = []
    
    for line in lines[start_idx+1:end_idx]:
        line = line.strip()
        if not line or line.startswith('📎'):
            continue
        
        match = re.match(r'^([A-Za-z\s]+):\s*(.+)$', line)
        if match:
            items.append({
                'label': match.group(1).strip(),
                'value': match.group(2).strip()
            })
    
    return {
        'type': 'facts',
        'heading': heading,
        'items': items
    }

def parse_comparison(lines: List[str], start_idx: int, end_idx: int) -> Dict:
    """Parse comparison table block."""
    heading = lines[start_idx].strip()
    columns = []
    rows = []
    in_table = False
    
    for line in lines[start_idx+1:end_idx]:
        line = line.strip()
        if not line:
            continue
        
        # Split by 3+ spaces
        parts = re.split(r'\s{3,}', line)
        parts = [p.strip() for p in parts if p.strip()]
        
        if len(parts) >= 3:
            # Check if this is a header row (all parts are short, no numbers)
            if not in_table and all(len(p) < 30 for p in parts):
                columns = parts
                in_table = True
            elif in_table and len(parts) >= 2:
                row_data = {'feature': parts[0] if len(parts) > 0 else ''}
                for j, part in enumerate(parts[1:5]):
                    col_letter = chr(97 + j)
                    row_data[col_letter] = part
                if row_data.get('feature'):
                    rows.append(row_data)
    
    # If we have rows but no columns, create default columns
    if rows and not columns:
        # Try to extract from first row
        columns = ['Feature', 'Option A', 'Option B']
    
    # If no rows but we detected a comparison, try to parse differently
    if not rows and not columns:
        # Check if the heading itself contains the columns
        heading_parts = re.split(r'\s{3,}', heading)
        if len(heading_parts) >= 3:
            columns = heading_parts
            # Look for data in subsequent lines
            for line in lines[start_idx+1:end_idx]:
                parts = re.split(r'\s{3,}', line.strip())
                parts = [p.strip() for p in parts if p.strip()]
                if len(parts) >= 3:
                    row_data = {'feature': parts[0] if len(parts) > 0 else ''}
                    for j, part in enumerate(parts[1:5]):
                        col_letter = chr(97 + j)
                        row_data[col_letter] = part
                    if row_data.get('feature'):
                        rows.append(row_data)
    
    return {
        'type': 'comparison',
        'heading': heading if heading else 'Direct Comparison',
        'columns': columns if columns else ['Feature', 'PC Hotel Bhurban', 'Himalaya Villas & Resorts'],
        'rows': rows
    }

def parse_audience(lines: List[str], start_idx: int, end_idx: int) -> Dict:
    """Parse audience block."""
    heading = lines[start_idx].strip()
    items = []
    current_title = ''
    current_text = ''
    
    for line in lines[start_idx+1:end_idx]:
        line = line.strip()
        if not line or line.startswith('📎'):
            if current_title and current_text:
                items.append({'title': current_title, 'text': current_text})
                current_title = ''
                current_text = ''
            continue
        
        if re.match(r'^[A-Z][a-zA-Z\s]+:', line) or re.match(r'^[A-Z][a-zA-Z\s]+ —', line):
            if current_title and current_text:
                items.append({'title': current_title, 'text': current_text})
            parts = re.split(r':\s*|—\s*', line, 1)
            current_title = parts[0].strip()
            current_text = parts[1].strip() if len(parts) > 1 else ''
        elif current_title:
            current_text += ' ' + line
    
    if current_title and current_text:
        items.append({'title': current_title, 'text': current_text})
    
    return {
        'type': 'audience',
        'heading': heading,
        'items': items
    }

def parse_cta(lines: List[str], start_idx: int, end_idx: int) -> Dict:
    """Parse CTA block - only one per article."""
    heading = lines[start_idx].strip()
    text_parts = []
    
    for line in lines[start_idx+1:end_idx]:
        line = line.strip()
        if not line or line.startswith('📎'):
            continue
        if line.startswith('Q:') or line.startswith('A:'):
            break
        if 'Frequently Asked' in line:
            break
        text_parts.append(line)
    
    text = ' '.join(text_parts)
    
    whatsapp_match = re.search(r'\+92\s*3\d{2}\s*\d{7}', text)
    whatsapp = whatsapp_match.group(0) if whatsapp_match else '+92 304 567 9000'
    
    wame_match = re.search(r'wa\.me/\d+', text)
    wame_link = wame_match.group(0) if wame_match else 'wa.me/923045679000'
    
    return {
        'type': 'cta',
        'eyebrow': 'How to Book',
        'heading': heading,
        'text': clean_text(text, 400) if text else 'Contact us to book your stay.',
        'buttonLabel': f'WhatsApp: {whatsapp}  |  {wame_link}',
        'buttonHref': f'https://{wame_link}',
        'footnote': 'Direct bookings receive priority response and best available rate.'
    }

def parse_faqs(lines: List[str], start_idx: int, end_idx: int) -> Dict:
    """Parse FAQ block."""
    heading = lines[start_idx].strip()
    items = []
    current_q = ''
    current_a = ''
    in_faq = False
    
    for line in lines[start_idx+1:end_idx]:
        line = line.strip()
        if not line:
            if current_q and current_a:
                items.append({'q': current_q, 'a': current_a})
                current_q = ''
                current_a = ''
            continue
        
        # Check if this is a Q or A line
        if line.startswith('Q:') or re.match(r'^\d+\.', line):
            if current_q and current_a:
                items.append({'q': current_q, 'a': current_a})
            current_q = re.sub(r'^Q:|\d+\.\s*', '', line).strip()
            current_a = ''
            in_faq = True
        elif line.startswith('A:'):
            current_a = re.sub(r'^A:\s*', '', line).strip()
            in_faq = True
        elif in_faq and current_q:
            # If we're in a FAQ and no Q: or A: prefix, it's continuation
            if current_a:
                current_a += ' ' + line
            else:
                # If no A yet, this might be the answer starting
                current_a = line
    
    if current_q and current_a:
        items.append({'q': current_q, 'a': current_a})
    
    return {
        'type': 'faqs',
        'heading': heading if heading else 'Frequently Asked Questions',
        'items': items
    }

def parse_related(lines: List[str], start_idx: int, end_idx: int) -> Dict:
    """Parse related links block."""
    heading = lines[start_idx].strip()
    items = []
    
    for line in lines[start_idx+1:end_idx]:
        line = line.strip()
        if not line:
            continue
        
        link_match = re.search(r'→\s*([/\w-]+)', line)
        if not link_match:
            link_match = re.search(r'([/\w-]+)(?=\s*—|\s*$)', line)
        
        if link_match:
            href = link_match.group(1).strip() if link_match.group(1) else link_match.group(0).strip()
            href = re.sub(r'^→\s*', '', href)
            label = line.replace(link_match.group(0), '').replace('→', '').strip()
            if label.startswith('—'):
                label = label[1:].strip()
            if not label or label == href:
                label = href.split('/')[-1].replace('-', ' ').title()
            items.append({'href': href, 'label': label[:100]})
    
    return {
        'type': 'related',
        'heading': heading,
        'items': items
    }

# -----------------------------
# MAIN BLOCK PROCESSING
# -----------------------------

def parse_all_blocks(text: str) -> List[Dict]:
    """Parse all blocks from article text."""
    blocks = []
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    
    i = 0
    cta_count = 0  # Track CTAs to only keep one
    
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
        
        # Skip metadata lines
        if re.match(r'^(ARTICLE|URL|KW|WC|T|C|Template|Cluster|Word Count|Target Keywords|URL Slug)', line, re.IGNORECASE):
            i += 1
            continue
        if line.startswith('---') or line.startswith('===') or line.startswith('~'):
            i += 1
            continue
        
        block_type = detect_block_type(line, lines, i)
        
        # Skip if it's a comparison table row that got detected as section
        if block_type == 'section':
            # Check if next lines look like a comparison table
            parts = re.split(r'\s{3,}', line)
            if len(parts) >= 3:
                block_type = 'comparison'
        
        end_idx = find_block_end(lines, i, block_type)
        
        parser_map = {
            'callout-qa': parse_callout_qa,
            'paragraph': parse_paragraph,
            'section': parse_section,
            'facts': parse_facts,
            'comparison': parse_comparison,
            'audience': parse_audience,
            'cta': parse_cta,
            'faqs': parse_faqs,
            'related': parse_related,
        }
        
        if block_type in parser_map:
            parsed = parser_map[block_type](lines, i, end_idx)
            if parsed:
                # Only keep first CTA
                if block_type == 'cta':
                    cta_count += 1
                    if cta_count > 1:
                        # Skip duplicate CTAs
                        i = end_idx if end_idx > i else i + 1
                        continue
                blocks.append(parsed)
        
        i = end_idx if end_idx > i else i + 1
    
    return blocks

# -----------------------------
# ARTICLE PARSING
# -----------------------------

def parse_article_content(text: str, article_id: str) -> Dict[str, Any]:
    """Parse raw article text into structured article data."""
    article = {
        'id': article_id,
        'slug': '',
        'title': '',
        'metaDescription': '',
        'keywords': '',
        'eyebrow': '',
        'h1': '',
        'heroTagline': '',
        'heroImage': f'/images/articles/article{article_id}-hero.jpg',
        'blocks': []
    }
    
    text = text.replace('\r\n', '\n')
    
    # Extract metadata
    slug_match = re.search(r'URL Slug\s*\n\s*/([\w-]+)', text, re.IGNORECASE)
    if not slug_match:
        slug_match = re.search(r'URL\s*\n\s*/([\w-]+)', text, re.IGNORECASE)
    if slug_match:
        article['slug'] = slug_match.group(1).strip()
    
    kw_match = re.search(r'Target Keywords\s*\n\s*([^\n]+(?:\n\s*[^\n]+)*?)(?=\n\s*(?:Word Count|Template|Cluster|ARTICLE|\Z))', text, re.IGNORECASE | re.DOTALL)
    if not kw_match:
        kw_match = re.search(r'KW\s*\n\s*([^\n]+)', text, re.IGNORECASE)
    if kw_match:
        keywords = kw_match.group(1).strip()
        keywords = re.sub(r'\s+', ' ', keywords)
        article['keywords'] = keywords
    
    template_match = re.search(r'Template\s*\n\s*([^\n]+)', text, re.IGNORECASE)
    cluster_match = re.search(r'Cluster\s*\n\s*([^\n]+)', text, re.IGNORECASE)
    
    eyebrow_parts = []
    if template_match:
        eyebrow_parts.append(template_match.group(1).strip())
    if cluster_match:
        eyebrow_parts.append(cluster_match.group(1).strip())
    if eyebrow_parts:
        article['eyebrow'] = ' | '.join(eyebrow_parts)
    
    # Extract title
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    title_parts = []
    for line in lines:
        if re.match(r'^(ARTICLE|URL|KW|WC|T|C|Template|Cluster|Word Count|Target Keywords|URL Slug)', line, re.IGNORECASE):
            continue
        if '|' in line and ('Cluster' in line or 'Template' in line):
            continue
        title_parts.append(line)
        if len(title_parts) >= 2:
            break
    
    if title_parts:
        title = ' '.join(title_parts).strip()
        title = re.sub(r'\s+[A-Za-z\s]+\|\s*Cluster\s*\d+.*$', '', title)
        title = re.sub(r'\s+~\d+w.*$', '', title)
        title = re.sub(r'\s+/[\w-]+$', '', title)
        article['title'] = title.strip()
    
    if not article['title']:
        article['title'] = f'Article {article_id}'
    article['h1'] = article['title']
    
    # Extract hero tagline
    hero_lines = []
    found_title = False
    for line in lines:
        if '|' in line and ('Cluster' in line or 'Template' in line):
            continue
        if not found_title:
            if line == article['title'] or line.startswith(article['title'][:30]):
                found_title = True
            continue
        if line and not line.startswith('❓') and not line.startswith('📎'):
            if not re.match(r'^[A-Za-z\s]+\|\s*Cluster', line):
                if not line.startswith('Q:') and not line.startswith('A:'):
                    if not re.match(r'^(URL|KW|WC|T|C|Template|Cluster|Word Count|Target Keywords|URL Slug)', line, re.IGNORECASE):
                        if not line.startswith('/') and not line.startswith('~'):
                            hero_lines.append(line)
                            if len(' '.join(hero_lines)) > 100:
                                break
    
    if hero_lines:
        article['heroTagline'] = clean_text(' '.join(hero_lines), 400)
    
    if not article['heroTagline']:
        hero_match = re.search(r'\n\n([^❓📎\n]{100,400}?)\n\n', text)
        if hero_match:
            hero_text = hero_match.group(1).strip()
            if not re.match(r'^[A-Za-z\s]+\|\s*Cluster', hero_text):
                article['heroTagline'] = clean_text(hero_text, 400)
    
    # Meta description
    if article['keywords']:
        article['metaDescription'] = clean_text(article['keywords'], 200)
    elif article['heroTagline']:
        article['metaDescription'] = clean_text(article['heroTagline'], 200)
    
    # Parse blocks
    blocks = parse_all_blocks(text)
    
    if not blocks:
        blocks.append({
            'type': 'section',
            'heading': article['title'][:100],
            'paragraphs': ['Content details coming soon.']
        })
    
    article['blocks'] = blocks
    return article

# -----------------------------
# GENERATE TYPESCRIPT
# -----------------------------

def generate_typescript_file(articles: List[Dict[str, Any]], batch_num: int = 1) -> str:
    """Generate complete TypeScript file with all articles."""
    if not articles:
        return "// No articles found"
    
    start_num = min(int(a['id']) for a in articles)
    end_num = max(int(a['id']) for a in articles)
    
    ts_lines = [
        f"// articles-batch{batch_num}.ts",
        f"// Guest Posts {start_num}-{end_num} - Complete TypeScript file with all content preserved",
        "",
        'import type { Article } from "./types";',
        "",
        "// ============================================",
        "// DUMMY IMAGE PATHS FOR ARTICLES",
        "// ============================================",
        ""
    ]
    
    for article in articles:
        article_id = article['id']
        title_short = article['title'][:50] if article['title'] else f'Article {article_id}'
        ts_lines.extend([
            f"// Article {article_id} - {clean_text(title_short, 50)}",
            f"const article{article_id}Hero = \"/images/articles/article{article_id}-hero.jpg\";",
            f"const article{article_id}Villa = \"/images/articles/article{article_id}-villa.jpg\";",
            f"const article{article_id}View = \"/images/articles/article{article_id}-view.jpg\";",
            ""
        ])
    
    article_constants = []
    article_slugs = {}
    
    for article in articles:
        article_id = article['id']
        slug = article.get('slug', f'article-{article_id}')
        title = article['title']
        meta_desc = article.get('metaDescription', title)
        keywords = article.get('keywords', '')
        eyebrow = article.get('eyebrow', f'Guest Post | Article {article_id}')
        h1 = article.get('h1', title)
        hero_tagline = article.get('heroTagline', title)
        hero_image_var = f'article{article_id}Hero'
        
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
        
        blocks = article.get('blocks', [])
        image_counter = 1
        for block_idx, block in enumerate(blocks):
            block_type = block.get('type', 'section')
            ts_lines.append(f"    {{")
            ts_lines.append(f'      type: "{block_type}",')
            
            if block_type == 'callout-qa':
                ts_lines.append(f'      question: "{clean_text(block.get("question", ""), 250)}",')
                ts_lines.append(f'      answer: "{clean_text(block.get("answer", ""), 700)}",')
            
            elif block_type == 'paragraph':
                ts_lines.append(f'      text: "{clean_text(block.get("text", ""), 500)}",')
            
            elif block_type == 'section':
                if block.get('eyebrow'):
                    ts_lines.append(f'      eyebrow: "{clean_text(block["eyebrow"], 120)}",')
                ts_lines.append(f'      heading: "{clean_text(block.get("heading", ""), 200)}",')
                
                if block.get('paragraphs'):
                    ts_lines.append(f'      paragraphs: [')
                    for p in block['paragraphs']:
                        if p:
                            ts_lines.append(f'        "{clean_text(p, 500)}",')
                    ts_lines.append(f'      ],')
                
                if block.get('bullets'):
                    ts_lines.append(f'      bullets: [')
                    for b in block['bullets']:
                        if 'label' in b and b['label']:
                            ts_lines.append(f'        {{ label: "{clean_text(b["label"], 50)}", text: "{clean_text(b["text"], 300)}" }},')
                        else:
                            ts_lines.append(f'        {{ text: "{clean_text(b["text"], 300)}" }},')
                    ts_lines.append(f'      ],')
                
                # Add image for sections
                ts_lines.append(f'      image: {{')
                if image_counter % 2 == 1:
                    ts_lines.append(f'        src: article{article_id}Villa,')
                else:
                    ts_lines.append(f'        src: article{article_id}View,')
                ts_lines.append(f'        alt: "{clean_text(block.get("heading", ""), 100)}",')
                ts_lines.append(f'      }},')
                image_counter += 1
            
            elif block_type == 'facts':
                ts_lines.append(f'      heading: "{clean_text(block.get("heading", ""), 200)}",')
                if block.get('items'):
                    ts_lines.append(f'      items: [')
                    for item in block['items']:
                        ts_lines.append(f'        {{ label: "{clean_text(item.get("label", ""), 50)}", value: "{clean_text(item.get("value", ""), 200)}" }},')
                    ts_lines.append(f'      ],')
            
            elif block_type == 'comparison':
                ts_lines.append(f'      heading: "{clean_text(block.get("heading", ""), 200)}",')
                if block.get('columns'):
                    ts_lines.append(f'      columns: [')
                    for col in block['columns']:
                        ts_lines.append(f'        "{clean_text(col, 50)}",')
                    ts_lines.append(f'      ],')
                if block.get('rows'):
                    ts_lines.append(f'      rows: [')
                    for row in block['rows']:
                        row_parts = []
                        for key in ['feature', 'a', 'b', 'c', 'd']:
                            if key in row and row[key]:
                                row_parts.append(f'{key}: "{clean_text(row[key], 200)}"')
                        if row_parts:
                            ts_lines.append(f'        {{ {", ".join(row_parts)} }},')
                    ts_lines.append(f'      ],')
            
            elif block_type == 'audience':
                ts_lines.append(f'      heading: "{clean_text(block.get("heading", ""), 200)}",')
                if block.get('items'):
                    ts_lines.append(f'      items: [')
                    for item in block['items']:
                        ts_lines.append(f'        {{ title: "{clean_text(item.get("title", ""), 100)}", text: "{clean_text(item.get("text", ""), 300)}" }},')
                    ts_lines.append(f'      ],')
            
            elif block_type == 'cta':
                if block.get('eyebrow'):
                    ts_lines.append(f'      eyebrow: "{clean_text(block["eyebrow"], 120)}",')
                ts_lines.append(f'      heading: "{clean_text(block.get("heading", ""), 200)}",')
                ts_lines.append(f'      text: "{clean_text(block.get("text", ""), 400)}",')
                ts_lines.append(f'      buttonLabel: "{clean_text(block.get("buttonLabel", ""), 150)}",')
                ts_lines.append(f'      buttonHref: "{clean_text(block.get("buttonHref", ""), 100)}",')
                if block.get('footnote'):
                    ts_lines.append(f'      footnote: "{clean_text(block["footnote"], 200)}",')
            
            elif block_type == 'faqs':
                ts_lines.append(f'      heading: "{clean_text(block.get("heading", ""), 200)}",')
                if block.get('items'):
                    ts_lines.append(f'      items: [')
                    for item in block['items']:
                        ts_lines.append(f'        {{ q: "{clean_text(item.get("q", ""), 200)}", a: "{clean_text(item.get("a", ""), 400)}" }},')
                    ts_lines.append(f'      ],')
            
            elif block_type == 'related':
                ts_lines.append(f'      heading: "{clean_text(block.get("heading", ""), 200)}",')
                if block.get('items'):
                    ts_lines.append(f'      items: [')
                    for item in block['items']:
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
            article_slugs[slug] = f'article{article_id}'
    
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
    seen_slugs = set()
    
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
            
            for article in articles_data:
                slug = article.get("slug", "")
                if slug and slug in seen_slugs:
                    print(f"  ⏭️ Skipping duplicate slug: {slug}")
                    continue
                if slug:
                    seen_slugs.add(slug)
                all_articles.append(article)
            
            print(f"  ✅ Found {len(articles_data)} articles in {docx_path.name}")
            
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
    
    batch_num = 1
    if all_articles and all_articles[0]["id"].isdigit():
        first_id = int(all_articles[0]["id"])
        batch_num = ((first_id - 1) // 10) + 1
    
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
        block_types = [b.get("type", "unknown") for b in article.get("blocks", [])]
        print(f"    Types: {', '.join(block_types[:5])}{'...' if len(block_types) > 5 else ''}")

if __name__ == "__main__":
    main()