B=https://ghostshopi.lovable.app
for u in "/__l5e/assets-v1/c5f8f2c5-362e-4064-816a-3aec2334c8dd/GHOST-0001.webp" "/__l5e/assets-v1/c5f8f2c5-362e-4064-816a-3aec2334c8dd/GHOST-0001.webp?width=300" "/__l5e/assets-v1/c5f8f2c5-362e-4064-816a-3aec2334c8dd/GHOST-0001.webp?w=300" "/cdn-cgi/image/width=300,format=auto/__l5e/assets-v1/c5f8f2c5-362e-4064-816a-3aec2334c8dd/GHOST-0001.webp" "/__l5e/assets-v1/c5f8f2c5-362e-4064-816a-3aec2334c8dd/GHOST-0001.webp?width=300&format=webp"; do
  curl -s -o /tmp/x -w "%{http_code} %{size_download} %{content_type} " "$B$u"; file /tmp/x | cut -c1-120; echo " <= $u"; done > up/imgtest.txt 2>&1
# 14
