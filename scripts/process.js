//var bcdata;
//var reader = new FileReader();
//var visualization;
/*
reader.onloadend = function() {
  console.log("loaded");
  bcdata = new Uint8Array(reader.result);
  visualization = new visualize(bcdata);
}
*/
/*
var dataSet = {castle1: [{seed:3,size:32,castles:1,pathing:1},{seed:5,size:32,castles:1,pathing:0},{seed:8,size:38,castles:1,pathing:0}], castle2: [{seed:12,size:62,castles:2,pathing:1}], castle3: [{seed:6,size:38,castles:3,pathing:1}], difficultPathing: [{seed:3,size:32,castles:1,pathing:1},
{seed:6,size:38,castles:3,pathing:1},{seed:12,size:62,castles:2,pathing:1}]}
*/
var seedData = {castle1:[],castle2:[],castle3:[],difficultPathing:[]};

$(document).ready(function () {
  $(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
  $.getJSON('seedData.json', function(result) {
    seedData = result;
    changeCatalog($("#selectFromCatalog").val());
  });
  $("#lookUpSeed").on('click', function(){
    let mySeed = parseInt($("#checkSeed").val());
    visualize(mySeed);
  })
  //initialize catalogs
  $("#selectFromCatalog").on('change', function() {
    changeCatalog($("#selectFromCatalog").val());
  });
  
});
function changeCatalog(key){
  $(".catalogDisplay").html('<th>Seed</th><th>Map Size</th><th>Castles</th><th>Pathing</th>');
  for (let i = 0; i < seedData[key].length; i++) {
    let data = seedData[key][i];
    $(".catalogDisplay").append('<tr><td>' + data.seed + '</td><td>' + data.size + 'x' + data.size + '</td><td>' + data.castles + '</td><td>' + data.pathing + '</td></tr>');
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
    tileElement.attr('data-title','(' + x + ', ' + y + ')');
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
  }
  $(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
  
  
}
/*DONT UPLOAD THIS CODE*/
function updateSeedData(seed) {
  this.game = new Game(seed, 0, 0, false, false);
  this.MAP_WIDTH = this.game.map[0].length;
  this.MAP_HEIGHT = this.game.map.length;
  let size = this.MAP_HEIGHT;
  let castleCount = this.game.robots.length/2;
  let thisData = {seed:seed, castles:castleCount, size:size, pathing:0};
  let mapPlanner = initializePlanner(this.game.map);
  
  //determine difficulty
  let path = [];
  //var dist = planner.search(19,7, 23,7,  path);
  
  if (castleCount === 1) {
    seedData['castle1'].push(thisData)
  }
  if (castleCount === 2) {
    seedData['castle2'].push(thisData)
  }
  if (castleCount === 3) {
    seedData['castle3'].push(thisData)
  }
}

function saveSeedDataToJson() {
  let myData = JSON.stringify(seedData);
  download(myData, 'seed.json', 'text')
}

function determinePathingDifficulty


function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}