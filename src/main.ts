// import './style.css'
import { type IVec, Vec } from './vec.ts'

function toRadian(angle: number) {
  return (angle * Math.PI) / 180;
}

function generalRotatePoint(
  point: [number, number],
  center: IVec,
  rotate: number
): [number, number] {
  const rad = toRadian(rotate);
  return Vec.add(center, Vec.rot(Vec.sub(point, center), rad)) as [
    number,
    number,
  ];
}

function nativeRotatePoint(
  point: [number, number],
  center: IVec,
  rotate: number
): DOMPoint {
  const m = new DOMMatrix().translateSelf(...center).rotateSelf(rotate).translateSelf(-center[0], -center[1]);
  return new DOMPoint(...point).matrixTransform(m)
}

function native2RotatePoint(
  point: [number, number],
  m: DOMMatrix
): DOMPoint {
  return new DOMPoint(...point).matrixTransform(m)
}

globalThis.generalRotatePoint = generalRotatePoint;
globalThis.nativeRotatePoint = nativeRotatePoint;
globalThis.native2RotatePoint = native2RotatePoint;
