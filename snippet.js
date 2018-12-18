//cleanPage
function cleanPage(exceptions) {
  var _length = document.body.childNodes.length;
  var _childNodes = document.body.childNodes;
  for (var i = _length -1 ; i >= exceptions; i--) {
      document.body.setAttribute("style", "background:black;position:relative;");
      document.body.removeChild(_childNodes[i]);
  }
}

function getRandomColor() {
    var getRandomInt = function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

var buttonNumber = 200;

var CreateButton = function(name, styles, callback) {
    name = name || "Click Me";
    buttonNumber += 100;
    var defaultStyles = "color:white;background: red;width: 200px;padding: 10px;position:absolute;top: " + parseInt(buttonNumber) + "px;left: 50%;margin-left: -100px;";
    styles = (styles ? defaultStyles + styles : defaultStyles);     
    var newButton = document.createElement("BUTTON");
    newButton.appendChild(document.createTextNode(name));
    newButton.setAttribute("style", styles);
    newButton.setAttribute("type", "button");
    document.body.appendChild(newButton);
    newButton.addEventListener("click", function() {
        callback();
    });
};



var paintTheDOM = function () {
  var newDom = []; 
  for (var i = 0; i < 75000; i++) {
    var color = getRandomColor();
    var div = document.createElement("DIV");
    div.appendChild(document.createTextNode("Hello World"));
    div.setAttribute("style", "display:inline-block;padding:5px;border: none;cursor:pointer;background:" + color);
    document.body.appendChild(div);
    newDom.push(div);
  }
  for (var i = newDom.length - 1 ; i >= 3; i--) {
      newDom[i].addEventListener("click", function() {
        alert(this.style.background);
      });
  }
};

cleanPage(0);

var diagnoseMe = new CreateButton("Diagnose Me", '', function() {
  var prevHeapSize = window.performance.memory.usedJSHeapSize;
  var beginAt = prevHeapSize;
  console.log("JS Memory state at the begining : " + (beginAt / 1000000) + " Mb");
  console.log ("previous JS Memory state : " + (prevHeapSize / 1000000) + " Mb");
  console.log ("current JS Memory state : " +  (window.performance.memory.usedJSHeapSize/1000000) + " Mb");
  prevHeapSize = window.performance.memory.usedJSHeapSize;
});

var startMe = new CreateButton("Start Me", '', function() {
    var _instance = new paintTheDOM();
});

var emptyMe = new CreateButton("Empty Me", '', function() {
    cleanPage(3);
});
