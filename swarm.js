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

