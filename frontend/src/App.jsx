import "./App.css";
import ParentComponent from "./Pages/ParentComponent.jsx";
import Footer from "./components/Footer.jsx";
function App() {
  return (
    <>
      <div className="content-container">
        {/* <div className='content weatherItems w-fit mx-auto px-1 rounded-md '> */}
        <ParentComponent />
        <Footer />
      </div>
    </>
  );
}

export default App;
