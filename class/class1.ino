void setup() {
  Serial.begin(9600);
  pinMode(13,OUTPUT);
  Serial.print("boolean=");
  Serial.println(sizeof(boolean));
  Serial.print("char=");
  Serial.println(sizeof(char));
  Serial.print("int=");
  Serial.println(sizeof(int));
  Serial.print("word=");
  Serial.println(sizeof(word));
  Serial.print("long=");
  Serial.println(sizeof(long));
  Serial.print("short=");
  Serial.println(sizeof(short));
  Serial.print("float=");
  Serial.println(sizeof(float));
  Serial.print("double=");
  Serial.println(sizeof(double));
}
void loop() {
  Serial.print("Hello\n");
  delay(1000);
  Serial.print("My name is 鄒卉安\n");
  delay(1000);
  Serial.print("學號:s1411032006\n");
  delay(1000);
  Serial.print("LED_13_on\n");
  digitalWrite(13,HIGH);
  delay(1000);
  Serial.print("LED_13_off\n");
  digitalWrite(13,LOW);
  delay(1000);
}
