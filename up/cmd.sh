mkdir -p up/attente && cd up/attente
while read n u; do curl -sSL "$u" -o "$n.jpg"; done <<'L'
001_lot https://ghostshopi.lovable.app/__l5e/assets-v1/6b554116-e4d3-4c1e-8e0c-a05529b27f2a/brute-001.jpg
001_site https://ghostshopi.lovable.app/__l5e/assets-v1/263d723e-90fa-49f8-823f-f69331035122/GHOST-1325-catalogue.jpg
002_lot https://ghostshopi.lovable.app/__l5e/assets-v1/0fdc9c21-8e69-477c-913b-7eeb65e7c3fd/brute-002.jpg
002_site https://ghostshopi.lovable.app/__l5e/assets-v1/0a8c4e79-97bb-415a-8266-8d804aac9e03/GHOST-1324-catalogue.jpg
003_lot https://ghostshopi.lovable.app/__l5e/assets-v1/772e784a-a7fd-4700-82b8-055b8c7606be/brute-003.jpg
003_site https://ghostshopi.lovable.app/__l5e/assets-v1/84dd31ca-771e-4be3-8b91-e6aaabfc72ce/GHOST-1322-catalogue.jpg
004_lot https://ghostshopi.lovable.app/__l5e/assets-v1/9cf78be1-8616-44e4-8d57-82ab5a236236/brute-004.jpg
004_site https://ghostshopi.lovable.app/__l5e/assets-v1/941e55a0-e727-4d76-8661-bd3ad171384c/GHOST-1320-catalogue.jpg
005_lot https://ghostshopi.lovable.app/__l5e/assets-v1/f979bf7f-437a-4ff7-8693-0b9deffc2701/brute-005.jpg
005_site https://ghostshopi.lovable.app/__l5e/assets-v1/4602746b-6b94-4b9f-9b50-131a3194bd00/GHOST-1279-catalogue.jpg
006_lot https://ghostshopi.lovable.app/__l5e/assets-v1/ff751961-3acc-4d84-81af-a270db7864fc/brute-006.jpg
006_site https://ghostshopi.lovable.app/__l5e/assets-v1/f87664c6-1241-4ecf-bae6-e0c6307c32cf/GHOST-1282-catalogue.jpg
007_lot https://ghostshopi.lovable.app/__l5e/assets-v1/bebe060e-4d54-4db6-81c3-f6e0ab144137/brute-007.jpg
007_site https://ghostshopi.lovable.app/__l5e/assets-v1/5b1234ae-4d8c-4ae8-a336-86e1bb8a4cce/GHOST-1283-catalogue.jpg
008_lot https://ghostshopi.lovable.app/__l5e/assets-v1/c0df6eac-adb1-456c-92fd-6bd3a2afbd97/brute-008.jpg
008_site https://ghostshopi.lovable.app/__l5e/assets-v1/a89c82fe-5a11-44bf-8675-1264266ec338/GHOST-1284-catalogue.jpg
009_lot https://ghostshopi.lovable.app/__l5e/assets-v1/9c8765bf-2261-4863-88e3-f9560664470e/brute-009.jpg
009_site https://ghostshopi.lovable.app/__l5e/assets-v1/7307c873-a1c6-4a6b-a307-ab9593ecbcd4/GHOST-1214-catalogue.jpg
021_lot https://ghostshopi.lovable.app/__l5e/assets-v1/ec7f41f9-40d9-4279-be07-7f9446b81fa4/brute-021.jpg
021_site https://ghostshopi.lovable.app/__l5e/assets-v1/02581380-0f4f-42ad-9df7-7bc7c96b513c/GHOST-1391-catalogue.jpg
074_lot https://ghostshopi.lovable.app/__l5e/assets-v1/6a7a93e9-0a3a-4a95-a960-6a56e1944924/brute-074.jpg
074_site https://ghostshopi.lovable.app/__l5e/assets-v1/7422cba5-183a-41aa-b0a8-cc735df04215/GHOST-1387-catalogue.jpg
083_lot https://ghostshopi.lovable.app/__l5e/assets-v1/7ac8ca52-fc45-41bf-a391-c9653a328a6c/brute-083.jpg
083_site https://ghostshopi.lovable.app/__l5e/assets-v1/aa4e08f5-53f3-40b2-a010-25ea09772008/GHOST-1290-catalogue.jpg
L
file * > list.txt
# 8
