@echo off
cd /d "%~dp0"

:: Start the server in a separate window
start "" npm start

:: Replace the icon
ResourceHacker.exe -open StudSup.exe -save StudSup.exe -action addoverwrite -res icon.ico -mask ICONGROUP,MAINICON,

echo Icon replaced successfully!
pause
