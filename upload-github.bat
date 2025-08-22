@echo off
echo ========================================
echo    UPLOAD PARA GITHUB - TECNOPLACE
echo ========================================
echo.

echo 1. Adicionando arquivos...
git add .

echo.
echo 2. Fazendo commit...
git commit -m "Site Tecnoplace completo e responsivo"

echo.
echo 3. Fazendo push para GitHub...
git push origin gh-pages

echo.
echo ========================================
echo    UPLOAD CONCLUIDO!
echo ========================================
echo.
pause

