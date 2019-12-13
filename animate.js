

function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}

var box=document.getElementById("box");
var NavList=document.getElementById("nav").children;
var slider=document.getElementById("slider");
var left=document.getElementById("left");
var right=document.getElementById("right");
var adv1=document.getElementById("adv1");
var index=1;
var isMoving=false;
var distance = 750;
//最上面移动的文字，左边移过去的部分隐藏 ,定期执行
setInterval(function(){
    adv1.style.left = distance + "px";
    distance--;
    if(distance<-350){
        distance=750;
    }
}, 10);

function next(){
	if(isMoving){
		return;
	}
	isMoving=true;
	index++;         //这句话必须在navChange();
	navChange();
	animate(slider,{left:-1200*index},function(){
		if(index==6){
			slider.style.left="-1200px";
			index=1;
		}
		isMoving=false;
	});
}
	
function prev(){
	if(isMoving){
         return;
     }
     isMoving=true;
     index--;
     navChange();
     	animate(slider,{left:-1200*index},function(){
     		if(index===0){
     			slider.style.left="-6000px";
     			index=5;
     		}
     		isMoving=false;
    });
}

var timer=setInterval(next,3000);  //设定轮播

box.onmouseover=function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer); //让页面停止
}
box.onmouseout=function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer=setInterval(next,3000);
}

right.onclick=next;
left.onclick=prev;

for(var i=0;i<NavList.length;i++){      //必须通过绝对定位显示出来，否则会被盖住
	NavList[i].idx=i;     //找到每个节点的属性i
	NavList[i].onclick=function(){
		index=this.idx+1;
		navChange();
		animate(slider,{left:-1200*index});
	}
}

function navChange(){
	for(var i=0;i<NavList.length;i++){
		NavList[i].className="";
	} //是五个圆圈都没有颜色，之后再选中的圆圈加颜色
	if(index==6){
		NavList[0].className="active";
	}
	else if(index==0){
		NavList[4].className="active";
	}
	else{
		NavList[index-1].className="active";
	}
}