var fs = require('fs');
var path = require('path');


getData = function(req, res, variables, imgs, copys, texts) {
    if (!(req.body['variable'] instanceof Array)) {
        variables.push(req.body['variable']);
    } else {
        variables = req.body['variable'];
    }

    if (!(req.body['img-name'] instanceof Array)) {
        imgs.push({
            name : req.body['img-name'],
            url : req.body['img-url']
        })
    } else {
        for (var i = 0; i < req.body['img-name'].length; i++) {
            imgs.push({
                name : req.body['img-name'][i],
                url : req.body['img-url'][i]
            });
        }   
    }

    if (!(req.body['copy-method'] instanceof Array)) {
        if (req.body['copy-method'] == 'copyresample') {
            copys.push({
                method : req.body['copy-method'],
                destImg : req.body['dest-img'],
                srcImg : req.body['src-img'],
                destX : req.body['dest-x'],
                destY : req.body['dest-y'],
                srcX : req.body['src-x'],
                srcY : req.body['src-y'],
                destWidth : req.body['dest-width'],
                destHeight : req.body['dest-height'],
                srcWidth : req.body['src-width'],
                srcHeight : req.body['src-height']
            });
        } else {
            copys.push({
                method : req.body['copy-method'],
                destImg : req.body['dest-img'],
                srcImg : req.body['src-img'],
                destX : req.body['dest-x'],
                destY : req.body['dest-y'],
                srcX : req.body['src-x'],
                srcY : req.body['src-y'],
                srcWidth : req.body['src-width'],
                srcHeight : req.body['src-height']
            });
        }
    } else {
        for (var i = 0; i < req.body['copy-method'].length; i++) {
            if (req.body['copy-method'][i] == 'copyresample') {
                copys.push({
                    method : req.body['copy-method'][i],
                    destImg : req.body['dest-img'][i],
                    srcImg : req.body['src-img'][i],
                    destX : req.body['dest-x'][i],
                    destY : req.body['dest-y'][i],
                    srcX : req.body['src-x'][i],
                    srcY : req.body['src-y'][i],
                    destWidth : req.body['dest-width'][i],
                    destHeight : req.body['dest-height'][i],
                    srcWidth : req.body['src-width'][i],
                    srcHeight : req.body['src-height'][i]
                });
            } else {
                copys.push({
                    method : req.body['copy-method'][i],
                    destImg : req.body['dest-img'][i],
                    srcImg : req.body['src-img'][i],
                    destX : req.body['dest-x'][i],
                    destY : req.body['dest-y'][i],
                    srcX : req.body['src-x'][i],
                    srcY : req.body['src-y'][i],
                    srcWidth : req.body['src-width'][i],
                    srcHeight : req.body['src-height'][i]
                });
            }
        }
    }

    if (!(req.body['text-name'] instanceof Array)) {
        texts.push({
            textImg : req.body['text-img'],
            fontSize : req.body['font-size'],
            fontAngle : req.body['font-angle'],
            textX : req.body['text-x'],
            textY : req.body['text-y'],
            color : req.body['text-color'],
            fontFamily : req.body['font-family'],
            textName : req.body['text-name']
        });
    } else {
        for (var i = 0; i < req.body['text-name'].length; i++) {
            texts.push({
                textImg : req.body['text-img'][i],
                fontSize : req.body['font-size'][i],
                fontAngle : req.body['font-angle'][i],
                textX : req.body['text-x'][i],
                textY : req.body['text-y'][i],
                color : req.body['text-color'][i],
                fontFamily : req.body['font-family'][i],
                textName : req.body['text-name'][i]
            });
        }   
    }   
}

outputCode = function(apiId, apiName, variables, imgs, copys, texts) {

    // fs.writeFile('apiId.php', 'what happen', function(err) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("output succeed!");
    //     }
    // });

    fs.readFile('apiId.php', 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });

}

exports.showIndex = function(req, res) {
    res.render('index', { title: '素材代码自动生成' });
};

exports.createCode = function(req, res) {
    var apiId = req.body['api-id'];
    var apiName = req.body['api-name'];
    var variables = [];
    var imgs = [];
    var copys = [];
    var texts = [];
    getData(req, res, variables, imgs, copys, texts);
    outputCode(apiId, apiName, variables, imgs, copys, texts);
    res.json({
        'apiId' : apiId,
        'apiName' : apiName,
        'variables' : variables,
        'imgs' : imgs,
        'copys' : copys,
        'texts' : texts
    });
}