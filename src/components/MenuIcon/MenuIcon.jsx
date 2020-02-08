import React, { useState } from "react"

// import style from "./MenuIcon.module.css"

export const useMenuIcon = () => {
  const [isActive, setIsActive] = useState(false)
  const toggle = () => setIsActive(!isActive)

  return [isActive, toggle]
}

export const MenuIcon = ({ isActive }) => {
  return (
    <div
      className={`btn-menu absolute w-8 t-1/2 cursor-pointer ${
        isActive ? "active" : "notActive"
      }`}
    >
      <span className="menu-bar block w-full rounded-sm h-1 bg-white transition-all duration-300 relative" />
      <span className="menu-bar block w-full rounded-sm h-1 bg-white transition-all duration-300 relative" />
      <span className="menu-bar block w-full rounded-sm h-1 bg-white transition-all duration-300 relative" />
    </div>
  )
}
