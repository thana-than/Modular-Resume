import PageBuilder from "./PageBuilder";
import { useReactToPrint } from "react-to-print";
import { useRef, useState, useEffect } from "react";
import fallback_content from "./assets/sample_content.json";
import { populate } from "./request.js"
import { Button } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import "./styles/app.css"

function App() {
  const componentRef = useRef(null);
  const [content, setContent] = useState(fallback_content);

  const reactToPrintContent = () => {
    return componentRef.current;
  };

  const handlePrint = useReactToPrint({
    documentTitle: "Resume",
    //fonts: CUSTOM_FONTS
  });

  const testjson = {
    "default":
      [
        {
          "type": "group",
          "content": [
            {
              "type": "section",
              "title": "Name",
              "ids": [
                0, 1, 2
              ]
            },
            {
              "type": "section",
              "title": "Title",
              "ids": [
                4, 3, 5
              ]
            }
          ]
        }
      ]
  };

  console.log("populating");
  populate(testjson)

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
