@echo off
chcp 65001 >nul
echo ================================
echo   我的工作台 - 启动中...
echo ================================
echo.
echo 正在启动本地服务器...
echo.
echo 手机访问: 同一 WiFi 下打开浏览器输入:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do echo   http:%%a:3000
echo.
echo 电脑访问: http://localhost:3000
echo.
echo 按 Ctrl+C 可停止服务器
echo ================================

start "" http://localhost:3000
npx serve . -p 3000 --no-clipboard
pause
