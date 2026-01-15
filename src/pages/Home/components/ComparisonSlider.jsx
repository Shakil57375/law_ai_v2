

import React, { useState, useRef, useEffect } from "react"

const ComparisonSlider = ({ beforeData, afterData }) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const updatePosition = (clientX) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    updatePosition(e.clientX)
    document.body.style.userSelect = "none"
    document.body.style.cursor = "ew-resize"
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    updatePosition(e.touches[0].clientX)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return
      updatePosition(e.clientX)
    }

    const handleTouchMove = (e) => {
      if (!isDragging) return
      updatePosition(e.touches[0].clientX)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }

    const handleTouchEnd = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchmove", handleTouchMove, { passive: true })
      document.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging])

  const renderContent = (content) => {
    return content.map((item, index) => {
      if (item.type === "paragraph") {
        return <p key={index}>{item.content}</p>
      } else if (item.type === "heading") {
        const HeadingTag = `h${item.level}`
        return React.createElement(HeadingTag, { key: index }, item.content)
      } else if (item.type === "list") {
        const ListTag = item.ordered ? "ol" : "ul"
        return React.createElement(
          ListTag,
          { key: index },
          item.items.map((listItem, listIndex) => <li key={listIndex}>{listItem}</li>),
        )
      }
      return null
    })
  }

  return (
    <div className="slider-container active" ref={containerRef} style={{ "--slider-position": `${sliderPosition}%` }}>
      {/* Before panel */}
      <div className="text-panel panel-before">
        <div className="panel-header header-before">
          <span className="panel-title">{beforeData.title}</span>
          <span className="panel-date">{beforeData.subtitle}</span>
        </div>
        <div className="panel-content">
          <h2 className="section-title">{beforeData.contentTitle}</h2>
          <div className="section-content">{renderContent(beforeData.content)}</div>
        </div>
      </div>

      {/* After panel */}
      <div className="text-panel panel-after">
        <div className="panel-header header-after">
          <span className="panel-title">{afterData.title}</span>
          <span className="panel-date">{afterData.subtitle}</span>
        </div>
        <div className="panel-content">
          <h2 className="section-title">{afterData.contentTitle}</h2>
          <div className="section-content">{renderContent(afterData.content)}</div>
        </div>
      </div>

      {/* Slider controls */}
      <div className="slider-divider"></div>
      <div className="slider-handle" onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}></div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="slider-range"
        aria-label="Comparison slider"
      />
    </div>
  )
}

export default ComparisonSlider
