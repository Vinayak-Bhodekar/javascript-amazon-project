class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen;
  constructor(carDetail){
    this.#brand = carDetail.brand;
    this.#model = carDetail.model;
  }
  displayInfo(){
    console.log(this.#brand,this.#model,this.speed,this.isTrunkOpen ? 'Trunk Open':'Trunk Close');
  }
  go(){
    if(this.speed < 200 && !this.isTrunkOpen){
      this.speed+=5;
    }
  }
  break(){
    if(this.speed > 0){
    this.speed-=5;
  }
  }
  openTrunk(){
    if(this.speed === 0){
      this.isTrunkOpen = true;
    }
  }
  closeTrunk(){
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car{
  acceleration;
  constructor(carDetail) {
    super(carDetail);
    this.acceleration = carDetail.acceleration;
  }
  go() {
    if(this.speed < 300){
      this.speed += this.acceleration;
    }
  }
  openTrunk(){
    console.log('race car doesnt have trunk');
  }
  closeTrunk(){
    console.log('race car doesnt have trunk');
  }
}

const car1 = new Car({
  model: 'Harrier',
  brand: 'TATA'
  }
);

const racecar = new RaceCar({
  model: 'mclaren',
  brand: 'f1',
  acceleration: 250
});
racecar.go();
racecar.displayInfo();
car1.displayInfo();
