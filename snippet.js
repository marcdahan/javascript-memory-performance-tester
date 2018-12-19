function MemoryTester() {
  //number of buttons injected into the DOM
  this.buttonNumber = 0;
  //position of the first button
  this.marginTop = 300;
  //the table where are referenced the divs into the dom
  this.newDom = [];

  this.cleanPage = function() {
    var _length = document.body.childNodes.length;
    var _childNodes = document.body.childNodes;
    for (var i = _length -1 ; i >= this.buttonNumber; i--) {
        document.body.setAttribute("style", "background:black;position:relative;");
        document.body.removeChild(_childNodes[i]);
    }
  };

  this.createButton = function(name, styles, callback) {
      name = name || "Click Me";
      this.buttonNumber += 1;
      this.marginTop += 100;
      var defaultStyles = "color:white;background: red;width: 200px;padding: 10px;position:absolute;top: " + this.marginTop.toString() + "px;left: 50%;margin-left: -100px;";
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

  this.paintTheDOM = function () {
    this.newDom = [];
    var getRandomColor = function() {
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
    for (var i = 0; i < 10000; i++) {
      var color = getRandomColor();
      var div = document.createElement("DIV");
      div.appendChild(document.createTextNode("Hello World"));
      div.setAttribute("style", "display:inline-block;padding:5px;border: none;cursor:pointer;background:" + color);
      document.body.appendChild(div);
      this.newDom.push(div);
    }
  };

  //exports
  return {
    paintTheDOM : this.paintTheDOM,
    cleanPage : this.cleanPage,
    createButton : this.createButton,
    newDom : this.newDom,
    buttonNumber : this.buttonNumber,
    marginTop : this.marginTop
  }
}
//instanciation
var memoryTester = new MemoryTester();

//cleaning
memoryTester.cleanPage();

//button Diagnose to check the state of the JS memory
var diagnoseMe = memoryTester.createButton("Diagnose Me", '', function() {
var prevHeapSize = window.performance.memory.usedJSHeapSize;
var beginAt = prevHeapSize;
console.log("JS Memory state at the begining : " + (beginAt / 1000000) + " Mb");
console.log ("previous JS Memory state : " + (prevHeapSize / 1000000) + " Mb");
console.log ("current JS Memory state : " +  (window.performance.memory.usedJSHeapSize/1000000) + " Mb");
prevHeapSize = window.performance.memory.usedJSHeapSize;
});

//button startMe to inject div to the DOM
var startMe = memoryTester.createButton("Start Me", '', function() {
  var _instance = memoryTester.paintTheDOM();
});

//button addListeners to add a listener to the divs that has been injected
var addListeners = memoryTester.createButton("Add listeners", '', function() {
if (!memoryTester.newDom.length) {
  return false;
}
for (var i = memoryTester.newDom.length - 1 ; i >= 3; i--) {
    memoryTester.newDom[i].addEventListener("click", function() {
      alert(this.style.background);
    });
}
});

//button emptyMe, empty the DOM
var emptyMe = memoryTester.createButton("Empty Me", '', function() {
  memoryTester.cleanPage();
});