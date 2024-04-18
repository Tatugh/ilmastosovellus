import "./App.css";
import Ilmasto from "./Pages/Ilmasto.jsx";
import Footer from "./components/Footer.jsx";
function App() {
  return (
    <>
      <div className="content-container">
        {/* <div className='content weatherItems w-fit mx-auto px-1 rounded-md '> */}
        <Ilmasto />
        <Footer />
      </div>
    </>
  );
}

export default App;
