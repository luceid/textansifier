// Text ANSIfier modified from the original Text Colorizer by David at stuffbydavid.com, 2011
// I don't take much credit for this other than changing the output from ansicode to pennMUSH-friendly ANSI code.

function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function rgbToHex(R,G,B) {return xterm2hex(rgb2xterm(R,G,B))}
function toHex(n) {
    n = parseInt(n,10);
    if (isNaN(n)) return "00";
    n = Math.max(0,Math.min(n,255));
    return "0123456789ABCDEF".charAt((n-n%16)/16)
    + "0123456789ABCDEF".charAt(n%16);
}
input_effect=""
input_color1=""
input_color2=""
input_color3=""
input_color4=""
input_color5=""
input_color6=""
input_color7=""
input_color8=""
input_text=""
input_centred=0
input_colorword=0
random_length=0;
update=0
var CLUT = {
  '000000': '00',
  '800000': '01',
  '008000': '02',
  '808000': '03',
  '000080': '04',
  '800080': '05',
  '008080': '06',
  'c0c0c0': '07',
  '808080': '08',
  'ff0000': '09',
  '00ff00': '10',
  'ffff00': '11',
  '0000ff': '12',
  'ff00ff': '13',
  '00ffff': '14',
  'ffffff': '15',
  '000000': '16',
  '00005f': '17',
  '000087': '18',
  '0000af': '19',
  '0000d7': '20',
  '0000ff': '21',
  '005f00': '22',
  '005f5f': '23',
  '005f87': '24',
  '005faf': '25',
  '005fd7': '26',
  '005fff': '27',
  '008700': '28',
  '00875f': '29',
  '008787': '30',
  '0087af': '31',
  '0087d7': '32',
  '0087ff': '33',
  '00af00': '34',
  '00af5f': '35',
  '00af87': '36',
  '00afaf': '37',
  '00afd7': '38',
  '00afff': '39',
  '00d700': '40',
  '00d75f': '41',
  '00d787': '42',
  '00d7af': '43',
  '00d7d7': '44',
  '00d7ff': '45',
  '00ff00': '46',
  '00ff5f': '47',
  '00ff87': '48',
  '00ffaf': '49',
  '00ffd7': '50',
  '00ffff': '51',
  '5f0000': '52',
  '5f005f': '53',
  '5f0087': '54',
  '5f00af': '55',
  '5f00d7': '56',
  '5f00ff': '57',
  '5f5f00': '58',
  '5f5f5f': '59',
  '5f5f87': '60',
  '5f5faf': '61',
  '5f5fd7': '62',
  '5f5fff': '63',
  '5f8700': '64',
  '5f875f': '65',
  '5f8787': '66',
  '5f87af': '67',
  '5f87d7': '68',
  '5f87ff': '69',
  '5faf00': '70',
  '5faf5f': '71',
  '5faf87': '72',
  '5fafaf': '73',
  '5fafd7': '74',
  '5fafff': '75',
  '5fd700': '76',
  '5fd75f': '77',
  '5fd787': '78',
  '5fd7af': '79',
  '5fd7d7': '80',
  '5fd7ff': '81',
  '5fff00': '82',
  '5fff5f': '83',
  '5fff87': '84',
  '5fffaf': '85',
  '5fffd7': '86',
  '5fffff': '87',
  '870000': '88',
  '87005f': '89',
  '870087': '90',
  '8700af': '91',
  '8700d7': '92',
  '8700ff': '93',
  '875f00': '94',
  '875f5f': '95',
  '875f87': '96',
  '875faf': '97',
  '875fd7': '98',
  '875fff': '99',
  '878700': '100',
  '87875f': '101',
  '878787': '102',
  '8787af': '103',
  '8787d7': '104',
  '8787ff': '105',
  '87af00': '106',
  '87af5f': '107',
  '87af87': '108',
  '87afaf': '109',
  '87afd7': '110',
  '87afff': '111',
  '87d700': '112',
  '87d75f': '113',
  '87d787': '114',
  '87d7af': '115',
  '87d7d7': '116',
  '87d7ff': '117',
  '87ff00': '118',
  '87ff5f': '119',
  '87ff87': '120',
  '87ffaf': '121',
  '87ffd7': '122',
  '87ffff': '123',
  'af0000': '124',
  'af005f': '125',
  'af0087': '126',
  'af00af': '127',
  'af00d7': '128',
  'af00ff': '129',
  'af5f00': '130',
  'af5f5f': '131',
  'af5f87': '132',
  'af5faf': '133',
  'af5fd7': '134',
  'af5fff': '135',
  'af8700': '136',
  'af875f': '137',
  'af8787': '138',
  'af87af': '139',
  'af87d7': '140',
  'af87ff': '141',
  'afaf00': '142',
  'afaf5f': '143',
  'afaf87': '144',
  'afafaf': '145',
  'afafd7': '146',
  'afafff': '147',
  'afd700': '148',
  'afd75f': '149',
  'afd787': '150',
  'afd7af': '151',
  'afd7d7': '152',
  'afd7ff': '153',
  'afff00': '154',
  'afff5f': '155',
  'afff87': '156',
  'afffaf': '157',
  'afffd7': '158',
  'afffff': '159',
  'd70000': '160',
  'd7005f': '161',
  'd70087': '162',
  'd700af': '163',
  'd700d7': '164',
  'd700ff': '165',
  'd75f00': '166',
  'd75f5f': '167',
  'd75f87': '168',
  'd75faf': '169',
  'd75fd7': '170',
  'd75fff': '171',
  'd78700': '172',
  'd7875f': '173',
  'd78787': '174',
  'd787af': '175',
  'd787d7': '176',
  'd787ff': '177',
  'd7af00': '178',
  'd7af5f': '179',
  'd7af87': '180',
  'd7afaf': '181',
  'd7afd7': '182',
  'd7afff': '183',
  'd7d700': '184',
  'd7d75f': '185',
  'd7d787': '186',
  'd7d7af': '187',
  'd7d7d7': '188',
  'd7d7ff': '189',
  'd7ff00': '190',
  'd7ff5f': '191',
  'd7ff87': '192',
  'd7ffaf': '193',
  'd7ffd7': '194',
  'd7ffff': '195',
  'ff0000': '196',
  'ff005f': '197',
  'ff0087': '198',
  'ff00af': '199',
  'ff00d7': '200',
  'ff00ff': '201',
  'ff5f00': '202',
  'ff5f5f': '203',
  'ff5f87': '204',
  'ff5faf': '205',
  'ff5fd7': '206',
  'ff5fff': '207',
  'ff8700': '208',
  'ff875f': '209',
  'ff8787': '210',
  'ff87af': '211',
  'ff87d7': '212',
  'ff87ff': '213',
  'ffaf00': '214',
  'ffaf5f': '215',
  'ffaf87': '216',
  'ffafaf': '217',
  'ffafd7': '218',
  'ffafff': '219',
  'ffd700': '220',
  'ffd75f': '221',
  'ffd787': '222',
  'ffd7af': '223',
  'ffd7d7': '224',
  'ffd7ff': '225',
  'ffff00': '226',
  'ffff5f': '227',
  'ffff87': '228',
  'ffffaf': '229',
  'ffffd7': '230',
  'ffffff': '231',
  '080808': '232',
  '121212': '233',
  '1c1c1c': '234',
  '262626': '235',
  '303030': '236',
  '3a3a3a': '237',
  '444444': '238',
  '4e4e4e': '239',
  '585858': '240',
  '626262': '241',
  '6c6c6c': '242',
  '767676': '243',
  '808080': '244',
  '8a8a8a': '245',
  '949494': '246',
  '9e9e9e': '247',
  'a8a8a8': '248',
  'b2b2b2': '249',
  'bcbcbc': '250',
  'c6c6c6': '251',
  'd0d0d0': '252',
  'dadada': '253',
  'e4e4e4': '254',
  'eeeeee': '255'
};

var strip_hash = function(color) {
  return color.toString().replace('#', '');
};

var strip_hash = function(color) {
  return color.toString().replace('#', '');
};

var hex2xterm = function(color) {
  color = strip_hash(color);
  return rgb2xterm(
    parseInt(color.charAt(0) + color.charAt(1), 16),
    parseInt(color.charAt(2) + color.charAt(3), 16),
    parseInt(color.charAt(4) + color.charAt(5), 16)
  );
};

var rgb2xterm = function(r, g, b) {
    console.log('Starting rgb2xterm: ' + r + ', ' + g + ', ' + b);
    r = Math.max(0,Math.min(r,255));
    g = Math.max(0,Math.min(g,255));
    b = Math.max(0,Math.min(b,255));
    var incs = [0x00, 0x5f, 0x87, 0xaf, 0xd7, 0xff];
    var res = [];

  [r, g, b].forEach(function(part){
    var i = 0;
    var closest = 0;
    while (i < incs.length-1) {
      var s = incs[i];
      var b = incs[i+1];
      if ((s <= part) && (part <= b)) {
        var s1 = Math.abs(s - part);
        var b1 = Math.abs(b - part);
        if (s1 < b1) {
          closest = s;
        } else {
          closest = b;
        }
        res.push(closest);
        break;
      }
      i++;
    }
  });
  var returnValue = CLUT[res.map(function(el){
    var newNumber = el.toString(16);
    if (newNumber.length < 2) {
      newNumber = 0 + newNumber;
    }
    console.log('New Number: ' + newNumber); 
    return newNumber;
  }).join('')];

  console.log('Return Value: ' + returnValue);
  console.log('End rgb2xterm');
  return returnValue;
};

var xterm2hex = function(xterm) {
    var CLUT_REVERSE = {
        '00':  '000000',
        '01':  '800000',
        '02':  '008000',
        '03':  '808000',
        '04':  '000080',
        '05':  '800080',
        '06':  '008080',
        '07':  'c0c0c0',
        '08':  '808080',
        '09':  'ff0000',
        '10':  '00ff00',
        '11':  'ffff00',
        '12':  '0000ff',
        '13':  'ff00ff',
        '14':  '00ffff',
        '15':  'ffffff',
        '16':  '000000',
        '17':  '00005f',
        '18':  '000087',
        '19':  '0000af',
        '20':  '0000d7',
        '21':  '0000ff',
        '22':  '005f00',
        '23':  '005f5f',
        '24':  '005f87',
        '25':  '005faf',
        '26':  '005fd7',
        '27':  '005fff',
        '28':  '008700',
        '29':  '00875f',
        '30':  '008787',
        '31':  '0087af',
        '32':  '0087d7',
        '33':  '0087ff',
        '34':  '00af00',
        '35':  '00af5f',
        '36':  '00af87',
        '37':  '00afaf',
        '38':  '00afd7',
        '39':  '00afff',
        '40':  '00d700',
        '41':  '00d75f',
        '42':  '00d787',
        '43':  '00d7af',
        '44':  '00d7d7',
        '45':  '00d7ff',
        '46':  '00ff00',
        '47':  '00ff5f',
        '48':  '00ff87',
        '49':  '00ffaf',
        '50':  '00ffd7',
        '51':  '00ffff',
        '52':  '5f0000',
        '53':  '5f005f',
        '54':  '5f0087',
        '55':  '5f00af',
        '56':  '5f00d7',
        '57':  '5f00ff',
        '58':  '5f5f00',
        '59':  '5f5f5f',
        '60':  '5f5f87',
        '61':  '5f5faf',
        '62':  '5f5fd7',
        '63':  '5f5fff',
        '64':  '5f8700',
        '65':  '5f875f',
        '66':  '5f8787',
        '67':  '5f87af',
        '68':  '5f87d7',
        '69':  '5f87ff',
        '70':  '5faf00',
        '71':  '5faf5f',
        '72':  '5faf87',
        '73':  '5fafaf',
        '74':  '5fafd7',
        '75':  '5fafff',
        '76':  '5fd700',
        '77':  '5fd75f',
        '78':  '5fd787',
        '79':  '5fd7af',
        '80':  '5fd7d7',
        '81':  '5fd7ff',
        '82':  '5fff00',
        '83':  '5fff5f',
        '84':  '5fff87',
        '85':  '5fffaf',
        '86':  '5fffd7',
        '87':  '5fffff',
        '88':  '870000',
        '89':  '87005f',
        '90':  '870087',
        '91':  '8700af',
        '92':  '8700d7',
        '93':  '8700ff',
        '94':  '875f00',
        '95':  '875f5f',
        '96':  '875f87',
        '97':  '875faf',
        '98':  '875fd7',
        '99':  '875fff',
        '100':  '878700',
        '101':  '87875f',
        '102':  '878787',
        '103':  '8787af',
        '104':  '8787d7',
        '105':  '8787ff',
        '106':  '87af00',
        '107':  '87af5f',
        '108':  '87af87',
        '109':  '87afaf',
        '110':  '87afd7',
        '111':  '87afff',
        '112':  '87d700',
        '113':  '87d75f',
        '114':  '87d787',
        '115':  '87d7af',
        '116':  '87d7d7',
        '117':  '87d7ff',
        '118':  '87ff00',
        '119':  '87ff5f',
        '120':  '87ff87',
        '121':  '87ffaf',
        '122':  '87ffd7',
        '123':  '87ffff',
        '124':  'af0000',
        '125':  'af005f',
        '126':  'af0087',
        '127':  'af00af',
        '128':  'af00d7',
        '129':  'af00ff',
        '130':  'af5f00',
        '131':  'af5f5f',
        '132':  'af5f87',
        '133':  'af5faf',
        '134':  'af5fd7',
        '135':  'af5fff',
        '136':  'af8700',
        '137':  'af875f',
        '138':  'af8787',
        '139':  'af87af',
        '140':  'af87d7',
        '141':  'af87ff',
        '142':  'afaf00',
        '143':  'afaf5f',
        '144':  'afaf87',
        '145':  'afafaf',
        '146':  'afafd7',
        '147':  'afafff',
        '148':  'afd700',
        '149':  'afd75f',
        '150':  'afd787',
        '151':  'afd7af',
        '152':  'afd7d7',
        '153':  'afd7ff',
        '154':  'afff00',
        '155':  'afff5f',
        '156':  'afff87',
        '157':  'afffaf',
        '158':  'afffd7',
        '159':  'afffff',
        '160':  'd70000',
        '161':  'd7005f',
        '162':  'd70087',
        '163':  'd700af',
        '164':  'd700d7',
        '165':  'd700ff',
        '166':  'd75f00',
        '167':  'd75f5f',
        '168':  'd75f87',
        '169':  'd75faf',
        '170':  'd75fd7',
        '171':  'd75fff',
        '172':  'd78700',
        '173':  'd7875f',
        '174':  'd78787',
        '175':  'd787af',
        '176':  'd787d7',
        '177':  'd787ff',
        '178':  'd7af00',
        '179':  'd7af5f',
        '180':  'd7af87',
        '181':  'd7afaf',
        '182':  'd7afd7',
        '183':  'd7afff',
        '184':  'd7d700',
        '185':  'd7d75f',
        '186':  'd7d787',
        '187':  'd7d7af',
        '188':  'd7d7d7',
        '189':  'd7d7ff',
        '190':  'd7ff00',
        '191':  'd7ff5f',
        '192':  'd7ff87',
        '193':  'd7ffaf',
        '194':  'd7ffd7',
        '195':  'd7ffff',
        '196':  'ff0000',
        '197':  'ff005f',
        '198':  'ff0087',
        '199':  'ff00af',
        '200':  'ff00d7',
        '201':  'ff00ff',
        '202':  'ff5f00',
        '203':  'ff5f5f',
        '204':  'ff5f87',
        '205':  'ff5faf',
        '206':  'ff5fd7',
        '207':  'ff5fff',
        '208':  'ff8700',
        '209':  'ff875f',
        '210':  'ff8787',
        '211':  'ff87af',
        '212':  'ff87d7',
        '213':  'ff87ff',
        '214':  'ffaf00',
        '215':  'ffaf5f',
        '216':  'ffaf87',
        '217':  'ffafaf',
        '218':  'ffafd7',
        '219':  'ffafff',
        '220':  'ffd700',
        '221':  'ffd75f',
        '222':  'ffd787',
        '223':  'ffd7af',
        '224':  'ffd7d7',
        '225':  'ffd7ff',
        '226':  'ffff00',
        '227':  'ffff5f',
        '228':  'ffff87',
        '229':  'ffffaf',
        '230':  'ffffd7',
        '231':  'ffffff',
        '232':  '080808',
        '233':  '121212',
        '234':  '1c1c1c',
        '235':  '262626',
        '236':  '303030',
        '237':  '3a3a3a',
        '238':  '444444',
        '239':  '4e4e4e',
        '240':  '585858',
        '241':  '626262',
        '242':  '6c6c6c',
        '243':  '767676',
        '244':  '808080',
        '245':  '8a8a8a',
        '246':  '949494',
        '247':  '9e9e9e',
        '248':  'a8a8a8',
        '249':  'b2b2b2',
        '250':  'bcbcbc',
        '251':  'c6c6c6',
        '252':  'd0d0d0',
        '253':  'dadada',
        '254':  'e4e4e4',
        '255':  'eeeeee'};
    return CLUT_REVERSE[xterm];
};

//module.exports = {
//  rgb2xterm: rgb2xterm,
//  hex2xterm: hex2xterm
//};

//var random_char=new Array();
//function randomize_colors() {
//    var length=document.getElementById("input_text").value.length;
//    var a;
//    for (a=0; a<length; a+=1) {
//        random_char[a]=rgbToHex(Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256))
//    }
//    random_length=length;
//    update=1
//}
function textcolorizer_handle() {

    if (input_effect!=document.getElementById("input_effect").value) {
        document.getElementById("color_select1").style.visibility="hidden";
        document.getElementById("color_select2").style.visibility="hidden";
        document.getElementById("color_select3").style.visibility="hidden";
        document.getElementById("color_select4").style.visibility="hidden";
        //document.getElementById("color_select5").style.visibility="hidden";
        //document.getElementById("color_select6").style.visibility="hidden";
        document.getElementById("color_select"+document.getElementById("input_effect").value).style.visibility="visible";
        update=1;
    }
    input_effect=document.getElementById("input_effect").value;

    if (input_color1!=document.getElementById("input_color1").value) {update=1;}
    input_color1=document.getElementById("input_color1").value;

    if (input_color2!=document.getElementById("input_color2").value) {update=1;}
    input_color2=document.getElementById("input_color2").value;

    if (input_color3!=document.getElementById("input_color3").value) {update=1;}
    input_color3=document.getElementById("input_color3").value;

    if (input_color4!=document.getElementById("input_color4").value) {update=1;}
    input_color4=document.getElementById("input_color4").value;

    if (input_color5!=document.getElementById("input_color5").value) {update=1;}
    input_color5=document.getElementById("input_color5").value;

    if (input_color6!=document.getElementById("input_color6").value) {update=1;}
    input_color6=document.getElementById("input_color6").value;

    if (input_color7!=document.getElementById("input_color7").value) {update=1;}
    input_color7=document.getElementById("input_color7").value;

    if (input_color8!=document.getElementById("input_color8").value) {update=1;}
    input_color8=document.getElementById("input_color8").value;

    if (input_text!=document.getElementById("input_text").value) {update=1;}
    input_text=document.getElementById("input_text").value;
	
    if (input_colorword!=document.getElementById("input_colorword").checked) {update=1;}
    input_colorword=document.getElementById("input_colorword").checked;
	
    //Horizontal Gradient
    if (update==1) {
        update=0;
        str_html="";
        str_ansicode="";
        var str_ansicodeend="";
        str_style="";
        if (str_style!="") str_html+="<span style='"+str_style+"'>";
        var a,r,g,b,rinc,ginc,binc,ccol;
        if (input_effect=="1") {
            r=hexToR(input_color1)
            g=hexToG(input_color1)
            b=hexToB(input_color1)
            rinc=(hexToR(input_color2)-r)/((input_text.length))
            ginc=(hexToG(input_color2)-g)/((input_text.length))
            binc=(hexToB(input_color2)-b)/((input_text.length))
            for (a=0; a<input_text.length; a++) {
                ccol=rgbToHex(r,g,b);
                if (input_text.charAt(a)==" ") {
                    str_html+=" ";
                    str_ansicode+=" ";
                } else {
                    str_html+="<span style='color:#"+ccol+";'>"+input_text.charAt(a)+"</span>";
                    str_ansicode+='[ansi(#'+ccol+','+input_text.charAt(a).replace(/,/g, '%,')+")]";
                }
                r+=rinc;
                g+=ginc;
                b+=binc;
            }
        //Middle Gradient
        } else if (input_effect=="2") {
            r=hexToR(input_color3)
            g=hexToG(input_color3)
            b=hexToB(input_color3)
            rinc=(hexToR(input_color4)-r)/Math.floor(input_text.length/2)
            ginc=(hexToG(input_color4)-g)/Math.floor(input_text.length/2)
            binc=(hexToB(input_color4)-b)/Math.floor(input_text.length/2)
            for (a=0; a<input_text.length; a++) {
                ccol=rgbToHex(r,g,b);
                if (input_text.charAt(a)==" ") {
                    str_html+=" ";
                    str_ansicode+=" ";
                } else {
                    str_html+="<span style='color:#"+ccol+";'>"+input_text.charAt(a)+"</span>";
                    str_ansicode+='[ansi(#'+ccol+','+input_text.charAt(a).replace(/,/g, '%,')+")]";
                }
                if (a<Math.floor(input_text.length/2)) {
                    r+=rinc;
                    g+=ginc;
                    b+=binc;
                } else {
                    r-=rinc;
                    g-=ginc;
                    b-=binc;
                }
            }
        //Three-Color Gradient
        } else if (input_effect=="3") {
            r=hexToR(input_color5)
            g=hexToG(input_color5)
            b=hexToB(input_color5)
            rinc=(hexToR(input_color6)-r)/Math.floor(input_text.length/2)
            ginc=(hexToG(input_color6)-g)/Math.floor(input_text.length/2)
            binc=(hexToB(input_color6)-b)/Math.floor(input_text.length/2)
            var r2,g2,b2,rinc2,ginc2,binc2;
            r2=hexToR(input_color6)
            g2=hexToG(input_color6)
            b2=hexToB(input_color6)
            rinc2=(hexToR(input_color7)-r2)/Math.floor(input_text.length/2)
            ginc2=(hexToG(input_color7)-g2)/Math.floor(input_text.length/2)
            binc2=(hexToB(input_color7)-b2)/Math.floor(input_text.length/2)
            for (a=0; a<input_text.length; a++) {
                ccol=rgbToHex(r,g,b);
                if (input_text.charAt(a)==" ") {
                    str_html+=" ";
                    str_ansicode+=" ";
                } else {
                    str_html+="<span style='color:#"+ccol+";'>"+input_text.charAt(a)+"</span>";
                    str_ansicode+='[ansi(#'+ccol+','+input_text.charAt(a).replace(/,/g, '%,')+")]";
                }
                if (a<Math.floor(input_text.length/2)) {
                    r+=rinc;
                    g+=ginc;
                    b+=binc;
                } else {
                    r+=rinc2;
                    g+=ginc2;
                    b+=binc2;
                }
            }
        //Solid Single Color
        } else if (input_effect=="4") {
            str_html+="<span style='color:"+input_color8+";'>"+input_text+"</span>"
            str_ansicode+='[ansi('+input_color8+','+input_text+")]";
        } else if (input_effect=="5") {
            var i=0;
            for (a=0; a<input_text.length; a++) {
                ccol=random_char[i];
                if (input_colorword==0) i++;
                if (input_colorword==1 && input_text.charAt(a)==" ") i++;
                if (a>=random_length) {
                    str_html+=input_text.charAt(a)
                    str_ansicode+=input_text.charAt(a)
                } else {
                    if (input_colorword==0) {
                        if (input_text.charAt(a)==" ") {
                            str_html+=" ";
                            str_ansicode+=" ";
                        } else {
                            str_html+="<span style='color:#"+ccol+";'>"+input_text.charAt(a)+"</span>";
                            str_ansicode+='[ansi(#'+ccol+','+input_text.charAt(a).replace(/,/g, '%,')+")]";
                        }
                    } else {
                        if (a==0 || input_text.charAt(a-1)==" ") {
                            str_html+="<span style='color:#"+ccol+";'>"+input_text.charAt(a);
                            str_ansicode+='[ansi(#'+ccol+','+input_text.charAt(a);
                        } else if (a==input_text.length-1 || input_text.charAt(a)==" ") {
                            str_html+=input_text.charAt(a)+"</span>";
                            str_ansicode+=input_text.charAt(a)+')]';
                        } else {
                            str_html+=input_text.charAt(a);
                            str_ansicode+=input_text.charAt(a);
                        }
                    }
                }
            }
        } else if (input_effect=="6") {
            var i,s,p;
            for (a=0; a<input_text.length; a++) {
                i=a/input_text.length;
                s=1/6
                p=(i%s)/s
                if (i>=s*0) ccol=rgbToHex(255,255*p,0);
                if (i>=s*1) ccol=rgbToHex(255*(1-p),255,0);
                if (i>=s*2) ccol=rgbToHex(0,255,255*p);
                if (i>=s*3) ccol=rgbToHex(0,255*(1-p),255);
                if (i>=s*4) ccol=rgbToHex(255*p,0,255);
                if (i>=s*5) ccol=rgbToHex(255,0,255*(1-p));
                if (input_text.charAt(a)==" ") {
                    str_html+=" ";
                    str_ansicode+=" ";
                } else {
                    str_html+="<span style='color:#"+ccol+";'>"+input_text.charAt(a)+"</span>";
                    str_ansicode+='[ansi(#'+ccol+','+input_text.charAt(a).replace(/,/g, '%,')+")]";
                }
            }
        }
        if (str_style!="") {str_html+="</span>"}
        document.getElementById("div_preview").innerHTML="<span style='font-size:16px;font-family: FixedSys;background-color:black'>"+str_html+"</span>";
        document.getElementById("output_ansicode").value=str_ansicode+str_ansicodeend;
        document.getElementById("output_html").value=str_html;
    }
    setTimeout(textcolorizer_handle,50)
}
