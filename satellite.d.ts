declare module "satellite.js" {
  export interface SatRec {
    satnum: string;
    epochyr: number;
    epochdays: number;
    ndot: number;
    nddot: number;
    bstar: number;
    inclo: number;
    nodeo: number;
    ecco: number;
    argpo: number;
    mo: number;
    no: number;
    error: number;
  }

  export interface EciVec3<T> {
    x: T;
    y: T;
    z: T;
  }

  export interface GeodeticPosition {
    longitude: number;
    latitude: number;
    height: number;
  }

  export interface LookAngles {
    azimuth: number;
    elevation: number;
    rangeSat: number;
  }

  export function twoline2satrec(longstr1: string, longstr2: string): SatRec;
  export function propagate(satrec: SatRec, date: Date): { position: EciVec3<number> | null; velocity: EciVec3<number> | null } | null;
  export function sgp4(satrec: SatRec, minutesSinceEpoch: number): { position: EciVec3<number>; velocity: EciVec3<number> } | null;
  export function gstime(date: Date | number): number;
  export function eciToGeodetic(position: EciVec3<number>, gmst: number): GeodeticPosition;
  export function eciToEcf(position: EciVec3<number>, gmst: number): EciVec3<number>;
  export function degreesLat(radians: number): number;
  export function degreesLong(radians: number): number;
  export function geodeticToEcf(geo: { longitude: number; latitude: number; height: number }): EciVec3<number>;
  export function ecfToLookAngles(observer: { longitude: number; latitude: number; height: number }, satellite: EciVec3<number>): LookAngles;
  export function dopplerFactor(observer: EciVec3<number>, position: EciVec3<number>, velocity: EciVec3<number>): number;
  export function json2satrec(omm: Record<string, unknown>): SatRec;

  export const enum SatRecError {
    Decayed = 1,
    // ... other error codes
  }
}
