import os
import xml.etree.ElementTree as ET
import pandas as pd
import requests
from bs4 import BeautifulSoup

# ====================================================
# CONFIG
# ====================================================

LOCAL_BASE = "http://localhost:3000"
SITEMAP_INDEX = f"{LOCAL_BASE}/sitemap_index.xml"
PRODUCTION_DOMAIN = "https://himalayavillas.com"

HEADERS = {"User-Agent": "SEO Extractor 1.0"}
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

OUTPUT_EXCEL = os.path.join(SCRIPT_DIR, "seo-report.xlsx")
OUTPUT_CSV = os.path.join(SCRIPT_DIR, "seo-report.csv")

NAMESPACE = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}


# ====================================================
# HELPERS
# ====================================================

def localize(url: str) -> str:
    return url.replace(PRODUCTION_DOMAIN, LOCAL_BASE)


def get_xml(url):
    response = requests.get(url, headers=HEADERS, timeout=30)
    response.raise_for_status()
    return ET.fromstring(response.content)


def is_sitemap_index(root) -> bool:
    """Check if XML is a sitemap index (has <sitemap> elements)"""
    return root.find("sm:sitemap", NAMESPACE) is not None


def extract_urls_from_sitemap(url, collected_urls=None):
    """Recursively extract all URLs from sitemap (handles nested indexes)"""
    if collected_urls is None:
        collected_urls = []
    
    print(f"Reading: {url}")
    
    try:
        root = get_xml(url)
        
        # If it's a sitemap index, recurse into child sitemaps
        if is_sitemap_index(root):
            print(f"   → This is a sitemap index, recursing...")
            for sitemap in root.findall("sm:sitemap", NAMESPACE):
                loc = sitemap.find("sm:loc", NAMESPACE)
                if loc is not None:
                    child_url = localize(loc.text.strip())
                    extract_urls_from_sitemap(child_url, collected_urls)
        else:
            # It's a regular sitemap with URLs
            urls = root.findall("sm:url", NAMESPACE)
            print(f"   Found {len(urls)} URLs")
            
            for u in urls:
                loc = u.find("sm:loc", NAMESPACE)
                if loc is not None:
                    collected_urls.append(localize(loc.text.strip()))
                    
    except Exception as e:
        print(f"   ERROR: {e}")
    
    return collected_urls


# ====================================================
# MAIN
# ====================================================

print("\n🔍 Starting sitemap crawl...\n")

# Start with the main sitemap index
all_urls = extract_urls_from_sitemap(SITEMAP_INDEX)

# Deduplicate
all_urls = sorted(list(set(all_urls)))

print("\n===================================")
print(f"✅ TOTAL UNIQUE URLS: {len(all_urls)}")
print("===================================\n")

# ====================================================
# CRAWL EACH PAGE
# ====================================================

rows = []

for index, url in enumerate(all_urls, start=1):
    print(f"[{index}/{len(all_urls)}] {url}")
    
    try:
        r = requests.get(url, headers=HEADERS, timeout=30)
        soup = BeautifulSoup(r.text, "lxml")
        
        title = soup.title.get_text(strip=True) if soup.title else ""
        
        meta = soup.find("meta", attrs={"name": "description"})
        description = meta.get("content", "").strip() if meta else ""
        
        h1_tag = soup.find("h1")
        h1 = h1_tag.get_text(" ", strip=True) if h1_tag else ""
        
        h1_description = ""
        if h1_tag:
            current = h1_tag
            while True:
                current = current.find_next()
                if current is None or current.name == "h1":
                    break
                if current.name == "p":
                    h1_description = current.get_text(" ", strip=True)
                    break
        
        rows.append({
            "URL": url.replace(LOCAL_BASE, PRODUCTION_DOMAIN),
            "H1": h1,
            "H1 Description": h1_description,
            "Meta Title": title,
            "Meta Description": description
        })
        
    except Exception as e:
        print(f"   ERROR: {e}")
        rows.append({
            "URL": url.replace(LOCAL_BASE, PRODUCTION_DOMAIN),
            "H1": "",
            "H1 Description": "",
            "Meta Title": "",
            "Meta Description": ""
        })

# ====================================================
# EXPORT
# ====================================================

df = pd.DataFrame(rows)
df.to_excel(OUTPUT_EXCEL, index=False)
df.to_csv(OUTPUT_CSV, index=False)

print("\n===================================")
print("✅ DONE")
print(f"Pages crawled: {len(df)}")
print(f"Excel: {OUTPUT_EXCEL}")
print(f"CSV: {OUTPUT_CSV}")
print("===================================")