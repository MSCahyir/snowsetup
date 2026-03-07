import urllib.request
import urllib.parse
import os

products = [
    ("burton-custom.jpg", "Burton\nCustom", "222222"),
    ("burton-custom-1.jpg", "Burton\nCustom\nBase", "222222"),
    ("burton-custom-2.jpg", "Burton\nCustom\nSide", "222222"),
    ("capita-doa.jpg", "Capita\nDOA", "222222"),
    ("jones-frontier.jpg", "Jones\nFrontier", "222222"),
    ("lib-tech-banana.jpg", "Lib Tech\nSkate Banana", "222222"),
    ("ride-kink.jpg", "Ride\nKink", "222222"),
    ("burton-ion.jpg", "Burton\nIon\nBoots", "333333"),
    ("vans-infuse.jpg", "Vans\nInfuse", "333333"),
    ("k2-maysis.jpg", "K2\nMaysis", "333333"),
    ("thirtytwo-lashed.jpg", "ThirtyTwo\nLashed", "333333"),
    ("burton-cartel.jpg", "Burton\nCartel\nBindings", "444444"),
    ("union-force.jpg", "Union\nForce\nBindings", "444444"),
    ("flux-xf.jpg", "Flux\nXF\nBindings", "444444"),
    ("ride-c-6.jpg", "Ride\nC-6\nBindings", "444444"),
    ("oakley-flight-deck.jpg", "Oakley\nFlight\nDeck", "555555")
]

os.chdir("/Users/sefacahyir/Desktop/Per/Proj/snowboard/frontend/public/products")

for filename, text, color in products:
    url = f"https://placehold.co/600x600/{color}/FFFFFF/png?text={urllib.parse.quote(text)}"
    try:
        urllib.request.urlretrieve(url, filename)
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Error {filename}: {e}")
