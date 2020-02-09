import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

// Style
import style from "./Popin.module.css"

export const usePopin = () => {
  const [isDisplayed, setIsShowing] = useState(false)
  const toggle = () => setIsShowing(!isDisplayed)
  return [isDisplayed, toggle]
}

export const Popin = ({ children, isDisplayed }) => {
  useEffect(() => {
    const addBodyStyle = () => {
      document.body.style.position = "fixed"
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.right = 0
      document.body.style.left = 0
      document.body.style.maxHeight = "100vh"
    }

    const cleanBodyStyle = () => {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1)
    }

    if (isDisplayed) addBodyStyle()
    else cleanBodyStyle()

    return () => cleanBodyStyle()
  }, [isDisplayed])

  return isDisplayed
    ? ReactDOM.createPortal(
        <>
          <div className={`${style.modal}`}>
            <div className={style.content}>{children}</div>
          </div>
        </>,
        document.body
      )
    : null
}

Popin.propTypes = {
  children: PropTypes.node.isRequired,
  isDisplayed: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Popin
