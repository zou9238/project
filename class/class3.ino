#define LedPinA 13
#define LedPinB 12
#define LedPinC 11
#define ButtonPinA 2
#define ButtonPinB 3
int cnt=0;
void setup() {
 Serial.begin(9600);
pinMode(LedPinA,OUTPUT);
pinMode(LedPinB,OUTPUT);
pinMode(LedPinC,OUTPUT);
pinMode(ButtonPinA,INPUT_PULLUP);
pinMode(ButtonPinB,INPUT_PULLUP);
digitalWrite(LedPinA,LOW);
digitalWrite(LedPinB,LOW);
digitalWrite(LedPinC,LOW);
Serial.print("cnt= ");
Serial.println(cnt);
}

void loop() {
if(digitalRead(ButtonPinA)==LOW)
{
  cnt++;
  Serial.print("cnt= ");
  Serial.println(cnt);
  digitalWrite(LedPinA,HIGH);delay(500); digitalWrite(LedPinA,LOW);
  digitalWrite(LedPinB,HIGH); delay(500); digitalWrite(LedPinB,LOW);
  digitalWrite(LedPinC,HIGH); delay(500); digitalWrite(LedPinC,LOW);
}
if(digitalRead(ButtonPinB)==LOW)
{
  cnt--;
  Serial.print("cnt= ");
  Serial.println(cnt);
  digitalWrite(LedPinC,HIGH); delay(500); digitalWrite(LedPinC,LOW);
  digitalWrite(LedPinB,HIGH); delay(500); digitalWrite(LedPinB,LOW);
  digitalWrite(LedPinA,HIGH); delay(500); digitalWrite(LedPinA,LOW);
}                                                                                   
}
