import { app } from './index'
// listen
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
} )