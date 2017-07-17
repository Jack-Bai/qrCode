
function init_pullToInfo(data){
	
	if(!(wrapper instanceof iScroll)) {
		refresher.init({
		id:"wrapper",//<------------------------------------------------------------------------------------┐
		pullDownAction:Refresh,                                                            
		pullUpAction:Load 																			
		});
		function Refresh() {																
			setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
				var el, li, i;																		
				//这里写你的刷新代码				
				//document.getElementById("wrapper").querySelector(".pullDownIcon").style.display="none";		
				//document.getElementById("wrapper").querySelector(".pullDownLabel").innerHTML="<img src='" + app.base + "/static/themes/default/js/wx/icon/ok.png'/>刷新成功";																					 
				
				setTimeout(function () {
					nextPage(true, true, data);
					//wrapper.refresh();
					//document.getElementById("wrapper").querySelector(".pullDownLabel").innerHTML="";								
					},1000);//模拟qq下拉刷新显示成功效果
				/****remember to refresh after  action completed！ ---yourId.refresh(); ----| ****/
			}, 1000);
		}
		function Load() {
			setTimeout(function () {// <-- Simulate network congestion, remove setTimeout from production!
				nextPage(false, false, data);
				//wrapper.refresh();/****remember to refresh after action completed！！！   ---id.refresh(); --- ****/
			},2000);	
		}
		setTimeout(function () {
			wrapper.refresh();
		},1000);
	}
	nextPage(true, true, data);	
}

function nextPage(reload, isPulldown, data) {
	var $currentPage = $('input[name=currentPage]');
	var currentPage = Number($currentPage.val())+1;
	if(currentPage > 10){	//只取10次数据
		refresher.info.pullUpLable = '没有更多数据';
		wrapper.refresh();
		return;
	}
	if (reload) {
		if (isPulldown) {
		   	var pullUpEle = document.getElementById("wrapper").querySelector(".pullUp");		
		   	pullUpEle.classList.add("loading");
			pullUpEle.classList.remove("flip");
			pullUpEle.querySelector('.pullUpLabel').innerHTML = refresher.info.loadingLable;
		}
		currentPage = 1;
	}
	$currentPage.val(currentPage);
	var sdata={};
	sdata["currentPage"] = currentPage;
	for(var idx in data["inputNames"]){
		var name = data["inputNames"][idx];
		sdata[name] = $('input[name='+name+']').val();
	}
	
	$.ajax({
		type: "POST",
		url: data["url"]+(data["urlSuffix"]?$('input[name='+data["urlSuffix"]+']').val():''),
		dataType: 'json',
		data: sdata,
		success: function(result){
			var pageInfo = data.cb_func.apply(null, [result, reload].concat(data.cb_funcArg));
			//var pageInfo = data.cb_func(result, reload, data.id);
			var pageCount = pageInfo.pageCount;
			if (currentPage >= pageCount)
				refresher.info.pullUpLable = '没有更多数据';
			else
				refresher.info.pullUpLable = '上拉加载更多';
			wrapper.refresh();
		}
	});
}