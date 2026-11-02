"""Generate recipe-roulette's icon set and link-preview image.

Concept: a roulette wheel drawn as a dinner plate (cream rim, eight wedges in the
app's own palette) with a pointer at the top -- "spin to pick what's for dinner".
Charcoal ground matches the app header.

Run from the repo root:  python3 icon-design/make_icons.py
Needs only Pillow. Every image is drawn at 8x (icons) / 4x (preview) and
downsampled with LANCZOS so diagonal and curved edges stay crisp.

Outputs
  public/icons/icon-192.png          manifest, purpose "any"
  public/icons/icon-512.png          manifest, purpose "any"
  public/icons/icon-512-maskable.png manifest, purpose "maskable" (content kept inside the safe zone)
  public/icons/apple-touch-icon.png  180x180, iOS home screen
  public/icons/favicon-32.png        browser tab
  public/og-image.png                1200x630 link preview (WhatsApp, etc.)
"""
import math
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
ICONS = ROOT / "public" / "icons"

# Tokens from src/styles/index.css
CHARCOAL = (42, 36, 32)
CREAM = (245, 240, 232)
MUSTARD = (200, 144, 42)
TERRACOTTA = (192, 82, 42)
DEEP_RED = (122, 32, 32)
WEDGES = [MUSTARD, TERRACOTTA, CREAM, DEEP_RED]  # repeated twice -> 8 wedges


def _box(cx, cy, r):
    return (cx - r, cy - r, cx + r, cy + r)


def draw_wheel(d, cx, cy, R, wedge_count=8, pointer=True):
    """Draw the wheel centred on (cx, cy) with outer radius R."""
    step = 360 / wedge_count
    wedge_r = 0.83 * R

    d.ellipse(_box(cx, cy, R), fill=CREAM)                 # plate rim
    d.ellipse(_box(cx, cy, 0.89 * R), fill=CHARCOAL)       # gap between rim and wedges

    for i in range(wedge_count):                           # wedge 0 sits under the pointer
        a0 = -90 - step / 2 + i * step
        d.pieslice(_box(cx, cy, wedge_r), a0, a0 + step, fill=WEDGES[i % len(WEDGES)])

    seam = max(2, int(0.035 * R))                          # charcoal seams between wedges
    for i in range(wedge_count):
        a = math.radians(-90 - step / 2 + i * step)
        d.line([(cx, cy), (cx + wedge_r * math.cos(a), cy + wedge_r * math.sin(a))],
               fill=CHARCOAL, width=seam)

    d.ellipse(_box(cx, cy, 0.20 * R), fill=CREAM)          # hub
    d.ellipse(_box(cx, cy, 0.135 * R), fill=CHARCOAL)

    if pointer:
        tri = [(cx - 0.15 * R, cy - 1.16 * R), (cx + 0.15 * R, cy - 1.16 * R), (cx, cy - 0.64 * R)]
        d.polygon(tri, fill=CREAM)
        d.line(tri + [tri[0]], fill=CHARCOAL, width=max(2, int(0.05 * R)), joint="curve")


def icon_master(size, wheel_ratio):
    """Square icon on a full-bleed charcoal ground.

    The wheel plus pointer is taller above centre than below, so the whole group is
    nudged down by 0.08R: extent is then +-1.08R around the canvas centre.
    """
    img = Image.new("RGB", (size, size), CHARCOAL)
    d = ImageDraw.Draw(img)
    R = wheel_ratio * size
    draw_wheel(d, size / 2, size / 2 + 0.08 * R, R)
    return img


def og_master(w, h):
    """Chalkboard-ruled ground like the app header, wheel centred."""
    img = Image.new("RGB", (w, h), CHARCOAL)
    d = ImageDraw.Draw(img)
    line = tuple(round(c + (255 - c) * 0.04) for c in CHARCOAL)
    for y in range(0, h, round(h / 22)):
        d.line([(0, y), (w, y)], fill=line, width=max(1, h // 400))
    R = 0.36 * h
    draw_wheel(d, w / 2, h / 2 + 0.08 * R, R)
    return img


def save(img, path, size):
    ICONS.mkdir(parents=True, exist_ok=True)
    img.resize((size, size), Image.LANCZOS).save(path, optimize=True)


def main():
    hi = 4096  # 8x the 512 target
    regular = icon_master(hi, 0.40)
    # Maskable: Android may crop to a circle of radius 40% of the canvas, so the whole
    # group (<= 1.09R from centre) must stay inside that -> 0.34 * 1.09 = 0.37.
    maskable = icon_master(hi, 0.34)

    save(regular, ICONS / "icon-512.png", 512)
    save(regular, ICONS / "icon-192.png", 192)
    save(regular, ICONS / "apple-touch-icon.png", 180)
    save(regular, ICONS / "favicon-32.png", 32)
    save(maskable, ICONS / "icon-512-maskable.png", 512)

    og = og_master(4800, 2520)  # 4x
    og.resize((1200, 630), Image.LANCZOS).save(ROOT / "public" / "og-image.png", optimize=True)
    print("done")


if __name__ == "__main__":
    main()
