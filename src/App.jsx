import Page from './Page.jsx'
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

function App() {
  const componentRef = useRef(null);

  const reactToPrintContent = () => {
    return componentRef.current;
  };

  const handlePrint = useReactToPrint({
    documentTitle: "Resume",
    //fonts: CUSTOM_FONTS
  });

  return (
    <div>
      <button onClick={() => handlePrint(reactToPrintContent)}>Print</button>
      <div ref={componentRef}>
        <Page />
      </div>

    </div>
  )
}

export default App
