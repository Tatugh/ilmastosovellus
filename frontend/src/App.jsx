import './App.css'
import ParentComponent from './components/ParentComponent.jsx'


function App() {
  return (
    <>
      <div className="content-container">
      {/* <div className='content weatherItems w-fit mx-auto px-1 rounded-md '> */}
      <ParentComponent />
      </div>
    </>
  )
}

export default App