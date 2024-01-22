# ts-node-api

- [Node.js and TypeScript Tutorial: Build a CRUD API](https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/)를 참고하여 기본적인 Typscript CRUD 구조 API 구현
- Jest를 활용한 유닛 테스트 (진행중)
- Jest를 활용한 Controller(Router), Service, MiddleWare 통합 테스트 (진행중)
- ...

## 종속성
- package.json
```json
{
   "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.2",
    "express": "^4.18.2",
    "helmet": "^7.1.0"
  },
  "devDependencies": {
    "@babel/preset-env": "^7.23.8",
    "@babel/preset-typescript": "^7.23.3",
    "@types/cors": "^2.8.17",
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.21",
    "@types/helmet": "^4.0.0",
    "@types/jest": "^29.5.11",
    "@types/node": "^20.11.5",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.2",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.3.3"
  }
}
```
## 종속성 설치

### Production 환경 종속성
```bash
$ npm i cors dotenv express helmet
```

### Dev 환경 종속성

#### TypeScript

- Typescript 및 종속성의 타입 설치
```bash
$ npm i -D typscript ts-node-dev @types/cors @types/express @types/helmet @types/node
```

- `tsconfig.json` 생성
```bash
$ > npx tsc --init
```

#### Jest

- Jest 및 Babel 설치
  - Jest는 Typescript 환경을 테스트하기 위해서는 Jest의 Babel 사용 지침을 따라야 한다.
  - [다음](https://jestjs.io/docs/next/getting-started#using-typescript)을 참고하여 Babel 환경을 구성한다.
```bash
$ npm i -D jest ts-jest @types/jest @babel/preset-env @babel/preset-typescript 
```
> 위의 포스팅과 다른 하나는, 본 프로젝트에서는 `.babelrc` 를 통해 babel 프리셋을 설정했다.

- `jest.config.ts` 생성
```bash
$ jest --init
```


## 참고
- [Node.js and TypeScript Tutorial: Build a CRUD API](https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/)
- [테스트 코드로 JS 의 기능 및 로직 점검하기](https://velog.io/@skyu_dev/Jest-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-JS%EC%9D%98-%EA%B8%B0%EB%8A%A5-%EC%A0%90%EA%B2%80%ED%95%98%EA%B8%B0)
- [middleware 테스트 하기](https://airplane9876.tistory.com/16)
- [ES6 Class Mocks - Jest Docs](https://jestjs.io/docs/es6-class-mocks)
- [An Async Example - Jest Docs](https://jestjs.io/docs/tutorial-async)
