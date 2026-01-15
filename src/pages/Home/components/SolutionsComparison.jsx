import { useState } from "react"
import ComparisonSlider from "./ComparisonSlider"
import { solutionsData } from "../data/solutionsData"

const SolutionsComparison = () => {
  const [activeCategory, setActiveCategory] = useState("TranscriptX")
  const [activeExample, setActiveExample] = useState("intro1")
  const [isCollapsed, setIsCollapsed] = useState(true)

  const categories = ["TranscriptX", "Chartwright", "Redactify", "Validify"]

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    const firstExample = Object.keys(solutionsData[category])[0]
    setActiveExample(firstExample)
  }

  const handleExampleChange = (exampleId) => {
    setActiveExample(exampleId)
  }

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed)
  }

  const getCurrentExamples = () => {
    return Object.keys(solutionsData[activeCategory] || {})
  }

  const getCurrentExampleIndex = () => {
    const examples = getCurrentExamples()
    return examples.indexOf(activeExample)
  }

  const navigateExample = (direction) => {
    const examples = getCurrentExamples()
    const currentIndex = getCurrentExampleIndex()

    if (direction === "prev" && currentIndex > 0) {
      setActiveExample(examples[currentIndex - 1])
    } else if (direction === "next" && currentIndex < examples.length - 1) {
      setActiveExample(examples[currentIndex + 1])
    }
  }

  const currentData = solutionsData[activeCategory]?.[activeExample]
  const examples = getCurrentExamples()
  const currentIndex = getCurrentExampleIndex()

  return (
    <div className={`comparison-container ${isCollapsed ? "collapsed" : ""}`}>
      {/* Main category tabs */}
      <div className="main-navigation">
        {categories.map((category) => (
          <div
            key={category}
            className={`main-tab ${activeCategory === category ? "active" : ""}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Toggle for expand/collapse */}
      <div className="comparison-toggle" onClick={toggleCollapsed}>
        {isCollapsed ? "Click to expand comparison" : "Click to collapse comparison"}
      </div>

      {/* Sub-navigation for examples */}
      {!isCollapsed && (
        <div className="sub-navigation active">
          {examples.map((exampleId) => {
            const exampleData = solutionsData[activeCategory][exampleId]
            return (
              <div
                key={exampleId}
                className={`sub-tab ${activeExample === exampleId ? "active" : ""}`}
                onClick={() => handleExampleChange(exampleId)}
              >
                {exampleData.tabLabel}
              </div>
            )
          })}
        </div>
      )}

      {/* Content section */}
      {!isCollapsed && currentData && (
        <div className="content-section active">
          <h3 className="example-title">{currentData.title}</h3>

          <ComparisonSlider beforeData={currentData.before} afterData={currentData.after} />

          {/* Navigation arrows */}
          <div className="section-arrows">
            <button
              className="arrow-btn prev-section"
              disabled={currentIndex === 0}
              onClick={() => navigateExample("prev")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Previous Example
            </button>
            <button
              className="arrow-btn next-section"
              disabled={currentIndex === examples.length - 1}
              onClick={() => navigateExample("next")}
            >
              Next Example
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SolutionsComparison
