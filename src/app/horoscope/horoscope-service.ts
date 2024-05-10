import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AspectStorageVm } from "../horoscope-storage/models/aspect-storage-vm";
import { AspectParameters } from "./models/aspect-query";
import { PlanetHoroscopeQuery } from "./models/planet-horoscope-query";
import { PlanetStorageVm } from "./models/planet-storage-vm";
import { HoroscopeParameterDto, HoroscopeParametersVm } from "./models/horoscope-parameter-dto";
import { Observable } from "rxjs";
import { HoroscopeQuery } from "./models/horoscope-query";
import { HoroscopeDto } from "./models/horoscope-dto";
import { map } from "rxjs/operators";

const baseUrl = `${environment.apiUrl}`;
const headers = { 'Content-Type': 'application/json'};

@Injectable({
    providedIn: 'root'
  })

export class HoroscopeService {

    constructor(private httpClient: HttpClient) { }

  getPlanetAspects(parameters: AspectParameters[])
  {  
    return this.httpClient.post<AspectStorageVm>(`${baseUrl}/api/Horoscope/GetAspects`, parameters, {headers})
  .pipe(map(aspectStorageVm => aspectStorageVm));
  }

  getPlanetInSigns(parameters: PlanetHoroscopeQuery)
  {  
    return this.httpClient.post<PlanetStorageVm>(`${baseUrl}/api/Horoscope/GetPersonalPlanet`, parameters, {headers})
  .pipe(map(planetStorageVm => planetStorageVm));
  }

  createHoroscope(id: number, horoscope: HoroscopeParameterDto) 
  {
    return this.httpClient.post<HoroscopeParameterDto>(`${baseUrl}/api/Horoscope/AddHoroscopeParameters/${id}`, horoscope, {headers})
    .pipe(map(response => response))
  }

  getParametersHoroscope(id: number) : Observable<HoroscopeParametersVm>
  {  
    return this.httpClient.get<HoroscopeParametersVm>(`${baseUrl}/api/Horoscope/GetHoroscopeParameters/${id}`, {headers})
    .pipe(map(aspectStorageVm => aspectStorageVm));
  }

  getHoroscope(id: number, horoscopeQuery: HoroscopeQuery) {
    return this.httpClient.post<HoroscopeDto>(`${baseUrl}/api/Horoscope/GetHoroscope/${id}`, horoscopeQuery, {headers})
    .pipe(map(horoscopeDto => horoscopeDto));
  }
}