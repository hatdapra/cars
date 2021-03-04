import { Component, OnInit } from '@angular/core';
import { Car, CarService } from './services/car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cars';
  cars: Car[] = [];
  error = '';
  success = '';
  car: Car = {model: '', price: 0, id: 0};

  constructor(private carService: CarService){

  }

  ngOnInit(){
    this.getCars();
  }

  getCars(): void {
    this.carService.getAll().subscribe(
      (res: Car[]) => {
        this.cars = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  addCar(f: any){
    this.error = '';
    this.success = '';

    this.carService.store(this.car).subscribe(
      (res: Car[]) => {
        this.cars = res;
        this.success = 'Created successfully';
        f.reset();
      },
      (err) => this.error = err
    );
  }

  updateCar(name: any, price: any, id: any){
    this.success = '';
    this.error = '';

    this.carService.update({ model: name.value, price: price.value, id: +id })
      .subscribe(
        (res) => {
          this.cars    = res;
          this.success = 'Updated successfully';
        },
        (err) => this.error = err
      );
  }

  deleteCar(id: any){
    this.success = '';
    this.error = '';
    this.carService.delete(+id).subscribe(
      (res: Car[]) => {
        this.cars = res;
        this.success = 'Deleted successfully';
      },
      (err) => this.error = err
    );
  }
}
