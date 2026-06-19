"""Extract URI link annotations from public/resume.pdf and report them."""

import sys
from pathlib import Path

from pypdf import PdfReader

PDF_PATH = Path(__file__).resolve().parent.parent / "public" / "resume.pdf"

EXPECTED_KEYWORDS = {
    "linkedin": "LinkedIn",
    "github": "GitHub",
    "mailto:": "Email",
    "fiverr": "Fiverr",
    "vercel": "Portfolio URL",
    "syed-portfolio": "Portfolio URL",
}


def main() -> int:
    if not PDF_PATH.exists():
        print(f"ERROR: {PDF_PATH} does not exist.")
        return 1

    reader = PdfReader(str(PDF_PATH))
    print(f"File: {PDF_PATH}")
    print(f"Pages: {len(reader.pages)}\n")

    found_links = []

    for page_num, page in enumerate(reader.pages, start=1):
        annots = page.get("/Annots")
        if not annots:
            print(f"Page {page_num}: no /Annots entry")
            continue

        for annot_ref in annots:
            annot = annot_ref.get_object()
            subtype = annot.get("/Subtype")
            if subtype != "/Link":
                continue

            uri = None
            a_dict = annot.get("/A")
            if a_dict:
                a_obj = a_dict.get_object()
                if a_obj.get("/S") == "/URI":
                    uri = a_obj.get("/URI")

            rect = annot.get("/Rect")
            found_links.append((page_num, uri, rect))

    print(f"Total /Link annotations found: {len(found_links)}\n")

    if not found_links:
        print("FLAG: PDF has ZERO link annotations. Any clickable-looking text "
              "(LinkedIn, GitHub, email, etc.) is styled text only, NOT a real "
              "hyperlink. Recipients cannot click through.")
    else:
        print("Link annotations:")
        for page_num, uri, rect in found_links:
            print(f"  Page {page_num}: {uri!r}  rect={rect}")

    matched_keywords = set()
    for _, uri, _ in found_links:
        if not uri:
            continue
        uri_lower = uri.lower()
        for kw, label in EXPECTED_KEYWORDS.items():
            if kw in uri_lower:
                matched_keywords.add(label)

    print("\nExpected link categories check:")
    all_labels = set(EXPECTED_KEYWORDS.values())
    for label in sorted(all_labels):
        status = "FOUND" if label in matched_keywords else "MISSING"
        print(f"  {label}: {status}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
