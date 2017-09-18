
$(function(){
	//宽度设置
	if($(window).width()<1250){
		$("#JH_wrap").addClass("wrapper");
	}
	if($(window).width()>1250){
		$("#JH_wrap").removeClass("wrapper");
	}

	$(window).resize(function(){
		if($(window).width()<1250){
			$("#JH_wrap").addClass("wrapper");
		}
		if($(window).width()>1250){
			$("#JH_wrap").removeClass("wrapper");
		}
	});
	//鼠标经过显示提示
	var overtime = [];
	var outtime = [];
	$("#head .content li").each(function(index){
		$(this).hover(
			//鼠标经过
			function(){
				 var _self = $(this);
                // 停止卷起事件
                clearTimeout(outtime[index]);
                // 当鼠标进入超过 0.2 秒, 展开菜单, 并记录到线程 ID 中
                overtime[index] = setTimeout(function() {
                    _self.find(".tip").animate({width:'50%',opacity:'1'},"fast");
                }, 201);
			},
			//鼠标移出
			function(){
				var _self = $(this);
                // 停止展开事件
                clearTimeout(overtime[index]);
                // 当鼠标离开超过 0.2 秒, 卷起菜单, 并记录到线程 ID 中
                outtime[index] = setTimeout(function() {
                    _self.find(".tip").animate({width:'0',opacity:'0'},"fast");
                }, 201);
			}
		);
	});
	var overtime2 = [];
	var outtime2 = [];
	$("a.f_mobile").each(function(index){
		$(this).hover(
			//鼠标经过
			function(){
				 var _self = $(this);
                // 停止卷起事件
                clearTimeout(outtime2[index]);
                // 当鼠标进入超过 0.2 秒, 展开菜单, 并记录到线程 ID 中
                overtime2[index] = setTimeout(function() {
                    _self.find("em").slideDown(200);
                }, 201);
			},
			//鼠标移出
			function(){
				var _self = $(this);
                // 停止展开事件
                clearTimeout(overtime2[index]);
                // 当鼠标离开超过 0.2 秒, 卷起菜单, 并记录到线程 ID 中
                outtime2[index] = setTimeout(function() {
                    _self.find("em").slideUp(200);
                }, 201);
			}
		);
	});
});