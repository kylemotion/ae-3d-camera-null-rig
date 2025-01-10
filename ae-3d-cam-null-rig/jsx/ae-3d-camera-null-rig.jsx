/**
 * @description a headless script to create a 3D camera and null rig
 * @name km-scriptname
 * @author Kyle Harter <kylenmotion@gmail.com>
 * @version 1.0.0
 * 
 * @license This script is provided "as is," without warranty of any kind, expressed or implied. In
 * no event shall the author be held liable for any damages arising in any way from the use of this
 * script.
 * 
 * 
 * 
 * 
*/




(function(){

    try {
        app.beginUndoGroup("create a 3D camera and null rig?");
        
        createCameraRig()
        
      } catch(error) {
        alert("An error occured on line: " + error.line + "\nError message: " + error.message);

      } finally {
        // this always runs no matter what
        app.endUndoGroup()
      }
      
      
      function getProj(){
        var proj = app.project;

        if(!proj){
          alert("Whoops!\r\rLooks like you don't have a project open. Open up an AE project or create a new one.")
          return null
        }

        return proj

      }

      function getComps(){
        var proj = getProj();

        if (!proj) return null;
    
        var selectedComps = proj.selection;
        var compArray = new Array();
    
        
        if (selectedComps.length > 0) {
            for (var i = 0; i < selectedComps.length; i++) {
                var item = selectedComps[i];
                if (item instanceof CompItem) {
                    compArray.push(item);
                }
            }
    
            if (compArray.length < 1) {
                return alert("Whoops!\r\rYou don't have any comp items selected. Select at least 1 comp item before trying again.");
            }
        } else {
            var activeItem = app.project.activeItem;
            if (activeItem && activeItem instanceof CompItem) {
                compArray.push(activeItem);
            } else {
                return alert("Whoops!\r\rYou don't have any project items selected, and the active item is not a comp.");
            }
        }
    
        return compArray;

      }


      function createCameraRig(){
        var comps = getComps();

        if(!comps) return null;

        for(var i = 0; i<comps.length; i++){
          var labelColor = 1;

          var comp = comps[i];
          var layerCollection = comp.layers;
          var compCam = layerCollection.addCamera("Comp Camera", [comp.width/2, comp.height/2]);
          compCam.label = labelColor;
          var camTransformGroup = compCam.property("ADBE Transform Group");
          var camPosition = camTransformGroup.property("ADBE Position");
          camPosition.setValue([comp.width/2, comp.height/2, -2666.7]);

          var cameraNull = layerCollection.addShape();
          cameraNull.name = "Camera Null";
          cameraNull.label = labelColor;
          cameraNull.guideLayer = true;
          cameraNull.threeDLayer = true;

          compCam.parent = cameraNull;
        }

        

        return 

      }



}())
