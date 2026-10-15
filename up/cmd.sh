B=https://ghostshopi.lovable.app
for u in "/__l5e/assets-v1/c5f8f2c5-362e-4064-816a-3aec2334c8dd/GHOST-0001.webp?w=300&format=webp" "/__l5e/assets-v1/c5f8f2c5-362e-4064-816a-3aec2334c8dd/GHOST-0001.webp?w=300&fm=webp" "/__l5e/assets-v1/c5f8f2c5-362e-4064-816a-3aec2334c8dd/GHOST-0001.webp?w=300&f=webp" "/__l5e/assets-v1/c5f8f2c5-362e-4064-816a-3aec2334c8dd/GHOST-0001.webp?w=300&q=70" "/__l5e/assets-v1/c5f8f2c5-362e-4064-816a-3aec2334c8dd/GHOST-0001.webp?w=600" "/__l5e/assets-v1/c5f8f2c5-362e-4064-816a-3aec2334c8dd/GHOST-0001.webp?w=160" "/__l5e/assets-v1/c5f8f2c5-362e-4064-816a-3aec2334c8dd/GHOST-0001.webp?w=2000" ; do
  curl -s -o /tmp/x -w "%{http_code} %{size_download} %{content_type} " "$B$u"; file /tmp/x | cut -c8-70; echo " <= $u"; done > up/imgtest.txt 2>&1
curl -s -o /tmp/x -w "%{http_code} %{size_download} %{content_type} accept-webp\n" -H "Accept: image/avif,image/webp,*/*" "$B/__l5e/assets-v1/c5f8f2c5-362e-4064-816a-3aec2334c8dd/GHOST-0001.webp?w=300" >> up/imgtest.txt
curl -sI "$B/__l5e/assets-v1/c5f8f2c5-362e-4064-816a-3aec2334c8dd/GHOST-0001.webp?w=300" | grep -iE "cache|vary|cf-" >> up/imgtest.txt
# 15
