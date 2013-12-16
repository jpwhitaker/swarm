if (Meteor.isClient) {
  Meteor.startup(function () {
      Canvas.resizeCanvas();
      Piece.Hexagon = Piece(document.querySelector('canvas'))

      hexagons = [];

      canvas.addEventListener('dblclick', function(event){
        Canvas.addPieceToBoard()
      })

      Canvas.dragHex();

  })
}

//TODO
//
/*
·Find out which complimentary sides of the currently selected hexagon and the closest hexagon are closest to one another
·Snap position of the dragged hex within certain threshold (20px?)

·Separate concerns
  -drawing/view
    -calculating hexagon size
    -rendering
  -calculation of distances
  -movement
  -game logic

·Once snapped add hex to as neighbors
·Go through tree and unadd/readd neighbors (recursion?)

·Limit movement based on rule tests



*/