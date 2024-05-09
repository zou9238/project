#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include "DHT.h"
#define DHTPIN 15          //定義DHT pin腳
#define DHTTYPE DHT22     //支援類型有DHT11, DHT22, DHT21
#define LED 14           //D5
DHT dht(DHTPIN, DHTTYPE); //宣告DHT物件
const char* ssid ="cht9997";
const char* password ="0424928908";
ESP8266WebServer server(80);
void setup() {
  Serial.begin(115200);
  pinMode(LED, INPUT_PULLUP);
  digitalWrite(LED,LOW);
  WiFi.begin(ssid,password);
  while(WiFi.status()!=WL_CONNECTED) {
    delay(1000);
    Serial.println("連接到WIFI中...");
  }
  Serial.println("已連接到WIFI中...");
  Serial.print("IP ADDRESS: ");
  Serial.println(WiFi.localIP());

  server.on("/",HTTP_GET, handleRoot);
  Serial.println("HTTP伺服器已啟動");
  server.on("/led",[]() {
    if(digitalRead(LED)==LOW)
    {
      server.send(200, "text/html", "<h1>LED IS OFF");
    }
    else if(digitalRead(LED)==HIGH)
    {
      server.send(200, "text/html", "<h1>LED IS ON");
    }
  });
  server.on("/DHC",[]() {
      dht.begin();          //初始化DHT11
      float h = dht.readHumidity();     //讀取濕度資料
      float t = (dht.readTemperature()-32)*5/2;  //讀取溫度資料
      server.send(200, "text/html", "<h1>temp="+String(t)+""+"humi="+String(h)+"</h1>");
  });
    server.begin();
}

void loop() {
  server.handleClient();
}

void handleRoot(){
  String html = "<html><head><style>";
  html += "body{font-family:Arial,Helvetica,Sans-Serif;background-corlor:#f2f2f2;text-aling:conter;}";
  html += "h1{color:#333;}";
  html += "p{font-size: 20px;color:#555;}";
  html += "</style></head><body>";
  html += "<h1>ESP01S Web Server</h1>";
  html += "<p>IP Address: ";
  html += WiFi.localIP().toString();
  html += "</p>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}
