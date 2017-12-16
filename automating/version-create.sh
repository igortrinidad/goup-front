#!/bin/bash


BLACK='\033[0;30m';
RED='\033[0;31m';
GREEN='\033[0;32m';
BLUE='\033[0;34m';

echo -e "${BLUE}*****************************************";
echo -e "${BLUE}*****************************************";
echo -e "INITATED THE AUTOMATING PROCCESS TO CREATE A NEW APK AND NEW APP VERSION.";
echo -e "${BLACK}";

version=(`env=production  node update-version.js`);
wait;
echo -e "${BLUE}*****************************************";
echo -e "${BLUE}*****************************************";
echo -e "${GREEN}Version of the app updated to ${version}.";
echo -e "${BLACK}";

cd ../;

gulp --production;
wait;

echo -e "${BLUE}*****************************************";
echo -e "${BLUE}*****************************************";
echo -e "${GREEN}GULP PRODUCTION FINISHED => SEE ABOVE";
echo -e "${BLACK}";

npm run build;
wait;

echo -e "${BLUE}*****************************************";
echo -e "${BLUE}*****************************************";
echo -e "${GREEN}NPM RUN BUILD FINISHED => SEE ABOVE";
echo -e "${BLACK}";

cordova build android --release;
wait;

echo -e "${BLUE}*****************************************";
echo -e "${BLUE}*****************************************";
echo -e "${GREEN}CORDOVA BUILD ANDROID --RELEASE FINISHED => SEE ABOVE";
echo -e "${BLACK}";

cordova prepare ios;
wait;

echo -e "${BLUE}*****************************************";
echo -e "${BLUE}*****************************************";
echo -e "${GREEN}CORDOVA PREPARE IOS FINISHED => SEE ABOVE";
echo -e "${BLACK}";

cd automating;

mkdir ../apk_versions/$version;

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore isaudavel.keystore ../platforms/android/build/outputs/apk/android-release-unsigned.apk isaudavel -storepass wp-isaudavel-21 -keypass wp-isaudavel-21;
wait;

zipalign -v 4 ../platforms/android/build/outputs/apk/android-release-unsigned.apk ../apk_versions/$version/GOUP-APP-SIGNED.apk;

echo -e "${BLUE}*****************************************";
echo -e "${BLUE}*****************************************";
echo -e "${GREEN}ANDROID APK SIGN FINISHED => SEE ABOVE";
echo -e "${BLACK}";

echo -e "${BLUE}*****************************************";
echo -e "${BLUE}*****************************************";
echo -e "${GREEN}ALL TASKS FINISHED FOR THE VERSION ${version} OF GOUP APP.";
echo -e "${BLACK}";