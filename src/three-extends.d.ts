/// <reference types="react" />
import type { BufferGeometryNode } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
export declare type TextBufferGeometryProps = BufferGeometryNode<
  TextGeometry,
  typeof TextGeometry
>
export interface ThreeExtendsElement {
  textGeometry: TextBufferGeometryProps
}

export declare global {
  export namespace JSX {
    export interface IntrinsicElements extends ThreeExtendsElement {}
  }
}
