let tX = 0;
let tY = 0;
let incr = 2;
let distance = 0;
let axisTreshold = 30;
let distanceLimit = 70;
let mouseX;
let mouseY;
let xForward = true;
let yForward = true;
let refreshBase = 2;
let refreshDelay = refreshBase;
let refreshDelta = 55;
let timer = false;
let speedPercentage = 0;
const speedFactor = 0.8;
let navigatorActive = false;

let aspectRatio = "landscape";

let moveContainer = document.getElementsByClassName("move-container")[0];
let $plane = moveContainer.getElementsByClassName("plane")[0];

let halfContainerW = Math.ceil(moveContainer.clientWidth / 2);
let halfContainerH = Math.ceil(moveContainer.clientHeight / 2);
