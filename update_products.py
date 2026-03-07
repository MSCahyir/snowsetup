import json
import re
import os

input_files = [
    "/Users/sefacahyir/Downloads/simplescraper-www-spx-com-tr-2026-03-07T20-05-07.json",
    "/Users/sefacahyir/Downloads/simplescraper-www-spx-com-tr-2026-03-07T20-07-59.json",
    "/Users/sefacahyir/Downloads/simplescraper-www-spx-com-tr-2026-03-07T20-10-10.json",
    "/Users/sefacahyir/Downloads/simplescraper-www-spx-com-tr-2026-03-07T20-12-20.json",
    "/Users/sefacahyir/Downloads/simplescraper-www-spx-com-tr-2026-03-07T20-13-48.json",
    "/Users/sefacahyir/Downloads/simplescraper-www-spx-com-tr-2026-03-07T20-16-40.json"
]
output_file = "/Users/sefacahyir/Desktop/Per/Proj/snowboard/backend/src/Snowboard.Calculator.Api/Data/products.json"

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def parse_price(price_str):
    if not price_str:
        return 0.0
    s = str(price_str).replace("TL", "").strip()
    s = s.replace(".", "").replace(",", ".")
    try:
        return float(s)
    except:
        return 0.0

new_products = []
global_index = 0

for input_file in input_files:
    if not os.path.exists(input_file):
        continue
        
    with open(input_file, 'r', encoding='utf-8') as f:
        spx_data = json.load(f)

    for item in spx_data:
        if not item.get("product-card--name"): continue
        
        name = item["product-card--name"].replace(" Erkek Snowboard", "").replace(" Kadın Snowboard", "").replace(" Unisex Snowboard", "").replace(" Bağlaması", "").replace(" Unisex Çocuk", "").strip()
        brand = item.get("product-card--brand", "Unknown").title()
        
        pid = slugify(name) + f"-{global_index}"
        
        price = parse_price(item.get("product-sale-price"))
        old_price = parse_price(item.get("product-price"))
        if price == 0 and old_price > 0:
            price = old_price
            
        image_url = item.get("product-card--image", "")
        if not image_url and item.get("img-fluid"):
            image_url = item.get("img-fluid")
            
        is_new = item.get("flag-card", "") == "Yeni"
        
        # Determine category based on name (must match C# enum: Snowboard, Boot, Binding, Helmet, Goggle, Jacket, Pants, Gloves, Accessory)
        category = "Snowboard"
        fallback_name = item["product-card--name"].lower()
        if 'bot' in fallback_name or 'boot' in fallback_name:
            category = "Boot"
        elif 'bağlama' in fallback_name or 'binding' in fallback_name or 'badlamasi' in fallback_name:
            category = "Binding"
        elif 'kask' in fallback_name or 'helmet' in fallback_name:
            category = "Helmet"
        elif 'gözlük' in fallback_name or 'goggles' in fallback_name or 'goggle' in fallback_name:
            category = "Goggle"
        elif 'mont' in fallback_name or 'jacket' in fallback_name or 'ceket' in fallback_name:
            category = "Jacket"
        elif 'pantolon' in fallback_name or 'pants' in fallback_name:
            category = "Pants"
        elif 'eldiven' in fallback_name or 'gloves' in fallback_name:
            category = "Gloves"
        elif 'çanta' in fallback_name or 'bag' in fallback_name:
            category = "Accessory"
            
        product = {
            "id": pid,
            "name": name,
            "brand": brand,
            "category": category, 
            "price": price,
            "originalPrice": old_price if old_price > price else None,
            "currency": "TRY",
            "description": f"{brand} {name} model yüksek performanslı {category.lower()}. Harika tasarım SPX güvencesiyle.",
            "descriptionTr": f"{brand} {name} model yüksek performanslı {category.lower()}. Harika tasarım SPX güvencesiyle.",
            "features": ["Tüm Dağ (All-Mountain)", "Dayanıklı", "Konforlu", "Yüksek Performans"],
            "featuresTr": ["Tüm Dağ (All-Mountain)", "Dayanıklı", "Konforlu", "Yüksek Performans"],
            "imageUrl": image_url,
            "galleryImages": [],
            "affiliateUrl": item.get("product-card--name_link", ""),
            "inStock": True,
            "isFeatured": global_index < 8,
            "isNew": is_new,
            "isBestSeller": global_index % 3 == 0,
            "specs": {
                "size": "L / M / S / 154",
                "color": "Multiple",
                "level": "Intermediate / Advanced"
            }
        }
        
        new_products.append(product)
        global_index += 1

os.makedirs(os.path.dirname(output_file), exist_ok=True)
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(new_products, f, indent=2, ensure_ascii=False)

print(f"Successfully converted {len(new_products)} products and saved to products.json")
