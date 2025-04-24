let input;
let slider;
let button;
let dropdown;
let iframe;
let jump = false;

function setup() {  //這是一個設定函數，只會執行一次
  //產生一個畫布，充滿整個視窗
  createCanvas(windowWidth, windowHeight);
  background("#FF8EFF");  //設定背景顏色
  
  //創建一個輸入文字框
  input = createInput();  //建立文字框
  input.position(10, 10); //設定文字框位置
  input.size(300, 50);  //設定文字框大小
  input.style("font-size", "32px"); //設定文字大小
  input.style("color", "#FF8EFF");  //設定文字顏色
  input.value("TKUET");    //設定預設文字
  
  //創建一個滑桿
  slider = createSlider(12, 32, 32); //設定滑桿範圍和初始值
  slider.position(450, 30); //設定滑桿位置
  slider.size(100); //設定滑桿大小
  
  //創建一個按鈕
  button = createButton('跳動');  //設定按鈕文字
  button.position(580, 20); //設定按鈕位置
  button.mousePressed(toggleJump);  //按下按鈕時執行 toggleJump 函數
  button.style("font-size", "24px"); //設定按鈕文字大小
  button.style("color", "#FF8EFF");  //設定按鈕文字顏色
  button.style("background-color", "#FF0000");  //設定按鈕背景顏色
  
  //創建一個下拉式選單
  dropdown = createSelect();
  dropdown.position(680, 10);
  dropdown.size(200, 50);
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.changed(openWebsite);  //選擇下拉式選單時執行 openWebsite 函數
  dropdown.style("font-size", "24px");  //設定下拉式選單文字大小
  
  //創建一個 iframe
  iframe = createElement('iframe');
  iframe.position(100, 70);
  iframe.size(windowWidth - 200, windowHeight - 150);
}

function toggleJump() {
  jump = !jump;
}

function openWebsite() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  }
}

function draw() {
  background("#FF8EFF");  //設定背景顏色
  
  //顯示 "文字大小" 文字
  textSize(24); //設定文字大小
  fill("#FF0000"); //設定文字顏色為紅色
  stroke(255); //設定邊框顏色為白色
  strokeWeight(2); //設定邊框寬度
  text("文字大小", 340, 30); //在滑桿左邊顯示文字
  
  //取得滑桿的值來設定文字大小
  let textSizeValue = slider.value();
  
  //設定文字大小、對齊方式和顏色
  textSize(textSizeValue);   //設定文字大小
  textAlign(LEFT, TOP); //設定文字對齊方式
  fill("#4A4AFF"); //設定文字顏色
  stroke(255);    //設定文字外框顏色
  strokeWeight(2);  //設定文字外框寬度
  
  //計算每個文字框的寬度和高度
  let textStr = input.value();  //取得文字框的值 
  let textW = textWidth(textStr); //取得文字寬度
  let textH = textAscent() + textDescent(); //取得文字高度
  
  //在整個視窗中顯示文字
  for (let y = 100; y < windowHeight; y += textH + 10) {  //每次 y 增加文字高度和 10
    let offsetY = jump ? random(-10, 10) : 0; //如果 jump 為 true，則 offsetY 為 -5 到 5 之間的隨機數，否則為 0
    for (let x = 0; x < windowWidth; x += textW + 10) { //每次 x 增加文字寬度和 10
      text(textStr, x, y + offsetY);  //顯示文字
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 20, windowHeight - 80);
}