var express = require('express');
var router = express.Router();
var request = require("request");
var cheerio = require('cheerio');
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
         res.set({'content-type': 'application/json'}).send(JSON.stringify(message("종류를 골라주세요.",['학생식단(종강)','교직원식단(종강)','처음으로'])));
     }
       if(req.body.content.indexOf('아마렌스홀') >-1){
        console.log("아마렌스홀");
         res.set({'content-type': 'application/json'}).send(JSON.stringify(message("종류를 골라주세요.",['학생식단','교직원식단','처음으로'])));
     }
    if(req.body.content.indexOf('학생식단(종강)') >-1){
        console.log("학생식단(종강)");
            request({
        url: "http://www.suwon.ac.kr/community/listConvenienceMenu.do",
        headers:{
          'Referer':'http://www.suwon.ac.kr/community/listConvenienceMenu.do',
          'Upgrade-Insecure-Requests':'1',
          'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8'

        }
      }, function(err, response, html){
        if(err) throw err;
        var $ = cheerio.load(html);
        var result = $(".ac").text();
        let week = new Array('일','월','화','수','목','금','토');
        var date = new Date().getDay();
        var day = week[date];
      //  var jong = new jongGang(date,result);
        switch(date){
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            var spliter = result.split(' ');
            var jong = {
                little : [spliter[2+date-1], spliter[9+date-1]],
                don : spliter[16+date-1],
                chef : [spliter[23+date-1],spliter[30+date-1],spliter[37+date-1],spliter[44+date-1],spliter[51+date-1]],
                mom : [spliter[58+date-1],spliter[65+date-1],spliter[72+date-1],spliter[79+date-1],spliter[86+date-1],spliter[93+date-1]],
                release:[spliter[100+date-1],spliter[107+date-1]]
            };
            console.log(jong);
    break;
          default:

    break;
        }
      //  console.log(jong);
    //    console.log(result);

        res.set({'content-type': 'application/json'}).send(JSON.stringify(message(`Little Kitchin\n${'jong.little[0]'}\n${'jong.little[1]'}`,['교직원식단','처음으로'])));
      });
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

router.get('/menu1',(req,res)=>{
  request({
    url: "http://www.suwon.ac.kr/community/listConvenienceMenu.do",
    headers:{
      'Referer':'http://www.suwon.ac.kr/community/listConvenienceMenu.do',
      'Upgrade-Insecure-Requests':'1',
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8'

    }
  }, function(err, response, html){
    if(err) throw err;
    var $ = cheerio.load(html);
    var result = $(".ac").text();
    let week = new Array('일','월','화','수','목','금','토');
    var date = new Date().getDay();
    var day = week[date];
  //  var jong = new jongGang(date,result);
    switch(date){
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        var spliter = result.split(' ');
        var jong = {
            little : [spliter[2+date-1], spliter[9+date-1]],
            don : spliter[16+date-1],
            chef : [spliter[23+date-1],spliter[30+date-1],spliter[37+date-1],spliter[44+date-1],spliter[51+date-1]],
            mom : [spliter[58+date-1],spliter[65+date-1],spliter[72+date-1],spliter[79+date-1],spliter[86+date-1],spliter[93+date-1]],
            release:[spliter[100+date-1],spliter[107+date-1]]
        };
        console.log(jong);
break;
      default:

break;
    }
  //  console.log(jong);
//    console.log(result);


    res.send(html);
  });
  });


module.exports = router;
