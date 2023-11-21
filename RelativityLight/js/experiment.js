var originalUy=-2;
var ray=new lightRay(canvas.width/2,canvas.height/2,0,originalUy,context);

var externalView=false;
var tracks=document.getElementById("tracks");
var wagon=document.getElementById("wagon");
var observer=document.getElementById("observer");
var trackTop=0;
var wagonTop=0;
var wagonLeft=0;
var wagonFloor=0;
var observerLeft=(canvas.width-observer.width)/2;
var observerTop=canvas.height-observer.height+1;
var moveWagon=false;
var wagonUx=0;
var ceilingY=canvas.height/2-41,ceilingReached=false;
var floorY=canvas.height/2+41,floorReached=false;

var clockXOffset=50,clockYOffset=50;
var clock1=new clock(clockXOffset,clockYOffset,context);
var clock2=new clock(canvas.width-clockXOffset,clockYOffset,context);

function initialiseExperiment(){
	experimentInitialised=false;
	initGUI();
	//drawWidth.value=1;
	reset();
	initialiseBackground();
	drawBackground();
	initialiseLight();
	drawObserver();
	drawClocks();
	experimentInitialised=true;
}

function initialiseLight(){
	if(ray.trailX.length>0){
		for(var i=ray.trailX.length-1;i>-1;i--){
			ray.trailX.splice(i,1);
			ray.trailY.splice(i,1);
		}
	}
	ray.Ux=wagonUx;
	ray.Uy=originalUy;
	setLightColor();
}

/*function previousFrame(){
	clock1.setValue(clock1.m_Value-1);
	clock2.setValue(clock2.m_Value-1);
	ray.trailX.splice(ray.trailX.length-1,1); 
	ray.trailY.splice(ray.trailY.length-1,1);
	drawScene();
}*/

function nextFrame(){
	if (floorReached){
		simulating=false;
	}
	else{
		if(wagonUx==0){
			clock1.setValue(clock1.m_Value+1);
		}
		else{
			clock2.setValue(clock2.m_Value+2);			
		}
		ray.propagate(); 
	}
	if(ray.trailY.length>0 && ray.trailY[ray.trailY.length-1]<=ceilingY){
		ceilingReached=true;
		ray.trailX.push(ray.trailX[ray.trailX.length-1]+2);
		ray.trailY.push(ray.trailY[ray.trailY.length-1]);
		ray.Uy=-ray.Uy;
	}
	if(ray.trailY.length>0 && ray.trailY[ray.trailY.length-1]>=floorY){
		floorReached=true;
		//wagonUx=0;
	}
	drawScene();
}

function reset(){
	initialiseBackground();
	initialiseLight();
	setWagonVelocity();
	drawScene();
}

function resetClocks(){
	clock1.setValue(clock1.m_MinValue);
	clock1.m_Cycles=0;
	clock2.setValue(clock2.m_MinValue);
	clock2.m_Cycles=0;
	reset();
}

function drawScene(){
	if (experimentInitialised){
		clearGraphics();
		drawBackground();
		showGrid();
		ray.show();
		drawClocks();
		drawObserver();
	}
}

function setLightColor(){
	ray.setLightColor(lightRed,lightGreen,lightBlue);
}

function initialiseBackground(){
	trackTop=canvas.height-tracks.height+1;
	if (externalView){
		wagonTop=trackTop-wagon.height;
	}
	else{
		wagonTop=canvas.height-wagon.height;
	}
	ceilingY=wagonTop+50;
	ceilingReached=false;
	floorY=wagonTop+168;
	floorReached=false;

	wagonFloor=wagonTop+wagon.height/2+42;
	ray.ySource=wagonFloor;
	wagonLeft=parseInt((canvas.width-wagon.width)/2);
}

function drawBackground(){
	if (externalView){
	    for (var i=0;i<canvas.width;i+=tracks.width){
	    	context.drawImage(tracks,i,trackTop);
	    }
	}
    if(moveWagon && !floorReached){
    	wagonLeft=wagonLeft+wagonUx;
    }
    context.drawImage(wagon,wagonLeft,wagonTop);
}

function drawClocks(){
	clock1.show();
	clock2.show();
}

function drawObserver(){
	if (externalView){
		context.drawImage(observer,observerLeft,observerTop);
	}
}

function setWagonVelocity(){
	if (moveWagon){
		wagonUx=1;
	}
	else{
		wagonUx=0;
	}
}