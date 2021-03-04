import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


export interface Car{
  model: string,
  price: number,
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl = `http://dhsrv/tools/elements`;
  cars: Car[] = [];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Car[]> {
    return this.http.get(`${this.baseUrl}/list.php`).pipe(
      map((res) => {
        // this.cars = res.data;
        this.cars = (res as unknown as Car[]);
        return this.cars;
      }),
      catchError(this.handleError)
    );
  }

  store(car: Car): Observable<Car[]>{
    return this.http.post(`${this.baseUrl}/store.php`, JSON.stringify({data: car})).pipe(
      map((res: any) => {
        this.cars.push(res['data']);
        return this.cars;
      }),
      catchError(this.handleError)
    )
  }

  update(car: Car): Observable<Car[]>{
    return this.http.put(`${this.baseUrl}/update.php`, JSON.stringify({data: car})).pipe(
      map((res) => {
        let theCar = this.cars.find((item: any) => {
          return +item['id'] === +car.id 
        });
        if(theCar){
          theCar['price'] = +car['price'];
          theCar['model'] = car['model'];
        }
        return this.cars;
      }),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<Car[]>{
    const params = new HttpParams().set('id', id.toString());

    return this.http.delete(`${this.baseUrl}/delete.php`, {params: params}).pipe(
      map(res => {
        const filterCars = this.cars.filter((car) => {
          return +car['id'] !== +id;
        });
        return this.cars = filterCars;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
