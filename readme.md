# 구성 

## 프로젝트 초기화
    1. npm init
    2. package.json -> script에 "start": "node index.js" 추가 
       : npm run start 로 실행
## express 설치 
    1. npm install express --save
## Mongoose 설치 
    1. Mongoose 다운 (MongoDB를 편하게 쓸 수 있는 Object Modeling Tool이다)
       - npm install mongoose --save
## Modeling & Schema
### 모델은 스키마를 감싸고 있는 것이고 스키마는 각각의 데이터를 정의하는 것 

## Git 

### 구성 
    1. Working Directory : 아무것도 안한 상태 -> git add
    2. Staging Area : Staing Area로 이동,
                      git rm --cached node_modules -r 로 삭제 가능  -> git commit -m "message"
    2.1 github에 respository 생성 
    3. Git Reop.(local) -> git push 
    4. Git Reop.(remote)

## git vs. github 
### git is the tool, Github is the service for projects that use Git.  
### 안전하게 통신하는 방법 : SSH (secure shell)
    1. https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

    2. start the ssh-agent in the background
        eval "$(ssh-agent -s)"
    '''bash
    git remote add origin https://github.com/JungLaark/react-mongodb-boilerplate.git
    git branch -M main
    git push -u origin main

    git add .
    git commit -m "comment"
    git push -u origin main
    ```

## 회원가입 기능 만들기  
### body-parser : 데이터를 분석(parse)해서 req.body 로 출력해주는 것 
    - npm install body-parser --save
### register router 코드 추가 
### postman 사용 
    0. post localhost:5000/register
    1. body 탭
    2. raw 선택
    3. json 선택 
    ```json
    4. {
        "name" : "Jung",
        "email" : "che@naver.com",
        "password" : "123345"
         }
    ```
         이거 넣어줌 

## node mon 다운로드 
### 소스를 변경할 때 그걸 감지해서 자동으로 서버에 반영시켜주는 툴 
    -  변경 후 refresh 해도 바뀌지 않는 것을 자동으로 변경되게끔 해줌 
    - npm install nodemon --save-dev
    - package.json 에 추가 
      - "backend": "nodemon index.js",

