import PageBuilder from "./PageBuilder";
import { useReactToPrint } from "react-to-print";
import { useRef, useState, useEffect } from "react";
import fallback_content from "./assets/sample_content.json";
import { populate } from "./request.js"

function App() {
  const componentRef = useRef(null);
  const [content, setContent] = useState(fallback_content);
  // const custom_content_path = './local/custom_content.json';

  // useEffect(() => {
  //   import(/* @vite-ignore */ custom_content_path)
  //     .then((custom_content) => {
  //       console.log("Using custom content at path: ", custom_content_path);
  //       setContent(custom_content);
  //     })
  // }, []);

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
    <div>
      <div ref={componentRef}>
        <PageBuilder content={content} />
      </div>
      <button onClick={() => handlePrint(reactToPrintContent)}>Print</button>
    </div>
  )
}

export default App
