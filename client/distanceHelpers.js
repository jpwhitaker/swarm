Swarm.closestHex = function(){
  var closestHexagon=null;
  hexagons.forEach(function(hexagon){
    x = hexagon.MidPoint.X
    y = hexagon.MidPoint.Y
    selX = selection.MidPoint.X
    selY = selection.MidPoint.Y

    if (closestHexagon == null){
      closestHexagon = hexagon
    } else if((selX+selY)-(x+y) < (selX+selY)-(closestHexagon.MidPoint.X + closestHexagon.MidPoint.Y)){
      closestHexagon = hexagon
      console.log(closestHexagon)
    }
  })
}