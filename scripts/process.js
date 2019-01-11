//first line is infinite loop ones,multiple of 5??
let brokenSeeds = [165,255,315,325, 578, 613, 721];

//var seedData = {castle1:[],castle2:[],castle3:[],difficultPathing:[]};
var seedData = [];
var dataSet = [];//{castle1:[],castle2:[],castle3:[],difficultPathing:[],easyPathing:[]};

$(document).ready(function () {
  $(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
  $.getJSON('seedData.json', function(result) {
    seedData = result;
    changeCatalog($("#selectFromCatalog").val());
  });
  $("#checkSeed").val(3);
  visualize(3);
  $("#lookUpSeed").on('click', function(){
    let mySeed = parseInt($("#checkSeed").val());
    let okToUse = true;
    for (let i = 0; i < brokenSeeds.length; i++) {
      if (mySeed === brokenSeeds[i]) {
        okToUse = false;
        break;
      }
    }
    if (okToUse) {
      visualize(mySeed);
    }
    else {
      alert("Seed: " + mySeed + " is possibly a little broken, try another one");
    }
    
  })
  //initialize catalogs
  $("#selectFromCatalog").on('change', function() {
    changeCatalog($("#selectFromCatalog").val());
  });
  $("#showSize").on('click', function(){
    if ($("#filterMapSize").val() === '') {
      changeCatalog($("#selectFromCatalog").val());
    }
    else {
      changeCatalog($("#selectFromCatalog").val(), parseInt($("#filterMapSize").val()));
    }
  })
  
});
function changeCatalog(arr, size = 'all'){
  //select data as needed
  let finalData = seedData.filter(function(a){
    for (let i = 0 ; i < arr.length; i++) {
      if (arr[i] === 'castle1') {
        if (a.castles !== 1) {
          return false;
        }
      }
      else if (arr[i] === 'castle2') {
        if (a.castles !== 2) {
          return false;
        }
      }
      else if (arr[i] === 'castle3') {
        if (a.castles !== 3) {
          return false;
        }
      }
      else if (arr[i] === 'difficultPathing') {
        if (a.pathing !== 1) {
          return false;
        }
      }
      else if (arr[i] === 'easyPathing') {
        if (a.pathing !== 0) {
          return false;
        }
      }
      if (size !== 'all') {
        if (a.size !== size) {
          return false;
        }
      }
    }
    return true;
  });
  
  
  $(".catalogDisplay").html('<th>Seed</th><th>Map Size</th><th>Castles</th><th>Pathing</th>');
  for (let i = 0; i < finalData.length; i++) {
    let data = finalData[i];
    let pathingD = 'Easy';
    if (data.pathing === 1) {
      pathingD = 'Difficult'
    }
    $(".catalogDisplay").append('<tr><td>' + data.seed + '</td><td>' + data.size + 'x' + data.size + '</td><td>' + data.castles + '</td><td>' + pathingD + '</td></tr>');
  }
}

function visualize(seed) {
  $(".map").html("<div class='botDisplay'><div class='castle'></div></div>");
  
  this.game = new Game(seed, 0, 0, false, false);
  
  this.MAP_WIDTH = this.game.map[0].length;
  this.MAP_HEIGHT = this.game.map.length;
  this.castleCount = this.game.robots.length/2;
  
  
  console.log('MAP_WIDTH: ' + this.game.map[0].length)
  console.log('MAP_Height: ' + this.game.map.length)
  
  $("#mapSize").text(this.MAP_WIDTH + "x" + this.MAP_HEIGHT);
  $("#castleCount").text(this.castleCount);
  var BLANK = '#393939',
      OBSTACLE = '#e8efe8',
      KARBONITE = '#8ce96a',
      FUEL = '#e2e96a';
  var RED = 'red',
      BLUE = 'blue'
  /*devs? the online replayer on battlecode.org flips x and y around*/
  
  //initialize map without bots
  for (let y = 0; y < this.MAP_HEIGHT; y++) for (let x = 0; x < this.MAP_WIDTH; x++) {
    let color = this.game.karbonite_map[y][x] ? KARBONITE : this.game.fuel_map[y][x] ? FUEL : this.game.map[y][x] ? BLANK : OBSTACLE;
    //console.log(color);
    $(".map").append("<div class='tile' id='" + x + "_" + y + "'></div>")
    let tileElement = $("#" + x + "_" + y);
    tileElement.css('background-color', color);
    //data-toggle='tooltip' data-trigger='hover' data-title='test'
    tileElement.attr('data-toggle','tooltip');
    tileElement.attr('data-trigger','hover');
    let desc = '';
    if (color === FUEL) {
      desc = 'Fuel Deposit: ';
    }
    else if (color === KARBONITE) {
      desc = 'Karbonite Depsoit: ';
    }
    tileElement.attr('data-title',desc + '(' + x + ', ' + y + ')');
    //this.mapGraphics.drawRect(x*draw_width, y*draw_height, draw_width, draw_height);
    //this.mapGraphics.endFill();
  }
  var draw_width = 640 / this.MAP_WIDTH;
  var draw_height = 640 / this.MAP_HEIGHT;
  $(".tile").css('width', draw_width + "px");
  $(".tile").css('height', draw_height + "px");
  $(".tile").on('click', function(){
    let xy = this.id.split("_")
    let py = xy[0];
    let px = xy[1];
    console.log(px,py);
  });
  
  for (let k = 0; k < this.game.robots.length; k++) {
    let castle = this.game.robots[k];
    let color2 = RED;
    if (castle.team === 1) {
      color2 = BLUE;
    }
    $("#" + castle.x + "_"  + castle.y).css('background-color', color2);
    let baseName = 'Red Castle: ';
    if (color2 === BLUE) {
      baseName = 'Blue Castle: ';
    }
    $("#" + castle.x + "_"  + castle.y).attr('data-title', baseName + '(' + castle.x + ', ' + castle.y + ')');
  }
  $(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
  
  
}
