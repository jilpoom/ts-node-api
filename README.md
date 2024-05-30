# ts-node-api

- [Node.js and TypeScript Tutorial: Build a CRUD API](https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/)
  를 참고하여 기본적인 Typescript CRUD 구조 API 구현
- Jest를 활용한 유닛 테스트 
- Jest, Supertest를 활용한 Controller(Router), Service 통합 테스트
- ...

# 종속성 설치

## Production 환경 종속성

```bash
$ npm i cors dotenv express helmet
```

## Dev 환경 종속성

### TypeScript

- Typescript 및 종속성의 타입 설치

```bash
$ npm i -D typscript ts-node-dev @types/cors @types/express @types/helmet @types/node
```

- `tsconfig.json` 생성

```bash
$ > npx tsc --init
```

### Jest

- Jest 및 Babel 설치
    - Jest로 Typescript 환경을 테스트하기 위해서는 Babel 사용 지침을 따라야 한다.
    - [다음](https://jestjs.io/docs/next/getting-started#using-typescript)을 참고하여 Babel 환경을 구성한다.

```bash
$ npm i -D jest ts-jest @types/jest @babel/preset-env @babel/preset-typescript 
```

> 위의 포스팅과 다른 하나는, 본 프로젝트에서는 `.babelrc` 를 통해 babel 프리셋을 설정했다.

- `jest.config.ts` 생성

```bash
$ jest --init
```

### Supertest

- Jest로 API 통합테스트를 진행하기 위한 라이브러리

```bash
$ npm i -D supertest @types/supertest
```

- `jest.config.ts`에 다음 구성 추가

```typescript
const config: Config = {
    // (생략)
    preset: 'ts-jest',
    testEnvironment: 'node',
}
```
#### Supertest 환경  위한 서버 실행 환경 분리
> 보통 익스프레스 listen을 통해 포트를 열어줘서 서버를 구동시키지만, supertest는 자체적으로 따로 서버 구동해서 가상의 요청을 보내기 때문에, 테스트 환경에서 직접 서버를 구동 시킬 필요가 없고 구동 시키면 안된다. 즉
서버를 구동하는 부분을 반드시 분리하고, 테스트 환경에서 `import` 하여 사용해야 한다.

- `app.js` (혹은 `index.js` 와 같은 익스프레스 서버를 구동(`listen`) 하는 파일)
```javascript
// ...
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; // app.js를 모듈로 만들어 외부로 꺼낸다.
```

- `server.js` 로 분리
```javascript
const app = require('./app');

// listen to port
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})
```


## 테스트 커버리지

- 전체 소스 코드 테스트 커버리지 80% 이상 목표
>실제 커버리지 비율이 높다고 해서, 버그가 없는 소프트웨어는 아니며, 
현업에서는 비즈니스 요구에 맞춰 어느 정도를 달성할 것인지 정하도록 격려한다. 하지만 낮은 커버리지 수치는
배포 시 프로덕트의 큰 부분에서 테스트가 이루어지지 않았다는 것을 뜻하기 때문에 위험성이 매우 높다.

## 참고

- [Node.js and TypeScript Tutorial: Build a CRUD API](https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/)
- [테스트 코드로 JS 의 기능 및 로직 점검하기](https://velog.io/@skyu_dev/Jest-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-JS%EC%9D%98-%EA%B8%B0%EB%8A%A5-%EC%A0%90%EA%B2%80%ED%95%98%EA%B8%B0)
- [middleware 테스트 하기](https://airplane9876.tistory.com/16)
- [ES6 Class Mocks - Jest Docs](https://jestjs.io/docs/es6-class-mocks)
- [An Async Example - Jest Docs](https://jestjs.io/docs/tutorial-async)
- [Jest - Supertest 사용법](https://inpa.tistory.com/entry/JEST-%F0%9F%93%9A-supertest-api-%EC%9A%94%EC%B2%AD%ED%85%8C%EC%8A%A4%ED%8A%B8#agent__%EA%B0%80%EC%83%81%EC%9D%98_%EC%82%AC%EC%9A%A9%EC%9E%90%EB%A5%BC_%EB%91%90%EC%96%B4_%EC%8B%A4%EC%A0%9C%EB%A1%9C_%EC%84%9C%EB%B9%84%EC%8A%A4%EB%A5%BC_%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94_%EA%B2%83_%EA%B3%BC_%EA%B0%99%EC%9D%B4_%EC%9A%94%EC%B2%AD_%EC%83%81%ED%83%9C%EB%A5%BC_%EC%A7%80%EC%86%8D)
- [테스트 커버리지](https://velog.io/@newdana01/Test-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BB%A4%EB%B2%84%EB%A6%AC%EC%A7%80-Test-Coverage)
