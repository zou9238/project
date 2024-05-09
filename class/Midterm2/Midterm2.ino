//左旋右旋(燈號LedPinA、B、C)
//紅綠燈(燈號LedPinA、B、C、D、E、F)
#include "music.h"  //載入音樂定義檔
#include "DHT.h" //載入溫溼度定義檔
#include "HCSR04.h" //載入距離定義檔
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#define LedPinA 5 
#define LedPinB 9
#define LedPinC 10
#define LedPinD 11
#define LedPinE 12
#define LedPinF 13
#define ButtonPinA 2
#define ButtonPinB 3
#define ButtonPinC 4
#define ButtonPinD 7
#define Buzzer 6    //指定蜂鳴器的接腳為pin 3
#define DHTPIN 8          //定義DHT pin腳
#define DHTTYPE DHT22     //支援類型有DHT22
#define TrigPIN 8             //定義發送端Trig pin腳(超音波)
#define EchoPIN 6              //定義接收端Echo pin腳
int cnt=0;//左旋右旋serial monitor顯示計算
const int potPin=A0,ledPin=5;//可電電阻A3!
int val,pre_val=0,duty,num;
int randomnumber[6]={5,9,10,11,12,13};//隨機燈號
int numm=-1, flag=0; //蜂鳴器
int speed[4]={S140, S80, S60, S60};   //三首歌的速度
//定義音高,XX表結束
int pitch[4][30]={
{G4,E4,E4,0,F4,D4,D4,0,C4,D4,E4,F4,G4,G4,G4,0,XX},     //小蜜蜂
{C4,C4,D4,E4,E4,D4,C4,D4,E4,C4,0,E4,E4,F4,G4,G4,F4,E4,F4,G4,E4,0,XX},//蝴蝶
{C4,C4,D4,F4,G4,F4,G4,A4,0,C5,A4,A4,G4,F4,G4,0,0,XX}, //望春風
{C4,C4,G4,G4,A4,A4,G4,0,F4,F4,E4,E4,D4,D4,C4,0,XX}}; //小星星
//定義節拍
float tempo[4][30]={
{T4,T4,T4,T4,T4,T4,T4,T4,T4,T4,T4,T4,T4,T4,T4,T4 },      //小蜜蜂
{T4,T8,T8,T4,T4,T8,T8,T8,T8,T4,T4,T4,T8,T8,T4,T4,T8,T8,T8,T8,T4,T4},//蝴蝶
{T4d,T8,T4,T4,T4,T8,T8,T4,T4,T4d,T8,T8,T8,T4,T2,T4,T4}, //望春風
{T8,T8,T8,T8,T8,T8,T8,T8,T8,T8,T8,T8,T8,T8,T8,T8}}; //小星星
DHT dht(DHTPIN, DHTTYPE); //宣告DHT物件
HCSR04 myHC(TrigPIN,EchoPIN);  //宣告HCSR04物件
LiquidCrystal_I2C lcd(0x27,16,2);
void setup() {
  Serial.begin(9600);
  dht.begin();          //初始化DHT22
  pinMode(potPin,INPUT);//可電電阻腳位
  pinMode(ledPin,OUTPUT);
  pinMode(LedPinA,OUTPUT);//燈號腳位
  pinMode(LedPinB,OUTPUT);
  pinMode(LedPinC,OUTPUT);
  pinMode(LedPinD,OUTPUT);
  pinMode(LedPinE,OUTPUT);
  pinMode(LedPinF,OUTPUT);
  pinMode(Buzzer,OUTPUT);//蜂鳴器腳位
  pinMode(ButtonPinA,INPUT_PULLUP);//開關腳位
  pinMode(ButtonPinB,INPUT_PULLUP);
  pinMode(ButtonPinC,INPUT_PULLUP);
  pinMode(ButtonPinD,INPUT_PULLUP);
  digitalWrite(LedPinA,LOW);
  digitalWrite(LedPinB,LOW);
  digitalWrite(LedPinC,LOW);
  digitalWrite(LedPinD,LOW);
  digitalWrite(LedPinE,LOW);
  digitalWrite(LedPinF,LOW);
  Serial.print("cnt= ");//左旋右旋serial monitor顯示計算
  Serial.println(cnt);
  randomSeed(analogRead(A0));//隨機燈號
  lcd.init();//初始化lcd
  lcd.backlight();

}

void loop() {
  if(digitalRead(ButtonPinA)==LOW && digitalRead(ButtonPinB)==HIGH && digitalRead(ButtonPinC)==HIGH && digitalRead(ButtonPinD)==HIGH)//第一題(左旋)
  {
     cnt++;
     Serial.print("cnt= ");
     Serial.println(cnt);
     digitalWrite(LedPinA,HIGH);delay(500); digitalWrite(LedPinA,LOW);
     digitalWrite(LedPinB,HIGH); delay(500); digitalWrite(LedPinB,LOW);
     digitalWrite(LedPinC,HIGH); delay(500); digitalWrite(LedPinC,LOW);
  }
  else
  {
      digitalWrite(LedPinA,LOW);
      digitalWrite(LedPinB,LOW);
      digitalWrite(LedPinC,LOW);
  }
  if(digitalRead(ButtonPinA)==HIGH && digitalRead(ButtonPinB)==LOW && digitalRead(ButtonPinC)==HIGH && digitalRead(ButtonPinD)==HIGH)//第二題(右旋)
  {
      cnt--;
      Serial.print("cnt= ");
      Serial.println(cnt);
      digitalWrite(LedPinC,HIGH); delay(500); digitalWrite(LedPinC,LOW);
      digitalWrite(LedPinB,HIGH); delay(500); digitalWrite(LedPinB,LOW);
      digitalWrite(LedPinA,HIGH); delay(500); digitalWrite(LedPinA,LOW);
  }
  else
  {
      digitalWrite(LedPinA,LOW);                
      digitalWrite(LedPinB,LOW);
      digitalWrite(LedPinC,LOW);
  }
  if(digitalRead(ButtonPinA)==HIGH && digitalRead(ButtonPinB)==HIGH && digitalRead(ButtonPinC)==LOW && digitalRead(ButtonPinD)==HIGH)//第三題(可變電組)
  {
      val=analogRead(potPin);
    if(val>pre_val+2 || val<pre_val-2)
    {
        duty=map(val,0,1023,0,255);
        analogWrite(ledPin,duty);
        Serial.print(val);
        Serial.print(" -> ");
        Serial.println(duty);
        pre_val=val;
    }
        delay(500);    
  }
  else
  {
      digitalWrite(LedPinA,LOW);
  }
  if(digitalRead(ButtonPinA)==HIGH && digitalRead(ButtonPinB)==HIGH && digitalRead(ButtonPinC)==HIGH && digitalRead(ButtonPinD)==LOW)//第四題(紅綠燈)
  {
     for(int i=0;i<3;i++)
  {
  digitalWrite(LedPinA,HIGH);
  digitalWrite(LedPinF,HIGH);
  delay(1000);
    if(i=2)
    {
        digitalWrite(LedPinF,LOW);      
      for(int j=0;j<2;j++)
      {
        digitalWrite(LedPinE,HIGH);
        delay(500); 
        digitalWrite(LedPinE,LOW);
        delay(500);      
      }
    }
    digitalWrite(LedPinA,LOW);  
  }
   for(int i=0;i<3;i++)
  {
  digitalWrite(LedPinD,HIGH);
  digitalWrite(LedPinC,HIGH);
  delay(1000);
    if(i=2)
    {
        digitalWrite(LedPinC,LOW);      
      for(int j=0;j<2;j++)
      {
        digitalWrite(LedPinB,HIGH);
        delay(500); 
        digitalWrite(LedPinB,LOW);
        delay(500);    
      }
    }
    digitalWrite(LedPinD,LOW);  
  }
}
  else
  {
    digitalWrite(LedPinA,LOW);
    digitalWrite(LedPinB,LOW);
    digitalWrite(LedPinC,LOW);
    digitalWrite(LedPinD,LOW);
    digitalWrite(LedPinE,LOW);
    digitalWrite(LedPinF,LOW);
  }
  if(digitalRead(ButtonPinA)==LOW && digitalRead(ButtonPinB)==LOW && digitalRead(ButtonPinC)==HIGH && digitalRead(ButtonPinD)==HIGH)//第五題(隨機)
  {
    num=random(0,6);
    Serial.print("num=");  
    Serial.println(num);
    digitalWrite(randomnumber[num],HIGH);
    delay(1000);
    digitalWrite(randomnumber[num],LOW);
    delay(100);
  }
   else
  {
    digitalWrite(LedPinA,LOW);
    digitalWrite(LedPinB,LOW);
    digitalWrite(LedPinC,LOW);
    digitalWrite(LedPinD,LOW);
    digitalWrite(LedPinE,LOW);
    digitalWrite(LedPinF,LOW);
  }
 if(digitalRead(ButtonPinA)==LOW && digitalRead(ButtonPinB)==HIGH && digitalRead(ButtonPinC)==LOW && digitalRead(ButtonPinD)==HIGH)//第六題(蜂鳴器)
     { numm=++numm%4; flag=1; //若是，就代表按下開關，num+1後取的餘數
      if(flag==1) 
      { play(numm); flag=0; }
     }
  else
  {
    digitalWrite(Buzzer,LOW);
  }    
    if(digitalRead(ButtonPinA)==LOW && digitalRead(ButtonPinB)==HIGH && digitalRead(ButtonPinC)==HIGH && digitalRead(ButtonPinD)==LOW)//第七題(溫濕度)
  {
    float h = dht.readHumidity();     //讀取濕度資料
  float t = dht.readTemperature();  //讀取溫度資料
  Serial.print("Humi.="); Serial.print(h);    //印出濕度數值
  Serial.print(", Temp.="); Serial.println(t);  //印出溫度數值
  delay(5000);                      //延遲5秒
  int range = myHC.dist();  //讀取距離資料
  Serial.print("Range="); Serial.println(range);   //印出距離數值
  delay(1000);              //延遲2秒
  }
if(digitalRead(ButtonPinA)==HIGH && digitalRead(ButtonPinB)==LOW && digitalRead(ButtonPinC)==LOW && digitalRead(ButtonPinD)==HIGH)//第八題(超音波)
  {
    int range = myHC.dist();  //讀取距離資料
    Serial.print("Range="); Serial.println(range);   //印出距離數值
    delay(2000);              //延遲2秒
  }
  if(digitalRead(ButtonPinA)==HIGH && digitalRead(ButtonPinB)==LOW && digitalRead(ButtonPinC)==HIGH && digitalRead(ButtonPinD)==LOW)//第九題(lcd)
  {
    lcd.setCursor(2,0);
    lcd.print("Hellow World!");
    lcd.setCursor(2,1);
    lcd.print("Crazy Maker!");
  }
}
//第六題
void play(int numm) {
int i, T1time, duration;
  T1time=4*60000/speed[numm];          //計算全音符T1的時間(ms)
  for(i=0;;i++) {
    if(pitch[numm][i]==9999) return;   //判斷結尾       
    duration=T1time*tempo[numm][i];    //計算節拍時間(ms)
    tone(Buzzer,pitch[numm][i],duration/2);  //演奏一半，聽起來更自然
    delay(duration/2);                //停頓一半，才不會所有的音都連在一起
  }
}