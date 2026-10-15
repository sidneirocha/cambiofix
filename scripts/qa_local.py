from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "qa-captures"
OUT.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1543, "height": 954}, device_scale_factor=1)
    page.goto("http://localhost:4173/", wait_until="networkidle")
    page.screenshot(path=str(OUT / "desktop-full.png"), full_page=True)
    desktop = {
        "title": page.title(),
        "images": page.locator("img").count(),
        "broken_images": page.locator("img").evaluate_all("els => els.filter(e => !e.complete || e.naturalWidth === 0).map(e => e.src)"),
        "sections": page.locator("main section").count(),
        "scroll_width": page.evaluate("document.documentElement.scrollWidth"),
        "viewport_width": page.evaluate("window.innerWidth"),
    }
    page.set_viewport_size({"width": 390, "height": 844})
    page.goto("http://localhost:4173/", wait_until="networkidle")
    page.screenshot(path=str(OUT / "mobile-full.png"), full_page=True)
    mobile = {
        "images": page.locator("img").count(),
        "broken_images": page.locator("img").evaluate_all("els => els.filter(e => !e.complete || e.naturalWidth === 0).map(e => e.src)"),
        "scroll_width": page.evaluate("document.documentElement.scrollWidth"),
        "viewport_width": page.evaluate("window.innerWidth"),
    }
    print({"desktop": desktop, "mobile": mobile})
    browser.close()
