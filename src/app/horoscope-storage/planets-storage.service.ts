
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { AspectStorage } from "./models/aspect-storage";
import { PlanetStorage } from "./models/planet-storage";
import { PlanetStorageDTO } from "./models/planet-storageDTO";
import { AspectStorageVm } from "./models/aspect-storage-vm";
import { PlanetStorageUpdate } from "./models/planet-storage-update";

const baseUrl = `${environment.apiUrl}`;
const headers = { 'Content-Type': 'application/json'};

@Injectable({
    providedIn: 'root'
  })
export class PlanetsStorageService
{
  
  constructor(private httpClient: HttpClient) { }

  getPlanetStorage(planetEdit: string)
  {  return this.httpClient.get<PlanetStorageDTO>(`${baseUrl}/api/PlanetStorage?name=${planetEdit}`)
        .pipe(map(planetStorageDTO => planetStorageDTO));
  }

  updatePlanetStorage(planetStorageUpdate: PlanetStorageUpdate) {
    return this.httpClient.put<PlanetStorageUpdate>(`${baseUrl}/api/PlanetStorage/UpdatePlanetStorage`, planetStorageUpdate, {headers})
}

createPlanetStorage(planetStorage: PlanetStorage) {
  return this.httpClient.post<PlanetStorage>(`${baseUrl}/api/PlanetStorage`, planetStorage, {headers})
}

createAspectPlanet(aspectStorage: AspectStorage) {
  return this.httpClient.post<AspectStorage>(`${baseUrl}/api/AspectStorage`, aspectStorage, {headers})
}

getAspectStorage(planetName: string)
  { 
    return this.httpClient
    .get<AspectStorageVm>(`${baseUrl}/api/AspectStorage/GetByName?PlanetName=${planetName}`)
    .pipe(map(aspectStorageVm => aspectStorageVm));
  }

  updateAspectStorage(aspect: AspectStorage) {
    return this.httpClient
    .put<AspectStorage>(`${baseUrl}/api/AspectStorage`, aspect, {headers})
  }
}