(function(){
/*aside*/

	var $aside=$('#id_aside');
	var $logo=$('#id_logo');
	var $openAside=$('#id_openAside');
	var $openP=$('#id_openP');
	var $openLi=$('#id_ul').find('li');
	var $search=$('#id_search');
	var $hr=$('#id_hr');
	var sign=1;
	$openAside.on('click',function(){
		switch(sign){
			case 0:
				closePage();
				sign=1;
				break;
			case 1:
				openPage();
				sign=0;
				break;
		}
	});
	function closePage(){
		$aside.removeClass('g-aside-open').animate({width:"400px"}).addClass('g-aside-close');
		$logo.removeClass('m-openLogo').addClass('m-closeLogo');
		$openP.removeClass('m-content-open').addClass('m-content-close');
		$openLi.removeClass('m-openLi').addClass('m-closeLi');
		$search.removeClass('f-dn');
		$hr.removeClass('f-dn');
	}
	function openPage(){
		$aside.removeClass('g-aside-close').animate({width:"100%"}).addClass('g-aside-open');
		$logo.removeClass('m-closeLogo').addClass('m-openLogo');
		$openP.removeClass('m-content-close').addClass('m-content-open');
		$openLi.removeClass('m-closeLi').addClass('m-openLi');
		$search.addClass('f-dn');
		$hr.addClass('f-dn');
	}
/*main*/
	var $lis=$('#id_gallery li');
	var $taglist=$('#id_taglist');
	var tagged={};
	
	$lis.each(function() {
        var li=this;
		var tags=$(this).data('tags');
		
		if(tags){
			tags.trim().split(',').forEach(function(tagName){
				if(tagged[tagName]==null){
					tagged[tagName]=[];	
				}
				tagged[tagName].push(li);
			});
		}
		
    });
	
	$('<span/>',{
		text:'ShOWALL',
		id:'SHOWALL',
		class:'active m-tags m-tags-click',
		hover:function(){
				$(this)
				.addClass('m-tags-hover')
				.siblings()
				.removeClass('m-tags-hover');
			},
		mouseout:function(){
			$(this)
			.removeClass('m-tags-hover');
		},
		click:function(){
			$(this)
			.addClass('active m-tags-click')
			.siblings()
			.removeClass('active m-tags-click');
			$lis.show();
		}
	}).appendTo($taglist);
	
	$.each(tagged,function(tagName){
		$('<span/>',{
			text:tagName+'('+tagged[tagName].length+')',
			class:'m-tags',
			id:tagName,
			hover:function(){
				$(this)
				.addClass('m-tags-hover')
				.siblings()
				.removeClass('m-tags-hover');;
			},
			mouseout:function(){
			$(this)
			.removeClass('m-tags-hover');
			},
			click:function(){
				$(this)
				.addClass('active m-tags-click')
				.siblings()
				.removeClass('active m-tags-click');
				$lis
				.hide()
				.filter(tagged[tagName])
				.show();
			}
		}).appendTo($taglist);
	});

/*实时搜索*/
	var $search=$('#id_filter');
	function filter(){
		var query=this.value.trim().toUpperCase();
		$.each(tagged,function(tagName){
			var index;
			if (query) {
				index=tagName.indexOf(query);
			}else{
				$lis
				.show();
			}
			if(index>-1){
				$lis
				.hide()
				.filter(tagged[tagName])
				.show();
			}
		});
	}

	$search.on('input',filter);

/*小图标运动*/
var $contag=$('#id_contag');
var sign_1=0;
$contag.on('click',function(){
	switch(sign_1){
		case 0:
			fadein();
			sign_1=1;
			break;
		case 1:
			fadeout();	
			sign_1=0;
			break;
	}
});

function fadeout(){
	$('#SHOWALL').fadeOut(500);
	$('#HTML').fadeOut(400);
	$('#CSS').fadeOut(300);
	$('#JAVASCRIPT').fadeOut(200);	
}

function fadein(){
	$('#SHOWALL').fadeIn(100);
	$('#HTML').fadeIn(300);	
	$('#CSS').fadeIn(500);	
	$('#JAVASCRIPT').fadeIn(700);	
}

	/*project*/


	var $projecttitle=$('.m-projecttitle');
	var $projecttime=$('.m-projecttime');
	var $projectmark=$('.m-projectmark');

	$projecttitle.each(function(){
		var asd=$(this);
		$(this).on('mouseover',function(){
			addmark(asd);
		});
		$(this).on('mouseout',function(){
			removemark(asd);
		});
	});

	$projecttime.each(function(){
		var asd=$(this);
		$(this).on('mouseover',function(){
			addmark(asd);
		});
		$(this).on('mouseout',function(){
			removemark(asd);
		});
	});

	function addmark(att){
		$projectmark.each(function(){
			att.siblings('.m-projectmark').addClass('m-projectmark-hover');
		});
	}
	
	function removemark(atd){
		$projectmark.each(function(){
			atd.siblings('.m-projectmark').removeClass('m-projectmark-hover');
		});
	}


}());