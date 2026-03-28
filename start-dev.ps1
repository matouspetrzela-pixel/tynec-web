# Zastavi vsechny node procesy, smaze cache a spusti dev
Write-Host "Zastavuji node procesy..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1

Write-Host "Cistim cache..." -ForegroundColor Yellow
node -e "const fs=require('fs');['.next','node_modules/.cache'].forEach(p=>{try{fs.rmSync(p,{recursive:true,force:true})}catch(e){}})"

Write-Host "Spoustim dev server na http://localhost:3000" -ForegroundColor Green
npx next dev -p 3000 --turbo
