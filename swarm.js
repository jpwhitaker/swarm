if (Meteor.isClient) {
  Meteor.startup(function () {
      Swarm.resizeCanvas();
      Swarm.Hexagon = Swarm.hexagonHelpers(document.querySelector('canvas'))

      hexagons = [];
      // x = new Swarm.Hexagon(100, 100, 1);
      // x.draw()

      // canvas.addEventListener('click', function(event){
      //   for (hex in hexagons){
      //     if (hexagons[hex].isInBounds(event.x, event.y)){
      //       console.log(+hex + 1)
      //     }
      //   }
      //   })

      canvas.addEventListener('dblclick', function(event){
        hex = new Swarm.Hexagon(hexagons.length+1, event.x, event.y)
        hexagons.push(hex)
        Swarm.ctx.clearRect(0,0, Swarm.ctx.canvas.clientWidth, Swarm.ctx.canvas.clientHeight)
        for (hex in hexagons){
          hexagons[hex].draw()
        }
      })

      canvas.addEventListener('drag', function(event){
        console.log(event)
      })

      Swarm.dragHex();

  })
}

