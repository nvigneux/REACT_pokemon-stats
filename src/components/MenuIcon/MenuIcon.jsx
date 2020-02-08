import React, { useState } from "react"

// import style from "./MenuIcon.module.css"

export const useMenuIcon = () => {
  const [isActive, setIsActive] = useState(false)
  const toggle = () => setIsActive(!isActive)

  return [isActive, toggle]
}

export const MenuIcon = ({ isActive }) => {
  return (
    <div className={`btn ${isActive ? "active" : "notActive"}`}>
      <span className="span" />
      <span className="span" />
      <span className="span" />
    </div>
  )
}
