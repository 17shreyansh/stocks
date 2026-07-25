from PIL import Image
import collections

img = Image.open('d:/Office/Stock Broker/live/stocks/fe/public/logo/app-logo.png')
img = img.convert('RGBA')
colors = img.getcolors(img.size[0] * img.size[1])
valid_colors = []
for count, color in colors:
    # exclude mostly transparent
    if color[3] < 200: continue
    # exclude white/near white
    if color[0] > 240 and color[1] > 240 and color[2] > 240: continue
    # exclude black/near black
    if color[0] < 20 and color[1] < 20 and color[2] < 20: continue
    # exclude gray
    if abs(color[0]-color[1]) < 10 and abs(color[1]-color[2]) < 10: continue
    valid_colors.append((count, color))

valid_colors.sort(reverse=True)
for count, color in valid_colors[:20]:
    hex_color = '#{:02x}{:02x}{:02x}'.format(color[0], color[1], color[2])
    print(f'Count: {count}, Color: {hex_color} {color}')
