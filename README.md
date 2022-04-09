npClock
=======

Beware: Angular 8 / Ionic 4 Application

Small clock app that displays the time as words.

Demo: https://npafterwork.github.io/npClock

Create apk File
--------

1. Build unsigned apk
`
ionic cordova build --release android
`
2. Generate .keystore
`
keytool -genkey -v -keystore npclock-release.keystore -alias npclock -keyalg RSA -keysize 2048 -validity 10000
`
3. Migrate key
`
keytool -importkeystore -srckeystore npclock-release.keystore -destkeystore npclock-release.keystore -deststoretype pkcs12
`
4. Copy unsignd apk
`
cp platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk .\npclock-unsigned.apk 
`
5. Finally sign apk
`
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore npclock-release.keystore npclock-unsigned.apk npclock
`
6. (optional Optimize apk)
`
zipalign -v 4 npclock-unsigned.apk npclock.apk
`

Update apk
-------------

Run step 1. then continue with 4.

