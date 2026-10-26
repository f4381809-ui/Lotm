#!/usr/bin/env python3
"""Build the offline single-file atlas using the same assets as the website."""
from base64 import b64encode
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
html = (root / 'index.html').read_text(encoding='utf-8')
css = (root / 'style.css').read_text(encoding='utf-8')
html = html.replace('<link rel="stylesheet" href="style.css">', f'<style>\n{css}\n</style>')

def embed_image(match):
    path = root / match.group(1)
    mime = {'webp': 'image/webp', 'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg'}[path.suffix[1:]]
    return 'src="data:' + mime + ';base64,' + b64encode(path.read_bytes()).decode('ascii') + '"'

html = re.sub(r'src="([^"\s]+\.(?:webp|png|jpg|jpeg))"', embed_image, html)
for name in ('island-network.js', 'transport-atlas.js', 'travel.js', 'simulation.js', 'app.js'):
    script = (root / name).read_text(encoding='utf-8').replace('</script', '<\\/script')
    html = html.replace(f'<script src="{name}"></script>', f'<script>\n{script}\n</script>')
html = html.replace('class="brand" href="./"', 'class="brand" href="#"')
out = root / 'downloads' / 'LotM-Atlas.html'
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding='utf-8')
print(f'Built {out.relative_to(root)} ({out.stat().st_size:,} bytes)')
