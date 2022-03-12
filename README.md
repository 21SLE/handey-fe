# HANDEY FRONT-END
'HANDEY(핸디)'는 직장인과 대학생을 위한 태스크 매니저 웹&앱 서비스입니다.
바쁜 현대인들을 위해 진행 예정인 일, 진행 중인 일, 진행 완료된 일을 체계적으로 정리할 수 있도록 도와드립니다. 
핸디 프로젝트는 백엔드, 프런트엔드, 모바일 앱 파트가 개발되었는데, 이중 프런트엔드 개발 레포지터리입니다.

'HANDEY' is a task manager service for workers and student which provides web and mobile app. 
We'll help you organize your working process.
<br>
<br>

## 💻 Technologies 
* Backend: SpringBoot <br>
* <strong>Frontend: React </strong> <br>
* Mobile App: Flutter <br>
<br>

## ✏️ Design
* Development Progress <br>
  * [비즈니스 요구사항 및 개발 진행 상황](https://docs.google.com/spreadsheets/d/1_MEKdaJV0bbH2-dRaMY48fHQEZ1tV7XaFVgwaOju_FY/edit?usp=sharing, "Development Progress")
<br>

## 📆 Duration
2021/08 - 2022/01
<br>

## 🪄 Features
* [<strong>회원가입(Sign Up)</strong>](https://github.com/hanslelee/handey-fe/tree/master/src/routes/Join)
  * 이메일 중복 확인 기능
  * 비밀번호 확인 기능
* [<strong>로그인(Sign In)</strong>](https://github.com/hanslelee/handey-fe/tree/master/src/routes/Login)
* [<strong>홈 화면(Home Screen)</strong>](https://github.com/hanslelee/handey-fe/tree/master/src/components/Home)
  * Weekly: 일주일 단위로 해야할 일 정리
  * Finished Today: Weekly에서 오늘 완료한 일이 자동으로 기록
  * ToDo (1) 매일 사용자가 지정한 시각(ex. 밤 12시)에 리셋
         (2) 사용자가 모두 완료한 ToDo는 삭제된다. 이는 History 화면에서 확인 가능
         (3) Drag-and-Drop기능이 가능하여 순서를 바꿀 수 있음 
         (4) 압정 버튼을 누를 시 순서가 고정
  * Memo: 메모 기능
  * CRUD: 위 component들은 기본적인 crud기능이 제공됨
  * 사이드바: 캘린더 기능, 로그아웃 기능, 환영 메시지 등
* [<strong>히스토리 화면(History Screen)</strong>](https://github.com/hanslelee/handey-fe/tree/master/src/components/History)
  * 지난 날들의ToDo와 Finished Weekly를 확인 할 수 있음
* [<strong>설정 화면(Settings)</strong>](https://github.com/hanslelee/handey-fe/tree/master/src/routes/Setting)
  * 비밀번호 변경
  * 이름(닉네임) 변경
  * 리셋 시간(완료된 ToDo들은 삭제되고, ToDo와 Finished Weekly가 HISTORY로 넘어감) 변경
* [<strong>휴지통 화면(Trash)</strong>](https://github.com/hanslelee/handey-fe/tree/master/src/components/Trash)
  * 홈화면에서 ToDo삭제시 휴지통 화면으로 이동
  * 일주일이 지나면 휴지통에서 삭제
  * 홈화면으로 복구 버튼을 누르면 홈 화면으로 복구

<br>

## 🔍 Preview
* 로그인(Sign in)/회원가입(Sign up)<br>
![image](https://user-images.githubusercontent.com/51855129/158018469-a2d7f559-7218-4b8b-8ab8-70dffb72a83b.png)
![image](https://user-images.githubusercontent.com/51855129/158018466-32ef9b83-e1ed-4206-9224-e04070393dc6.png)

* 홈 화면(Home)<br>
![image](https://user-images.githubusercontent.com/51855129/158018479-40a0b0af-bf43-453d-9509-341424db4668.png)
![img](https://user-images.githubusercontent.com/51855129/158018549-8a3d3a28-1eb4-4aee-b4a1-49f5ea479eab.gif)

* 히스토리 화면(History)<br>
![image](https://user-images.githubusercontent.com/51855129/158018481-2c094814-1538-4808-a357-2343b77b0b70.png)

* 설정 화면(Settings)<br>
![image](https://user-images.githubusercontent.com/51855129/158018486-22085f60-9ff3-4dac-9be7-01a800c8eca2.png)

* 휴지통 화면(Trash)<br>
![image](https://user-images.githubusercontent.com/51855129/158018488-2f575a98-3d1b-40fd-a725-7db9229d9379.png)

## 📑 Future Plans
* DB, Server 변경
* 도움말 설정
* 비밀번호 찾기 기능(이메일 전송)

## 🎈...
처음에는 따로 리액트를 사용하지 않고 스프링과 타임리프(Thymeleaf)를 사용하여 웹을 구성하려 했지만, 프런트엔드에서 여러 기능들을 개발할 때 한계에 부딪치는 경우가 많이 생겨 리액트로 옮겨 개발하게 되었다.


