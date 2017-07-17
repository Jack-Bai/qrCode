$(function() {

	btnClick();

});

//按钮点击事件
function btnClick() {
	$("#btn").click(function() {

		$("#ma").empty();

		var str = $("#text").val().trim();

		//第一步：先处理得到的数据（拼接成字符串并转换格式）
			var str1 = toUtf8(str);

			//生成二维码
			getQrcode1(str1);
		});
}

//生成最基础的二维码（canvas格式）
function getQrcode(str) {

	$("#ma").qrcode("I LOVE YOU");

}

//此方法能够控制生成的二维码的属性
function getQrcode1(str) {

$("#ma").qrcode( {
		render : "table",//规定生成的二维码的格式table(还有一种是canvas[默认的格式])
		width : 150,//宽度
		height : 150,//高度
		text : str//文本内容
	});
}


//此方法能够控制生成二维码的背景和前景
function getQrcode1(str) {

	$("#ma").qrcode( {
		render : "png",//规定生成的二维码的格式table(还有一种是canvas[默认的格式])
		width : 300,//宽度
		height : 300,//高度
		text : str,//文本内容
		background: "#ffffff",//背景颜色    
		foreground: "#000000" //前景颜色 
	});
}

//此方法用于处理中文乱码问题
//在生成二维码前就要把字符串转换成UTF-8，然后再生成二维码
function toUtf8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		} else if (c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		} else {
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
	}
	return out;
}
