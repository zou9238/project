/*** 範例6.3.1(DHT11數位溫濕度感測器) ***/
#include "DHT.h"
#include "HCSR04.h"
#define DHTPIN 8          //定義DHT pin腳
#define DHTTYPE DHT22     //支援類型有DHT11, DHT22, DHT21
#define TrigPIN 3              //定義發送端Trig pin腳
#define EchoPIN 2              //定義接收端Echo pin腳
HCSR04 myHC(TrigPIN,EchoPIN);  //宣告HCSR04物件
DHT dht(DHTPIN, DHTTYPE); //宣告DHT物件
void setup() {
  Serial.begin(9600);
  dht.begin();          //初始化DHT11
}

void loop() {
  float h = dht.readHumidity();     //讀取濕度資料
  float t = dht.readTemperature();  //讀取溫度資料
  Serial.print("Humi.="); Serial.print(h);    //印出濕度數值
  Serial.print(", Temp.="); Serial.println(t);  //印出溫度數值
  delay(5000);                      //延遲5秒
  int range = myHC.dist();  //讀取距離資料
  Serial.print("Range="); Serial.println(range);   //印出距離數值
  delay(2000);              //延遲2秒
}
