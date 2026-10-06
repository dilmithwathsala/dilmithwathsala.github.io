from pathlib import Path
from PIL import Image, ImageOps

base = Path('assets')

for name, max_size in {
    '1.jpeg': 900,
    'ddd.jpeg': 900,
    'web.jpg': 700,
    'iot.jpg': 700,
    'ui.jpg': 700,
}.items():
    src = base / name
    if not src.exists():
        continue

    with Image.open(src) as img:
        img = ImageOps.exif_transpose(img)
        img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
        out = base / f'{src.stem}-mobile{src.suffix}'
        if src.suffix.lower() in {'.jpg', '.jpeg'}:
            img.convert('RGB').save(out, quality=72, optimize=True)
        else:
            img.save(out, quality=72, optimize=True)
        print(f'Created {out}')
