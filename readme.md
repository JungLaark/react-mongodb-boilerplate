# node.js 구성 

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
```bash
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

## 비밀정보 관리(github)
### mongoDB 계정 
    - config 폴더 > dev.js, prod.js, key.js 파일 생성 
    - module.exports={mongoURI:""} 
    - 배포용(헤로쿠 등), 개발용 분기를 둬야 한다
    - dev.js 처럼 민감 정보가 있는 파일은 .gitignore에 추가해서 push가 안되도록 해야 한다

## 비밀번호 암호화 
### bcrypt 
    - npm install bcrypt --save
    - https://www.npmjs.com/package/bcrypt
    - model 에서 정의 

## 비밀번호 일치할 때 TOKEN 생성 
### JSONWEBTOKEN 사용
#### npm install jsonwebtoken --save 
    - https://www.npmjs.com/package/jsonwebtoken
#### 쿠키에 저장 
    - npm install cookie-parser --save

## Auth 기능 만들기 
### 여러가지 페이지를 이동할 때 로그인 권한 부여하기 위함 (보통 session으로 관리했던 기억이)
    - auth 라는 route 추가 
    - middleware 추가 

## 로그아웃 기능 
### DB에 token을 지워준다 


***
# React JS 
## 이거슨 라이브러리다
## real DOM virtual DOM
### 동작방식 
    virtual DOM이 바뀐 부분을 찾아서 real DOM 에서 바꿈 
## Babel, Webpack 
    Babel : 구형브라우저에서도 최신 js 문법이 가동 가능하게 변환시켜줌 
    Webpack : 많은 모듈들을 간단하게 만들어줌 - src 폴더만 관리함, 이미지 등을 넣는다. 

## React 설치(npm vs. npx) 
    - npx create-react-app . (현재 경로에 react를 설치하겠다)
    - npm : node package manager (package.json)
    - npx : npm 패키지를 1회성으로 실행? 좀 더 연구가 필요하다 
## npm run start
    - index.js 가 대장이다 
    - index.js의 document.getElementById('root')는 index.html의 root를 가져온다
## Boilerplate 구조 만들기 
    - _actions, _reducer : redux를 위한 폴더 
    - App.js : Routing 관련 일을 처리
    - hoc (Higher Order Component)
    - rfce -> react 코드 자동생성 --> es7 설치
## React Router Dom 을 이용하여 router 기능 구현 
    - https://reactrouter.com/web/example/basic
    - npm install react-router-dom --save
## Axios 
    - Postman으로 했지만 이젠 frontend가 생겼으니 axios로 하자 
    - npm install axios --save

    --server : 5000
      client : 3000

## CORS 이슈 
    - Cross-Origin Resources Sharing
     : domain이 서로 다른 웹페이지와 서버 간의 통신 제어 
     -> Proxy 사용 
     -> https://create-react-app.dev/docs/proxying-api-requests-in-development
     - npm install http-proxy-middleware --save (client에서)

## Concurrently
    - client, server 동시 실행 
    - npm install concurrently --save
    
```json
//in package.json

"dev" : "concurrently \"npm run backend\" \"npm run start --prefix client\""
```

    -npm run dev

    - [HPM] Error occurred while proxying request 오류 뜸 
    --> index.js 파일을 못찾아서 "backend": "nodemon server/index.js", 으로 수정했음 

## CSS framework
    - Ant design 
        - react 를 위한 프레임워크, client dependency에 설치 
        - npm install antd --save
        - client/src/index.js 에 아래 코드 추가 

```javascript
    import 'antd/dist/antd.css'
```

## Redux 
    - Redux is predictable state container for Javascript apps.
    - 상태 관리 라이브러리

### Data Flow
    React Component -> Dispatch -> Action -> Reducer -> Store -> Subscribe

#### Action 
    - 무엇이 일어났는지 설명하는 객체, 상태를 알려주는  
#### Reducer
    - 이전 state와 action object를 받은 후에 next state 를 return한다. 
#### Store
    - State를 저장, 및 관리 
## Props vs. State
### Props 
    - 부모 컴포넌트에서 자식 컴포넌트로 데이터 전달 
    - 전달받은 데이터는 immutable, 수정할 수 없다. 
    - 부모 컴포넌트에서 수정을 해줘야 바뀔 수가 있다. 
```javascript
<자식ChatMessages
messages={messages}
currentMember={member}
/>

```
### State
    - 해당 컴포넌트에서 데이터를 전달할 때 사용 
    - ex> 검색창에 키워드를 입력할 때 글이 변하는 것은 state로 바꿈 
```javascript
state = {
    message: '',
    attachFile: undefined,
    openMenu: false
}
```
## Redux 적용
### Redux 설치 
    - npm install redux react-redux redux-promise redux-thunk --save (client)
    - promise 와 thunk 는 redux의 미들웨어

### Redux 적용
    - index.js 에 redux 관련 추가 
    - _reducer/index.js 파일 추가 
    - chrome에서 redux extension 추가 

## React Component 
### Class Component 
```javascript
import React, {Component} from 'react'

export default class Hello extends Component{
    render(){
        return(
            <div>
                hello
            </div>
        )
    }
}
```
    - 더 많은 기능 
    - 긴 코드

### Functional Component 
```javascript
import React from 'react'

export default function Hello(){
    return(
        <div>hello
        </div>
    )
}
```
    - 한정된 기능 
    - 짧아진 코드 
    ***

## React Hooks
    - 16.8 버전 이후로 functional component 에서도 class component에서만 사용 할 수 있었던 것들을 할 수 있게 됨 
    
```javascript
import React, {Component} from 'react'
import Axios from 'axios'

export default class Hello extends Component {
    constructor(props){
        super(props);
        this.state = {name: ""};
    }

    componentDidMount(){//라이프사이클
        Axios.get('/api/user/name')
        .then(response => {
            this.setState({name : response.data.name})
        })
    }

    render(){
        return(
            <div>
                My name is {this.state.name}
            </div>
        )
    }
}
```
    - constructor 실행
    - render 실행 - dom에 알맞게 넣어줌 
    - componentDidMount 실행 - data 가져옴 ->>>> 이건 useEffect로 대체 사용가능함 
***
```javascript
import React, {useEffect, useState} from 'react'
import Axios from 'axios'

export default function Hello(){
    const [Name, setName] = useState("")

    useEffect(() => {
        Axios.get('/api/user/name')
        .then(response => {
            setName(response.data.name);
        });
    });

    return (
        <div>
        My name is {Name}
        </div>
    )
}
```
***

## 화면 만들기 
    -ctrl + p 빠른 이동 