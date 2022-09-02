import React from 'react'
interface ForLoopProps {
  startIndex?: number
  next?: (index: number) => number
  condition?: (index: number) => boolean
  children?: (index: number) => React.ReactNode
}
export function ForLoop(props: ForLoopProps) {
  const chilren: React.ReactNode[] = []
  for (
    let i = props.startIndex || 0;
    props.condition ? props.condition(i) : true;
    i = props.next ? props.next(i) : i + 1
  ) {
    props.children && chilren.push(props.children(i))
  }
  return { chilren }
}
