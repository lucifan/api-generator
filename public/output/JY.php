<?php
    $a_name = trim(mb_convert_encoding($data->a_name, "UTF-8", "auto"));
    $im = imagecreatefromundefined('http://m2.dwstatic.com/huodong/shouji3/201606/806/53/3dde7da226e1aca724ed30904e17c0aa.jpg');
    ImageTTFText($im,21,12,232,128,ImageColorAllocate($im,69,186,206),'font/HeiTi.ttf',$name);
    ImageTTFText($im,21,46,345,350,ImageColorAllocate($im,69,186,206),'font/HeiTi.ttf',$a_name);
    ImageTTFText($im,21,12,232,128,ImageColorAllocate($im,69,186,206),'font/HeiTi.ttf',$name);
    $savename = $type.$md5_name.$log_date.'.png';
    $savefile = $save_path.$savename;
    imagepng($im,$savefile);
    imagedestroy($im);
    exit(json_encode(array('code'=>1,'name'=>$name.'','key'=>$save_path.$savename,'url'=>$serverHost.$save_path.$savename)));
<?php
    $a_name = trim(mb_convert_encoding($data->a_name, "UTF-8", "auto"));
    $im = imagecreatefromundefined('http://m2.dwstatic.com/huodong/shouji3/201606/806/53/3dde7da226e1aca724ed30904e17c0aa.jpg');
    ImageTTFText($im,21,12,232,128,ImageColorAllocate($im,69,186,206),'font/HeiTi.ttf',$name);
    ImageTTFText($im,21,46,345,350,ImageColorAllocate($im,69,186,206),'font/HeiTi.ttf',$a_name);
    $savename = $type.$md5_name.$log_date.'.png';
    $savefile = $save_path.$savename;
    imagepng($im,$savefile);
    imagedestroy($im);
    exit(json_encode(array('code'=>1,'name'=>$name.'脚印','key'=>$save_path.$savename,'url'=>$serverHost.$save_path.$savename)));
