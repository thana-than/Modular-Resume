import PageBuilder from "./PageBuilder";
import { useReactToPrint } from "react-to-print";
import { useRef, useState, useEffect } from "react";
import fallback_content from "./assets/sample_content.json";
import { populate } from "./request.js"
import { Button, Tabs } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import "./styles/app.css"

function App() {
  const componentRef = useRef(null);
  const [content, setContent] = useState(fallback_content);
  const [structure, setStructure] = useState(null);

  const reactToPrintContent = () => {
    return componentRef.current;
  };

  const handlePrint = useReactToPrint({
    documentTitle: "Resume",
    //fonts: CUSTOM_FONTS
  });

  useEffect(() => {
    refreshContent();
  }, [structure]);

  const refreshContent = () => {
    if (!structure)
      return;
    let mounted = true;
    (async () => {
      try {
        console.log(fallback_content);
        const res = await populate(structure);
        if (!mounted) return;
        setContent(res);
      } catch (err) {
        console.error("populate failed", err);
      }
    })();
    return () => { mounted = false; };
  };

  return (
    <MantineProvider defaultColorScheme="dark">
      <div className="app_layout">
        <div className="app_panel_resume">
          <div ref={componentRef}>
            <PageBuilder content={content} />
          </div>
        </div>
        <div className="app_panel_options">
          <Button onClick={() => handlePrint(reactToPrintContent)}>Print</Button>
        </div>
      </div>
    </MantineProvider>
  )
}

export default App
