var fs = require('fs');
var path = require('path');
var os = require('os');


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
            var type = req.body['img-url'][i].split('.')
            if (type[type.length-1] == 'png') {
                type = 'png';
            } else {
                type = 'jpeg';
            }
            imgs.push({
                name : req.body['img-name'][i],
                url : req.body['img-url'][i],
                type : type
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
    var fWrite = fs.createWriteStream('public/output/'+apiId+'.php', {
        flags: 'a',
        defaultEncoding: 'utf8',
        autoClose: true
    });
    fWrite.write('<?php' + os.EOL);
    for (var i = 0; i < variables.length; i++) {
        fWrite.write('    $'+variables[i]+' = trim(mb_convert_encoding($data->'+
            variables[i]+', "UTF-8", "auto"));' + os.EOL);
    }
    for (var i = 0; i < imgs.length; i++) {
        fWrite.write("    $"+imgs[i].name+" = imagecreatefrom"+imgs[i].type+"('"+imgs[i].url+"');" + os.EOL);
    }
    for (var i = 0; i < texts.length; i++) {
        console.log(texts[i].textImg);
        fWrite.write('    ImageTTFText($'+texts[i].textImg+','+texts[i].fontSize+
            ','+texts[i].fontAngle+','+texts[i].textX+','+texts[i].textY+
            ',ImageColorAllocate($'+texts[i].textImg+','+texts[i].color+
            '),\'font/'+texts[i].fontFamily+'.ttf\',$'+texts[i].textName+
            ');' + os.EOL);
    }
    fWrite.write("    $savename = $type.$md5_name.$log_date.'.png';" + os.EOL);
    fWrite.write("    $savefile = $save_path.$savename;" + os.EOL);
    fWrite.write("    imagepng($im,$savefile);" + os.EOL);
    fWrite.write("    imagedestroy($im);" + os.EOL);
    fWrite.end("    exit(json_encode(array('code'=>1,'name'=>$name.'"+
        apiName+"','key'=>$save_path.$savename,'url'=>$serverHost.$save_path.$savename)));" + os.EOL);
    // var fWrite = fs.createWriteStream('public/output/apiId.php', {
    //     flags: 'a',
    //     defaultEncoding: 'utf8',
    // });
    // fWrite.write('this is what you got, hum?' + os.EOL);
    // fWrite.write('well tell me what you got' + os.EOL);
    // fWrite.close();
}

exports.showIndex = function(req, res) {
    res.render('index', { title: '素材接口生成器' });
};

exports.createCode = function(req, res) {
    var apiId = req.body['api-id'];
    var apiName = req.body['api-name'];
    var variables = [];
    var imgs = [];
    var copys = [];
    var texts = [];
    getData(req, res, variables, imgs, copys, texts);
    // outputCode(apiId, apiName, variables, imgs, copys, texts);
    res.json({
        'apiId' : apiId,
        'apiName' : apiName,
        'variables' : variables,
        'imgs' : imgs,
        'copys' : copys,
        'texts' : texts
    });
}