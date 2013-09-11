Swarm.resizeCanvas = function(){

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  //canvas resize
  window.onresize = function(event) {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    ctx.canvas.width = windowWidth;
    ctx.canvas.height = windowHeight;
    for (hex in hexagons){
      hexagons[hex].draw()
    }
  }
}



Swarm.dragHex = function(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
   selection = null;
   dragging = false;

  canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

  canvas.addEventListener('mousedown', function(e){
    // hexagons.forEach(function(hexagon){
    //   if(hexagon.isInBounds(e.x,e.y)){
    //     console.log(true)
    //   }
    // })
    // console.log("Selection state: " + selection)
    // console.log("Drag state: " + dragging)
    hexagons.forEach(function(hexagon){
      if(hexagon.isInBounds(e.x,e.y) && dragging == false){
        dragging = true;
        hexagon.selected = true
        selection = hexagon;
      } else if (hexagon.isInBounds(e.x,e.y) && dragging == true && selection == hexagon){
        dragging = false;
        hexagon.selected = false
        selection = null;
      }
    })
  })

  canvas.addEventListener('mousemove', function(e){
    if(selection != null){
      //Update all 6 Points
      selection.Points.forEach(function(point){
        point.X += e.webkitMovementX;
        point.Y += e.webkitMovementY;
      })
      selection.TopLeftPoint.X += e.webkitMovementX;
      selection.TopLeftPoint.Y += e.webkitMovementY;
      selection.BottomRightPoint.X += e.webkitMovementX;
      selection.BottomRightPoint.Y += e.webkitMovementY;
      selection.x += e.webkitMovementX;
      selection.y += e.webkitMovementX;
      selection.x1 += e.webkitMovementX;
      selection.y1 += e.webkitMovementY;
      selection.MidPoint.X += e.webkitMovementX;
      selection.MidPoint.Y += e.webkitMovementY;
      Swarm.ctx.clearRect(0,0, Swarm.ctx.canvas.clientWidth, Swarm.ctx.canvas.clientHeight)
      hexagons.forEach(function(hexagon){
        hexagon.draw()
      })
    }
  })

}


