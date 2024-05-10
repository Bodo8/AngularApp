import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { AspectNamesVm, HouseNamesVm, PlanetNamesVm, ZodiacNamesVm } from "./models/planet-names-vm";

const baseUrl = `${environment.apiUrl}`;
const headers = { 'Content-Type': 'application/json'};

@Injectable({
    providedIn: 'root'
  })
export class HoroscopeNamesService
{
    constructor(private httpClient: HttpClient) { }

    getPlanetNames() : Observable<PlanetNamesVm> {
        return this.httpClient.get<PlanetNamesVm>(`${baseUrl}/api/PlanetStorage/GetPlanetNames`)
        .pipe(map(planetNamesVm => planetNamesVm));
    }

    getZodiacNames() : Observable<ZodiacNamesVm> {
        return this.httpClient.get<ZodiacNamesVm>(`${baseUrl}/api/PlanetStorage/GetZodiacNames`)
        .pipe(map(zodiacNamesVm => zodiacNamesVm));
    }

    getHouseNames() : Observable<HouseNamesVm> {
        return this.httpClient.get<HouseNamesVm>(`${baseUrl}/api/PlanetStorage/GetHouseNames`)
        .pipe(map(houseNamesVm => houseNamesVm));
    }

    getAspectNames() : Observable<AspectNamesVm> {
        return this.httpClient.get<AspectNamesVm>(`${baseUrl}/api/AspectStorage/GetAspectNames`)
        .pipe(map(aspectNamesVm => aspectNamesVm));
    }
}
