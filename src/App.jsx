import PageBuilder from "./PageBuilder";
import { useReactToPrint } from "react-to-print";
import { useRef, useState, useEffect } from "react";
import fallback_content from "./assets/sample_content.json";

function App() {
  const componentRef = useRef(null);
  const [content, setContent] = useState(fallback_content);
  const custom_content_path = './local/custom_content.json';

  useEffect(() => {
    import(custom_content_path)
      .then((custom_content) => {
        console.log("Using custom content at path: ", custom_content_path);
        setContent(custom_content);
      })
  }, []);

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
        <PageBuilder content={content} />
      </div>
    </div>
  )
}

export default App
