var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/keyboard',(req,res)=>{
    const menu = {
        type: 'buttons',
        buttons: ["학식메뉴봇","메뉴2","처음으로"]
    };
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify(menu));
});
router.post('/message', (req, res) => {
    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
    let message = function(msg,buttons) {
        return {
            "message": {
            "text": msg
        },
        "keyboard": {
            "type": "buttons",
            "buttons": buttons
        }
        };
    };
    console.log(req.body.content);

     if(req.body.content.indexOf('처음으로') > -1){
        console.log("처음으로");
         res.set({'content-type': 'application/json'}).send(JSON.stringify(message("기능을 골라주세요.",['학식메뉴봇','메뉴2','처음으로'])));
     }
     if(req.body.content.indexOf('학식메뉴봇') >-1){
        console.log("학식메뉴봇");
         res.set({'content-type': 'application/json'}).send(JSON.stringify(message("식당을 골라주세요.",['종합강의동','아마렌스홀','처음으로'])));
     }
    if(req.body.content.indexOf('종합강의동') >-1){
        console.log("종합강의동");
         res.set({'content-type': 'application/json'}).send(JSON.stringify(message("종류를 골라주세요.",['학생식단','교직원식단','처음으로'])));
     }
       if(req.body.content.indexOf('아마렌스홀') >-1){
        console.log("아마렌스홀");
         res.set({'content-type': 'application/json'}).send(JSON.stringify(message("종류를 골라주세요.",['학생식단','교직원식단','처음으로'])));
     }
});
router.post('/friend', (req, res) => {
    const user_key = req.body.user_key;
    console.log(`${user_key}님이 채팅방에 참가했습니다.`);
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({success:true}));
});

router.delete('/friend', (req, res) => {
    const user_key = req.body.user_key;
    console.log(`${user_key}님이 채팅방을 차단했습니다.`);
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({success:true}));
});

router.delete('/chat_room/:user_key', (req, res) => {
    const user_key = req.params.user_key;
    console.log(`${user_key}님이 쳇팅방에서 나갔습니다.`);

    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({success:true}));
});

module.exports = router;
