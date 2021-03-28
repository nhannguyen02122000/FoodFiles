# SCheck project (SCheck web, Foodfiles app)
This project is conducted for participating in Google Solution Challenge 2021 by students of Ho Chi Minh City University of Technology, Vietnam National University Ho Chi Minh City.

Member:
* [Viet H. Tran](https://github.com/HoangViet144)
* [Nhan T. Nguyen](https://github.com/nhannguyen02122000)
* [Nhien T. Pham]()
* [Hung D. Do](https://github.com/hungdoitbk)

## SCheck Web
This website is used to add and modify ingredients.

### Demo
Firstly, go to scheck-web directory:\
`cd scheck-web`

Secondly, install all dependencies:\
`npm install`

Then, run localhost server:\
`npm start`

In order to deploy, run:\
`npm run build`\
`firebase deploy`\
and follow instructions

A website which has been released can be found at:\
[SCheck website](https://scheck-da2c3.web.app/)

## Foodfiles App
This is the heart of our project. 

### APK
A released apk can be found at [Foodfiles App](https://github.com/nhannguyen02122000/FoodFiles/blob/master/scheck-app/foodfiles.apk)

### Demo
Firstly, go to foodfiles app directory:\
`cd scheck-app\foodfiles`

Secondly, install all dependencies:\
`npm install`

For debugging on android, run:\
`npx react-native run-android`

For building apk, run:\
`cd android`\
`.\gradlew assembleRelease`
