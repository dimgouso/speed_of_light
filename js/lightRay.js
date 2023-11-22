/**
 * 
 */
function lightRay(xS,yS,Ux,Uy,cntx){
	this.xSource=xS;
	this.ySource=yS;	
	this.Ux=Ux;
	this.Uy=Uy;
	this.mCntx=cntx;
	this.edgeReached=false;
	this.trailX=[];
	this.trailY=[];
	
	var mRed=255;
	var mGreen=0;
	var mBlue=0;

	this.propagate=function(){
		var lastX=0;
		var lastY=0;
		if(this.trailX.length>0){
			lastX=this.trailX[this.trailX.length-1];
			lastY=this.trailY[this.trailY.length-1];
		}
		else{
			lastX=this.xSource;
			lastY=this.ySource;
		}
		var newX=lastX+this.Ux;
		var newY=lastY+this.Uy;
		this.trailX.push(newX);
		this.trailY.push(newY);
	};
	
	this.show=function(){
		this.setDrawingColor();
		this.mCntx.beginPath();
		for(var i=0;i<this.trailX.length;i++){
			this.mCntx.fillRect(this.trailX[i],this.trailY[i],2,2);
		}
		this.mCntx.fill();
	};

	this.setDrawingColor=function(){
		var RedToUse=mRed;
		var GreenToUse=mGreen;
		var BlueToUse=mBlue;
		this.mCntx.strokeStyle="rgb("+RedToUse+","+GreenToUse+","+BlueToUse+")";
		this.mCntx.fillStyle="rgb("+RedToUse+","+GreenToUse+","+BlueToUse+")";
	};
	
	this.setLightColor=function(newRed,newGreen,newBlue){
		mRed=newRed;
		mGreen=newGreen;
		mBlue=newBlue;
	};
}