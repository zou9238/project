#define ButtonPinA 2
#define ButtonPinB 3
#define ButtonPinC 4
#define LedPinA 5
#define LedPinB 9
#define LedPinC 10
#define LedPinD 11
#define LedPinE 12
#define LedPinF 13
const int potPin=A0,ledPin=5;
int val,pre_val=0,duty,num;
int randomnumber[6]={5,9,10,11,12,13};
void setup() {
  Serial.begin(9600);
  pinMode(potPin,INPUT);
  pinMode(ledPin,OUTPUT);
  pinMode(LedPinA,OUTPUT);
  pinMode(LedPinB,OUTPUT);
  pinMode(LedPinC,OUTPUT);
  pinMode(LedPinD,OUTPUT);
  pinMode(LedPinE,OUTPUT);
  pinMode(LedPinF,OUTPUT);
  pinMode(ButtonPinA,INPUT_PULLUP);
  pinMode(ButtonPinB,INPUT_PULLUP);
  pinMode(ButtonPinC,INPUT_PULLUP);
  digitalWrite(LedPinA,LOW);
  digitalWrite(LedPinB,LOW);
  digitalWrite(LedPinC,LOW);
  digitalWrite(LedPinD,LOW);
  digitalWrite(LedPinE,LOW);
  digitalWrite(LedPinF,LOW);
  randomSeed(analogRead(A0));
}

void loop() {
  //SW1開關
  if(digitalRead(ButtonPinA)==LOW)
{
  val=analogRead(potPin);
  if(val>pre_val+2 || val<pre_val-2){
    duty=map(val,0,1023,0,255);
    analogWrite(ledPin,duty);
    Serial.print(val);
    Serial.print(" -> ");
    Serial.println(duty);
    pre_val=val;
  }
  }
  else
  {
    digitalWrite(LedPinA,LOW);
  }

  //SW2開關
  if(digitalRead(ButtonPinB)==LOW)
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
  //SW3
 if(digitalRead(ButtonPinC)==LOW)
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
}
  

/*  num=random(6);
  Serial.print("num=");  
  Serial.println(num);
  digitalWrite(randomnumber[num],HIGH);
  delay(10000);*/