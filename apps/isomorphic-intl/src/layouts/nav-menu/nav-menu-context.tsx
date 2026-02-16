"use client"

import React, {
  Dispatch,
  RefObject,
  createContext,
  useContext,
} from "react"

import type {
  ContentUiProps,
  InitialState,
  ItemRef,
  NavMenuDirection,
} from "./nav-menu-types"

export const initialState: InitialState = {
  itemWrapperLeft: null,
  itemWrapperRight: null,
  itemWrapperTop: null,
  itemWrapperHeight: null,
  hovering: null,
  hoveringElRect: null,
  hoveringWidth: null,
  popoverLeft: null,
  popoverHeight: null,
  popoverWidth: null,
}

interface NavMenuContextProps extends InitialState {
  set: Dispatch<any>
  contentRefs: RefObject<(HTMLElement | null)[]>
  contentUiPropsRefs: RefObject<(ContentUiProps | null)[]>
  items: React.RefObject<(ItemRef | null)[]>
  dir: NavMenuDirection
  handleMouseEnter: (index: number, el: HTMLElement) => void
}

const NavMenuContext = createContext<NavMenuContextProps | null>(null)

export function NavMenuProvider({
  value,
  children,
}: React.PropsWithChildren<{ value: NavMenuContextProps }>) {
  return (
    <NavMenuContext.Provider value={value}>{children}</NavMenuContext.Provider>
  )
}

export const useNavMenu = () => {
  const context = useContext(NavMenuContext)
  if (!context) {
    throw new Error("useNavMenu must be used within a NavMenuProvider")
  }
  return context
}
