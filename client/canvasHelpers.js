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
  var selection = null;
  var dragging = false;

  canvas.addEventListener('mousedown', function(e){
    hexagons.forEach(function(hexagon){
      if(hexagon.isInBounds(e.x,e.y) && dragging == false){
        dragging = true;
        selection = hexagon;
        console.log(selection)
      } else{
        dragging = false;
        selection = null;
      }
    })
  })

  canvas.addEventListener('mousemove', function(e){
    if(selection != null){
      console.log(e)
      selection.Points.forEach(function(point){
        console.log(e.x)
        point.X += e.webkitMovementX;
        point.Y += e.webkitMovementY;
      })
      Swarm.ctx.clearRect(0,0, Swarm.ctx.canvas.clientWidth, Swarm.ctx.canvas.clientHeight)
      hexagons.forEach(function(hexagon){
        hexagon.draw()
      })
    }
  })

}

// Swarm.canvasState = function(){
//   var canvas = document.getElementById('canvas');
//   var ctx = canvas.getContext('2d');

//   this.valid = false;
//   this.shapes = [];
//   this.dragging = false;
//   this.selection = null;
//   this.dragoffx = 0;
//   this.dragoffy = 0;

//   var myState = this;

//   //prevent double click selecting text
//   canvas.addEventListener('selectstart', function(e) {e.preventDefault(); return false;}, false);

//   //Up, down, and move are for dragging
//   canvas.addEventListener('mousedown', function(e) {
//     var mx = e.x;
//     var my = e.y;
//     for (hex in hexagons){
//       if (hexagons[hex].isInBounds(e.x, e.y)){
//         var mySel = hexagons[hex];
//         myState.dragoffx = mx - mySel.x;
//         myState.dragoffy = my - mySel.y;
//         myState.dragging = true;
//         myState.selection = mySel;
//         myState.valid = false;
//         return;
//       }
//     }

//   if (myState.selection) {
//     myState.selection = null;
//     myState.valid = false; // Need to clear the old selection border
//   }

//   canvas.addEventListener('mousemove', function(e){
//     if(myState.dragging){
//       if(myState.selection !== null){
//         console.log('should be moving')
//         myState.selection.Points.forEach(function (point){
          
//           point.X = e.x;
//           point.Y = e.y;
//         })
//       myState.selection.draw()
//       }
//     }
//   })

//   })
// }
