Canvas.resizeCanvas = function(){

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



Canvas.dragHex = function(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
   selection = null;
   dragging = false;
  //prevent accidental selection of DOM elements
  canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

  canvas.addEventListener('mousedown', function(e){

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
      Canvas.getClosestPiece()
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



Canvas.addPieceToBoard = function(){
  hex = new Piece.Hexagon(hexagons.length+1, event.x, event.y)
  hexagons.push(hex)
  Swarm.ctx.clearRect(0,0, Swarm.ctx.canvas.clientWidth, Swarm.ctx.canvas.clientHeight)
  for (hex in hexagons){
    hexagons[hex].draw()
  }
}

// TODO: refactor the dick out of this!!!
Canvas.getClosestPiece = function(){
  var current = {};
  current.x = selection.MidPoint.X;
  current.y = selection.MidPoint.Y;
  smallestDistance = null;
  closestHex = null;
  console.log('what is going on?')

  hexagons.forEach(function(hexagon){
    if(hexagon !== selection){
      testPiece = {};
      testPiece.x = hexagon.MidPoint.X;
      testPiece.y = hexagon.MidPoint.Y;
      if((lineDistance(current, testPiece) < smallestDistance) || smallestDistance === null){
        smallestDistance = lineDistance(current, testPiece)
        console.log("hexagon:", hexagon,current,testPiece, lineDistance(selection, testPiece), 'current closest:', closestHex)
        closestHex = hexagon
        hexagons.forEach(function(hexagon){
          hexagon.lineColor = 'grey'
        })
        hexagon.lineColor = 'red';
      }
    }
  })
  return closestHex;
}

function lineDistance( point1, point2 ){
  var xs = 0;
  var ys = 0;

  xs = point2.x - point1.x;
  xs = xs * xs;

  ys = point2.y - point1.y;
  ys = ys * ys;

  return Math.sqrt( xs + ys );
}

