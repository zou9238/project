void setup() {
  Serial.begin(9600);
  int A=10;
  int B=20;
  int *p;
  Serial.print("&A:");
  Serial.println((long)&A,HEX);
  p=&A;
  Serial.print("&p:");
  Serial.println((long)&p,HEX);
  Serial.print("p:");
  Serial.println((long)p,HEX);
  Serial.print("&(p-1):");
  Serial.println(*(p-1));
}

void loop() {

}
