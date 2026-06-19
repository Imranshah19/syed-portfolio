"""
Regenerate public/resume.pdf from structured content using reportlab.

Recreates the existing resume (same content, ATS-friendly single-column
layout) but adds REAL clickable /Link annotations on contact links via
canvas.linkURL(), which the previous PDF did not have.
"""

from __future__ import annotations

from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

PUBLIC_DIR = Path(__file__).resolve().parent.parent / "public"
OUTPUT_PATH = PUBLIC_DIR / "resume.pdf"
PHOTO_PATH = Path(__file__).resolve().parent / "assets" / "resume_photo.jpg"

PAGE_W, PAGE_H = letter
MARGIN_X = 0.65 * 72
MARGIN_TOP = 0.55 * 72
MARGIN_BOTTOM = 0.35 * 72
CONTENT_W = PAGE_W - 2 * MARGIN_X

NAVY = HexColor("#1E3A5F")
NAVY_DARK = HexColor("#13283D")
SLATE = HexColor("#334155")
MUTED = HexColor("#64748B")
ACCENT = HexColor("#2563EB")
SECTION_BLUE = HexColor("#2B6DA3")
GOLD = HexColor("#C8A149")
WHITE = HexColor("#FFFFFF")
BLACK = HexColor("#111111")

HEADER_BAND_H = 128

FONT_BODY = "Helvetica"
FONT_BODY_BOLD = "Helvetica-Bold"
FONT_BODY_OBLIQUE = "Helvetica-Oblique"


class ResumeDoc:
    def __init__(self, path: Path):
        self.c = canvas.Canvas(str(path), pagesize=letter)
        self.y = PAGE_H - MARGIN_TOP
        self.page_num = 1

    # -- low level helpers -------------------------------------------------
    def wrap(self, text: str, font: str, size: float, max_width: float) -> list[str]:
        words = text.split()
        lines: list[str] = []
        current = ""
        for word in words:
            trial = f"{current} {word}".strip()
            if self.c.stringWidth(trial, font, size) <= max_width:
                current = trial
            else:
                if current:
                    lines.append(current)
                current = word
        if current:
            lines.append(current)
        return lines or [""]

    def ensure_space(self, needed: float):
        if self.y - needed < MARGIN_BOTTOM:
            self.c.showPage()
            self.page_num += 1
            self.y = PAGE_H - MARGIN_TOP

    def new_page_if_needed_for_line(self, leading: float):
        self.ensure_space(leading)

    # -- content primitives -------------------------------------------------
    def section_header(self, title: str):
        bar_h = 14
        self.ensure_space(bar_h + 10)
        self.y -= 3
        bar_top = self.y
        bar_bottom = bar_top - bar_h
        self.c.setFillColor(SECTION_BLUE)
        self.c.rect(0, bar_bottom, PAGE_W, bar_h, stroke=0, fill=1)
        self.c.setFont(FONT_BODY_BOLD, 10)
        self.c.setFillColor(WHITE)
        text_baseline = bar_bottom + (bar_h - 10) / 2 + 1.3
        self.c.drawString(MARGIN_X, text_baseline, title.upper())
        self.c.setFillColor(BLACK)
        self.y = bar_bottom - 7

    def callout_box(self, title_line: str, sub_line: str):
        pad = 6
        leading1 = 11
        leading2 = 12
        box_h = pad * 2 + leading1 + leading2
        self.ensure_space(box_h + 6)
        self.y -= 3
        box_top = self.y
        box_bottom = box_top - box_h
        self.c.setStrokeColor(GOLD)
        self.c.setLineWidth(1.3)
        self.c.setFillColor(WHITE)
        self.c.rect(MARGIN_X, box_bottom, CONTENT_W, box_h, stroke=1, fill=1)
        self.c.setFont(FONT_BODY_BOLD, 9.4)
        self.c.setFillColor(NAVY_DARK)
        ty = box_top - pad - 7.5
        self.c.drawCentredString(PAGE_W / 2, ty, title_line)
        ty -= leading2
        self.c.setFont(FONT_BODY_BOLD, 9.2)
        self.c.setFillColor(NAVY_DARK)
        self.c.drawCentredString(PAGE_W / 2, ty, sub_line)
        self.c.setFillColor(BLACK)
        self.y = box_bottom - 6

    def draw_triangle_marker(self, x: float, y: float, color, size: float = 4.2):
        self.c.setFillColor(color)
        ty = y + 3.4
        p = self.c.beginPath()
        p.moveTo(x, ty - size / 2)
        p.lineTo(x, ty + size / 2)
        p.lineTo(x + size * 0.9, ty)
        p.close()
        self.c.drawPath(p, stroke=0, fill=1)

    def paragraph(self, text: str, font=FONT_BODY, size=9.6, leading=12.0, color=SLATE):
        lines = self.wrap(text, font, size, CONTENT_W)
        self.c.setFont(font, size)
        self.c.setFillColor(color)
        for line in lines:
            self.ensure_space(leading)
            self.c.drawString(MARGIN_X, self.y, line)
            self.y -= leading
        self.c.setFillColor(BLACK)

    def bullet(self, text: str, font=FONT_BODY, size=9.4, leading=12.0, indent=14):
        bullet_x = MARGIN_X + indent
        max_width = CONTENT_W - indent
        lines = self.wrap(text, font, size, max_width)
        self.c.setFont(font, size)
        self.c.setFillColor(SLATE)
        for i, line in enumerate(lines):
            self.ensure_space(leading)
            if i == 0:
                self.draw_triangle_marker(MARGIN_X, self.y, SECTION_BLUE)
                self.c.setFillColor(SLATE)
            self.c.drawString(bullet_x, self.y, line)
            self.y -= leading
        self.c.setFillColor(BLACK)

    def job_entry(self, title: str, org: str, period: str, bullets: list[str]):
        self.ensure_space(15)
        self.c.setFont(FONT_BODY_BOLD, 10.2)
        self.c.setFillColor(BLACK)
        self.c.drawString(MARGIN_X, self.y, title)
        self.c.setFont(FONT_BODY, 9.4)
        self.c.setFillColor(MUTED)
        self.c.drawRightString(PAGE_W - MARGIN_X, self.y, period)
        self.y -= 12.5
        self.c.setFont(FONT_BODY_OBLIQUE, 9.6)
        self.c.setFillColor(ACCENT)
        self.c.drawString(MARGIN_X, self.y, org)
        self.c.setFillColor(BLACK)
        self.y -= 12.5
        for b in bullets:
            self.bullet(b)
        self.y -= 2

    def project_entry(self, title: str, badge: str | None, desc: str, tech: str):
        self.ensure_space(15)
        self.c.setFont(FONT_BODY_BOLD, 10)
        self.c.setFillColor(BLACK)
        self.c.drawString(MARGIN_X, self.y, title)
        if badge:
            self.c.setFont(FONT_BODY_BOLD, 8.6)
            self.c.setFillColor(HexColor("#15803D"))
            self.c.drawRightString(PAGE_W - MARGIN_X, self.y, badge)
            self.c.setFillColor(BLACK)
        self.y -= 12.5
        self.paragraph(desc, size=9.2, leading=11.8)
        self.c.setFont(FONT_BODY_OBLIQUE, 8.8)
        self.c.setFillColor(MUTED)
        self.ensure_space(12)
        self.c.drawString(MARGIN_X, self.y, tech)
        self.c.setFillColor(BLACK)
        self.y -= 14

    def tag_line(self, tags: list[str], font=FONT_BODY, size=9, leading=12.5):
        text = "   |   ".join(tags)
        self.paragraph(text, font=font, size=size, leading=leading, color=SLATE)

    def education_entry(self, degree: str, school: str, period: str, detail: str):
        self.ensure_space(14)
        self.c.setFont(FONT_BODY_BOLD, 9.8)
        self.c.setFillColor(BLACK)
        self.c.drawString(MARGIN_X, self.y, degree)
        self.c.setFont(FONT_BODY, 9.2)
        self.c.setFillColor(MUTED)
        self.c.drawRightString(PAGE_W - MARGIN_X, self.y, period)
        self.y -= 12
        self.c.setFont(FONT_BODY_OBLIQUE, 9.2)
        self.c.setFillColor(ACCENT)
        self.c.drawString(MARGIN_X, self.y, school)
        self.c.setFillColor(BLACK)
        self.y -= 11.5
        self.paragraph(detail, size=8.9, leading=11.5, color=MUTED)
        self.y -= 2

    # -- header with link annotations ---------------------------------------
    def draw_link_segment(self, x: float, y: float, label: str, value: str,
                           url: str, font=FONT_BODY, size=9,
                           label_color=MUTED, value_color=ACCENT) -> float:
        """Draws 'Label: value' at (x, y), adds a real /Link annotation over
        `value`, returns the x position right after this segment."""
        self.c.setFont(font, size)
        self.c.setFillColor(label_color)
        self.c.drawString(x, y, f"{label}: ")
        label_w = self.c.stringWidth(f"{label}: ", font, size)

        value_x = x + label_w
        self.c.setFillColor(value_color)
        self.c.drawString(value_x, y, value)
        value_w = self.c.stringWidth(value, font, size)

        self.c.linkURL(
            url,
            (value_x, y - 1.5, value_x + value_w, y + size + 1),
            relative=0,
            thickness=0,
        )
        return value_x + value_w

    def draw_photo(self):
        if not PHOTO_PATH.exists():
            return
        img = ImageReader(str(PHOTO_PATH))
        iw, ih = img.getSize()
        photo_w = 0.95 * 72
        photo_h = photo_w * ih / iw
        x = PAGE_W - MARGIN_X - photo_w
        top_y = PAGE_H - 14
        bottom_y = top_y - photo_h
        self.c.drawImage(
            img, x, bottom_y, width=photo_w, height=photo_h,
            preserveAspectRatio=True, mask="auto",
        )
        self.c.setStrokeColor(GOLD)
        self.c.setLineWidth(1.2)
        self.c.rect(x, bottom_y, photo_w, photo_h, stroke=1, fill=0)

    def header(self):
        band_bottom = PAGE_H - HEADER_BAND_H
        self.c.setFillColor(NAVY_DARK)
        self.c.rect(0, band_bottom, PAGE_W, HEADER_BAND_H, stroke=0, fill=1)

        self.draw_photo()

        self.y = PAGE_H - 30
        self.c.setFont(FONT_BODY_BOLD, 21)
        self.c.setFillColor(WHITE)
        self.c.drawString(MARGIN_X, self.y, "SYED IMRAN SHAH")

        underline_y = self.y - 6
        self.c.setStrokeColor(GOLD)
        self.c.setLineWidth(2)
        self.c.line(MARGIN_X, underline_y, MARGIN_X + 80, underline_y)

        self.y -= 21
        self.c.setFont(FONT_BODY_BOLD, 11.5)
        self.c.setFillColor(GOLD)
        self.c.drawString(MARGIN_X, self.y, "AI-Powered HR Professional")
        self.y -= 14

        self.c.setFont(FONT_BODY, 9.4)
        self.c.setFillColor(GOLD)
        self.c.drawString(MARGIN_X, self.y,
                           "Human Resource Management  -  HR Technology  -  People Analytics")
        self.y -= 12
        self.c.drawString(MARGIN_X, self.y,
                           "MHRM  -  10+ Years Experience  -  Gulf Experience  -  Open to relocation: UAE & Germany")
        self.y -= 14

        gap = 18
        x = MARGIN_X
        x = self.draw_link_segment(x, self.y, "Phone", "+92-333-2455770",
                                    "tel:+923332455770", label_color=GOLD, value_color=GOLD)
        x += gap
        x = self.draw_link_segment(x, self.y, "Email", "syed.is1990@gmail.com",
                                    "mailto:syed.is1990@gmail.com", label_color=GOLD, value_color=GOLD)
        x += gap
        x = self.draw_link_segment(x, self.y, "LinkedIn", "in/syed-imran-shah-5894882ba",
                                    "https://linkedin.com/in/syed-imran-shah-5894882ba",
                                    label_color=GOLD, value_color=GOLD)
        self.y -= 13.5

        x = MARGIN_X
        x = self.draw_link_segment(x, self.y, "Portfolio", "syed-portfolio-mu.vercel.app",
                                    "https://syed-portfolio-mu.vercel.app", label_color=GOLD, value_color=GOLD)
        x += gap
        x = self.draw_link_segment(x, self.y, "GitHub", "github.com/Imranshah19",
                                    "https://github.com/Imranshah19", label_color=GOLD, value_color=GOLD)
        x += gap
        x = self.draw_link_segment(x, self.y, "Fiverr", "fiverr.com/syedio",
                                    "https://www.fiverr.com/syedio", label_color=GOLD, value_color=GOLD)
        self.y -= 13.5

        self.c.setFont(FONT_BODY, 9)
        self.c.setFillColor(GOLD)
        self.c.drawString(MARGIN_X, self.y, "Location: North Karachi, Pakistan")
        self.c.setFillColor(BLACK)
        self.y = band_bottom - 16


def build() -> Path:
    doc = ResumeDoc(OUTPUT_PATH)
    doc.header()

    doc.section_header("Professional Profile")
    doc.paragraph(
        "Results-driven Human Resource Management professional with a Master of Human Resources "
        "Management (MHRM) and 10+ years of progressive experience across HR operations, talent "
        "management, compliance, document control, and organizational development -- including "
        "2 years of Gulf experience in Saudi Arabia. What sets me apart is the rare combination of "
        "solid HR foundations with hands-on AI development: I have personally designed, built, and "
        "shipped production-grade HR management systems and AI agent suites (NEXA HR, NEXA HR Agents, "
        "UAE labour-law automation). I bridge traditional HR expertise with real-world AI "
        "implementation, making me uniquely equipped to help forward-thinking organizations modernize "
        "their people operations."
    )
    doc.y -= 2
    doc.callout_box(
        "MY UNIQUE VALUE TO YOUR ORGANIZATION",
        "HR Expertise + Gulf Experience + Real AI Development = Future-Ready HR Professional",
    )

    doc.section_header("Key Achievements")
    for item in [
        "Managed complete HR operations -- recruitment, onboarding, payroll, attendance, and "
        "compliance -- for a workforce of 40+ employees at Valitex (Pvt) Ltd.",
        "Gained Gulf experience at Al-Aren Construction Company, Saudi Arabia, managing office "
        "administration and document control operations.",
        "Designed and shipped NEXA HR, a production-grade HRMS (payroll, attendance, recruitment, "
        "performance) with 116 automated tests passing.",
        "Built NEXA HR Agents, a suite of 10 AI HR agents (35/35 evaluations passing) automating "
        "leave, payroll, onboarding, and analytics workflows.",
        "Developed UAE labour-law automation (WPS, gratuity, MOHRE) with 39/39 compliance tests passing.",
        "Implemented KPI-based performance management with real-time data dashboards for management visibility.",
        "Maintained full regulatory compliance across all HR operations with zero compliance violations.",
    ]:
        doc.bullet(item)

    doc.section_header("Professional Experience")
    doc.job_entry(
        "Founder & HR / Operations Lead",
        "AlSyed Autoparts -- Karachi, Pakistan",
        "2018 - Present",
        [
            "Run a real auto-parts business end-to-end while building its technology stack -- "
            "recruitment, contracts, onboarding, payroll, and exit management.",
            "Designed and deployed an AI-powered HR & shop-management platform automating attendance, "
            "payroll reporting, and employee records.",
            "Use AI analytics to monitor workforce trends, predict attrition risk, and advise on "
            "proactive retention strategies.",
            "Resolve workplace disputes through structured counseling, mediation, and conflict resolution.",
        ],
    )
    doc.job_entry(
        "Office Administrator & Document Controller",
        "Al-Aren Construction Company -- Jeddah, Saudi Arabia",
        "2016 - 2018",
        [
            "Managed complete office administration and document control operations for a "
            "construction company.",
            "Maintained organized filing systems for contracts, HR documents, compliance records, "
            "and project documentation.",
            "Coordinated between departments and handled correspondence, reporting, and "
            "administrative support to senior management.",
            "Gained valuable Gulf work experience and understanding of multicultural workplace "
            "environments.",
        ],
    )
    doc.job_entry(
        "HR & Operations Manager",
        "AlSyed Autoparts -- Karachi, Pakistan",
        "2015 - 2016",
        [
            "Managed full HR operations including staff recruitment, onboarding, attendance, and "
            "payroll administration.",
            "Developed and enforced HR policies, workplace conduct standards, and compliance "
            "documentation.",
            "Handled employee grievances and resolved workplace conflicts through structured "
            "mediation.",
        ],
    )
    doc.job_entry(
        "HR & Admin Officer",
        "Valitex (Pvt) Limited -- Karachi, Pakistan",
        "2013 - 2015",
        [
            "Managed HR and administrative operations for 40+ employees in a textile manufacturing "
            "and export company.",
            "Handled the complete recruitment cycle -- job posting, screening, interviewing, and "
            "onboarding.",
            "Administered monthly payroll and ensured compliance with applicable labor laws and "
            "HR policies.",
        ],
    )

    doc.section_header("Selected HR-Tech Projects")
    doc.project_entry(
        "NEXA HR -- Production HRMS",
        "116 tests passing",
        "Full-stack enterprise HRMS: payroll, attendance, recruitment, performance, assets, and "
        "global search, with AI integration.",
        "FastAPI - Next.js 14 - PostgreSQL - Redis - Docker",
    )
    doc.project_entry(
        "NEXA HR Agents -- AI Agent Suite",
        "35/35 evals passing",
        "10 AI HR agents (leave, payroll, recruitment, onboarding, offboarding, analytics, and more) "
        "built on an Agent Factory pattern.",
        "Python - LLM Agents SDK - Skills architecture",
    )
    doc.project_entry(
        "AI-HRM-UAE -- Labour Law Automation",
        "39/39 WPS tests",
        "UAE compliance automation: WPS/SIF generation, gratuity (Federal Decree-Law 33/2021), and "
        "MOHRE rules.",
        "LangGraph - Python",
    )
    doc.project_entry(
        "Smart School Management System (SSMS) -- Multi-Tenant SaaS",
        None,
        "Complete multi-tenant SaaS with admin dashboard, AI assistant, and billing integration.",
        "FastAPI - React - TypeScript - PostgreSQL - Docker",
    )

    doc.section_header("Core HR Competencies")
    doc.tag_line([
        "Talent Acquisition", "Onboarding & Induction", "Employee Relations",
        "Labor Law Compliance", "Performance Management", "Compensation & Benefits",
        "Training & Development", "Workforce Planning", "HR Policy & Compliance",
        "Payroll Administration", "Conflict Resolution", "Document Control",
    ])

    doc.section_header("AI & HR Technology Skills")
    doc.paragraph(
        "Rare combination: deep HR domain expertise + real hands-on AI implementation experience.",
        size=9.2, leading=12,
    )
    doc.tag_line([
        "AI-Powered HRIS", "HR Data Analytics", "Automated Reporting", "AI Recruitment Tools",
        "Workforce Forecasting", "Attrition Prediction", "Process Automation",
        "AI Performance Tracking", "Python / FastAPI", "Next.js", "PostgreSQL", "Docker",
        "LLM / AI Agents",
    ])

    doc.section_header("Education")
    doc.education_entry(
        "Master of Human Resources Management (MHRM)",
        "University of Karachi",
        "2011 - 2013",
        "Faculty of Management & Administrative Sciences (Dept. of Public Administration). "
        "HR Strategy, Organizational Behavior, Labor Law, Compensation Management, Leadership & "
        "Governance.",
    )
    doc.education_entry(
        "Bachelor of Commerce (B.Com)",
        "University of Karachi",
        "2007 - 2009",
        "Business Administration, Accounting, Economics, Organizational Management.",
    )
    doc.education_entry(
        "Higher Secondary Certificate (HSC) -- Pre-Medical",
        "Board of Intermediate Education, Karachi",
        "2004",
        "Science Group (Physics, Chemistry, Biology).",
    )
    doc.education_entry(
        "Secondary School Certificate (SSC) -- Science",
        "Board of Secondary Education, Karachi",
        "2001",
        "Science Group (Mathematics, Physics, Chemistry, Biology).",
    )

    doc.section_header("Professional Development & Certifications")
    doc.bullet(
        "AI & Computing -- GIAIC Institute (2024 - Present): AI tools, automation, HR tech, data "
        "analytics, and AI-powered systems development."
    )
    doc.bullet(
        "AI-Powered HR Systems -- hands-on development of live, production HR management systems "
        "using modern AI platforms and cloud deployment."
    )

    doc.section_header("Languages")
    doc.paragraph("English -- Professional   |   Urdu -- Native   |   Arabic -- Basic", size=9.4)

    doc.section_header("References")
    doc.paragraph("Available upon request.", size=9.4)

    doc.section_header("Personal Details")
    doc.paragraph("Date of Birth: 16 December 1985        Nationality: Pakistani", size=9.2, leading=11.5)
    doc.paragraph("Marital Status: Married        Passport: Available", size=9.2, leading=11.5)
    doc.paragraph("Availability: Immediate        CNIC: Available on request", size=9.2, leading=11.5)

    doc.c.save()
    return OUTPUT_PATH


if __name__ == "__main__":
    backup = OUTPUT_PATH.with_suffix(".pdf.bak")
    if OUTPUT_PATH.exists() and not backup.exists():
        backup.write_bytes(OUTPUT_PATH.read_bytes())
        print(f"Backed up existing resume to {backup}")

    out = build()
    print(f"Generated {out} ({out.stat().st_size} bytes)")
