//controls
var gui=new dat.GUI();
var simSwitch,simulationSpeed,showGrd,grdStep,
    lightColor,extView,moveCar;

var controls=function() {
	this.simulationSwitch=false;
	this.simulationSpeed=simSpeed;
	this.showGrid=gridVisible;
	this.gridStep=gridStep;
    this.lightColor=[lightRed,lightGreen,lightBlue];
    this.externalView=false;
    this.moveWagon=false;
};
var cntrls=new controls();

function initGUI(){
	cntrls.moveWagon=moveWagon;
	
	if (simSwitch){
		gui.remove(simSwitch);
		simSwitch=null;
	}
	if (simulationSpeed){
		gui.remove(simulationSpeed);
		simulationSpeed=null;
	}
	if (showGrd){
		gui.remove(showGrd);
		showGrd=null;
	}
	if (grdStep){
		gui.remove(grdStep);
		grdStep=null;
	}
	if (lightColor){
		gui.remove(lightColor);
		lightColor=null;
	}
	if (extView){
		gui.remove(extView);
		extView=null;
	}
	if (moveCar){
		gui.remove(moveCar);
		moveCar=null;
	}
    
	gui.width=350;	

    simSwitch=gui.add(cntrls,"simulationSwitch").listen().name("Simulation");
    simSwitch.onChange(function(newValue){
    	reset();
    	simulating=newValue;
    	handleTimer(false);
    });

	simulationSpeed=gui.add(cntrls,"simulationSpeed",1,20).step(1).name("Speed");
	simulationSpeed.onChange(function(newValue){
		simSpeed=newValue;
		defineSimulationSpeed();
    });
	
	showGrd=gui.add(cntrls,"showGrid").listen().name("Grid");
	showGrd.onChange(function(newValue){
		gridVisible=newValue;
		drawScene();
	});
	
	grdStep=gui.add(cntrls,"gridStep",1,5).step(1).name("Grid Step");
	grdStep.onChange(function(newValue){
		gridStep=newValue;
		drawScene();
    });

    lightColor=gui.addColor(cntrls,"lightColor").name("Color");
    lightColor.onChange(function(value){
    	try{
		lightRed=parseInt(value[0]);
		lightGreen=parseInt(value[1]);
		lightBlue=parseInt(value[2]);
		showDebugInfo("Red="+parseInt(value[0])+" Green="+parseInt(value[1])+" Blue="+parseInt(value[2]));
    	}
    	catch(err){
    		alert(err.message);
    	}
		setLightColor();
		drawScene();
    });
    
    extView=gui.add(cntrls,"externalView").listen().name("External Observer");
    extView.onChange(function(newValue){
    	externalView=newValue;
    	moveWagon=newValue && moveWagon;//if car on the move and externalView=false then stop movement
    	setWagonVelocity();
    	resetClocks();
    	initGUI();
    });

    if(externalView){
        moveCar=gui.add(cntrls,"moveWagon").listen().name("Motion of wagon");
        moveCar.onChange(function(newValue){
        	moveWagon=newValue;
        	setWagonVelocity();
        	reset();
        });
    }
}