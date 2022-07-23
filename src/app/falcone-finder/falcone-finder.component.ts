import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FalconeLocatorService } from '../falcone-locator.service';
import { Vehicle } from '../types/vehicle';

export type planetType = 'planet1' | 'planet2' | 'planet3' | 'planet4';

@Component({
  selector: 'app-falcone-finder',
  templateUrl: './falcone-finder.component.html',
  styleUrls: ['./falcone-finder.component.css'],
})
export class FalconeFinderComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private fls: FalconeLocatorService,
    private router: Router
  ) {}

  isSubmitted = false;
  planets: any = [];

  vehicles: Vehicle[] = [];
  VehicleMap: any = {};

  profileForm = this.fb.group({
    planet1: ['', [Validators.required]],
    planet2: ['', [Validators.required]],
    planet3: ['', [Validators.required]],
    planet4: ['', [Validators.required]],
    vehicle1: ['', [Validators.required]],
    vehicle2: ['', [Validators.required]],
    vehicle3: ['', [Validators.required]],
    vehicle4: ['', [Validators.required]],
  });

  planet_names = [];
  vehicle_names = [];
  availabeVehicleMap: any = {};
  vehicleSpeedMap: any = {};
  vehicleMaxDistanceMap: any = {};

  totalTime = 0;
  selectedPlanets: any = [];
  selectedVehicles: any = [];
  result = '';
  planet_name = '';
  planetDistanceMap: any = {};
  ngOnInit(): void {
    this.fls.getPlanets().subscribe((planets: any) => {
      console.log('planets', planets);
      this.planets = planets;
      for (let pl of this.planets) {
        this.planetDistanceMap[pl.name] = pl.distance;
      }
    });
    this.fls.getVehicles().subscribe((vehicles: any) => {
      console.log('vehicles', vehicles);
      this.vehicles = vehicles;
      for (let vehicle of this.vehicles) {
        this.VehicleMap[vehicle.name] = vehicle.total_no;
        this.availabeVehicleMap[vehicle.name] = vehicle.total_no;
        this.vehicleSpeedMap[vehicle.name] = vehicle.speed;
        this.vehicleMaxDistanceMap[vehicle.name] = vehicle.max_distance;
      }
    });

    this.selectedPlanets.push(this.profileForm.value.planet1);
  }
  onSubmit() {
    this.fls
      .find({ planets: this.selectedPlanets, vehicles: this.selectedVehicles })
      .subscribe((res) => {
        this.result = res.status;
        if (this.result) {
          this.planet_name = res.planet_name;
          this.router.navigate(['success', this.planet_name]);
        }else{
          window.alert("planet not found.Please try again...")
        }
        console.log(res);
      });
    console.log(this.profileForm.value);
  }
  getVehicleMap({
    vehicle1,
    vehicle2,
    vehicle3,
    vehicle4,
    planet1,
    planet2,
    planet3,
    planet4,
  }: any) {
    this.totalTime = 0;
    const vehicles = [vehicle1, vehicle2, vehicle3, vehicle4];
    const distance1 = planet1
      ? this.planets.filter((pla: any) => pla.name == planet1)[0].distance
      : 0;
    const timeTaken1 = vehicle1
      ? distance1 / this.vehicleSpeedMap[vehicle1]
      : 0;

    const distance2 = planet2
      ? this.planets.filter((pla: any) => pla.name == planet2)[0].distance
      : 0;
    const timeTaken2 = vehicle2
      ? distance2 / this.vehicleSpeedMap[vehicle2]
      : 0;

    const distance3 = planet3
      ? this.planets.filter((pla: any) => pla.name == planet3)[0].distance
      : 0;
    const timeTaken3 = vehicle3
      ? distance3 / this.vehicleSpeedMap[vehicle3]
      : 0;
    const distance4 = planet4
      ? this.planets.filter((pla: any) => pla.name == planet4)[0].distance
      : 0;
    const timeTaken4 = vehicle4
      ? distance4 / this.vehicleSpeedMap[vehicle4]
      : 0;
    this.totalTime = timeTaken1 + timeTaken2 + timeTaken3 + timeTaken4;
    const st: any = {};
    vehicles.forEach((vehicle: string) => {
      if (st[vehicle]) {
        st[vehicle]--;
      } else {
        st[vehicle] = this.availabeVehicleMap[vehicle] - 1;
      }
    });
    this.VehicleMap = { ...this.availabeVehicleMap, ...st };
  }

  isDisabled(vehicle: string, planet: planetType) {
    let planetName: string = this.profileForm.value[planet] as string;
    let unreachableDistance =
      this.planetDistanceMap[planetName] > this.vehicleMaxDistanceMap[vehicle];

    return this.VehicleMap[vehicle] <= 0 || unreachableDistance ? true : null;
  }

  onvehiclechange() {
    // console.log(this.profileForm.value);
    const {
      planet1,
      planet2,
      planet3,
      planet4,
      vehicle1,
      vehicle2,
      vehicle3,
      vehicle4,
    } = this.profileForm.value;
    this.selectedPlanets = [planet1, planet2, planet3, planet4].filter(
      (planet) => planet
    );

    this.selectedVehicles = [vehicle1, vehicle2, vehicle3, vehicle4].filter(
      (vehicle) => vehicle
    );

    this.profileForm.valueChanges.subscribe((val) => console.log(val));
    this.getVehicleMap(this.profileForm.value);
  }
  filterplanets(planet: any) {
    return !this.selectedPlanets.include(planet);
  }
}
