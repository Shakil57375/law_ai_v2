import SolutionsComparison from "./components/SolutionsComparison"
import "./styles/globals.css"

function SolutionsInAction() {
  return (
    <section id="solutions-in-action" className="App">
      <section >
        <h2 className="section-title">See Our Solutions in Action</h2>
        <div className="section-content">
          <SolutionsComparison />
        </div>
      </section>
    </section>
  )
}

export default SolutionsInAction
