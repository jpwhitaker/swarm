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

Canvas.clear = function(){
  Swarm.ctx.clearRect(0,0, Swarm.ctx.canvas.clientWidth, Swarm.ctx.canvas.clientHeight)

}

Canvas.selectHex = function(e){
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
}

Canvas.updateHexagonPoints = function(e){
  //Update all 6 Points
  selection.Points.forEach(function(point){
    point.X += e.webkitMovementX;
    point.Y += e.webkitMovementY;
  })
  //update all the other helper points
  selection.TopLeftPoint.X     += e.webkitMovementX;
  selection.TopLeftPoint.Y     += e.webkitMovementY;
  selection.BottomRightPoint.X += e.webkitMovementX;
  selection.BottomRightPoint.Y += e.webkitMovementY;
  selection.x                  += e.webkitMovementX;
  selection.y                  += e.webkitMovementX;
  selection.x1                 += e.webkitMovementX;
  selection.y1                 += e.webkitMovementY;
  selection.MidPoint.X         += e.webkitMovementX;
  selection.MidPoint.Y         += e.webkitMovementY;
}

Canvas.dragHex = function(){
   selection = null;
   dragging = false;
  //prevent accidental selection of DOM elements
  canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

  canvas.addEventListener('mousedown', function(e){
    Canvas.selectHex(e)
  })

  canvas.addEventListener('mousemove', function(e){
    if(selection != null){
      Canvas.getClosestPiece()
      Canvas.updateHexagonPoints(e)
      Canvas.clear()
      hexagons.forEach(function(hexagon){
        hexagon.draw()
        Canvas.lineBetweenClosest(Canvas.getClosestPiece())
        Canvas.closestComplimentaryLines(Canvas.getClosestPiece())
      })
    }
  })

}



Canvas.addPieceToBoard = function(){
  hex = new Piece.Hexagon(hexagons.length+1, event.x, event.y)
  hexagons.push(hex)
  Canvas.clear()
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

  hexagons.forEach(function(hexagon){
    if(hexagon !== selection){
      testPiece = {};
      testPiece.x = hexagon.MidPoint.X;
      testPiece.y = hexagon.MidPoint.Y;
      if((lineDistance(current, testPiece) < smallestDistance) || smallestDistance === null){
        smallestDistance = lineDistance(current, testPiece)
        closestHex = hexagon
        hexagons.forEach(function(hexagon){
          hexagon.lineColor = 'grey'
        })
        hexagon.lineColor = 'red';
      }
    }
  })
  // console.log(smallestDistance)
  return [selection, closestHex]
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

Canvas.hexagonAngle = function() {
  twoHexes = Canvas.getClosestPiece()
  midx1 = twoHexes[1].MidPoint.X
  midx2 = twoHexes[0].MidPoint.X

  midy1 = twoHexes[1].MidPoint.Y
  midy2 = twoHexes[0].MidPoint.Y



  var value = (Math.atan2(midy1-midy2, midx1-midx2))
  // console.log(value)
  // return Math.floor((value+(Math.PI/6))*6/(2*Math.PI))
  return (Math.floor(value*6/(2*Math.PI)+2.9999999999))
  // return (Math.floor(value*6))

  // Calculate Math.floor(value*6/(2*pi)) --> you get a number between 0..5 denoting the edge pairing.



}
  var reference = 0

Canvas.lineBetweenClosest = function(hexagonsArray){
  var latest = Canvas.hexagonAngle()
  // console.log(hexagonsArray[0].MidPoint.X)
  // console.log(hexagonsArray[1].MidPoint.X)
  console.log(Canvas.hexagonAngle())
  if (reference != latest){
    reference = latest
    // console.log(latest)
  }
  // console.log(Canvas.hexagonAngle())
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(hexagonsArray[0].MidPoint.X, hexagonsArray[0].MidPoint.Y);
    ctx.lineTo(hexagonsArray[1].MidPoint.X, hexagonsArray[1].MidPoint.Y);
    ctx.closePath();
    ctx.stroke();
}

Canvas.closestComplimentaryLines = function(twoHexagons){
  //make sides
  for (i=0;i<6;i++){
    if (i < 5){
      // console.log(twoHexagons[0].Points[i])
      //
    }
    else{
      //
    }
  }
}













