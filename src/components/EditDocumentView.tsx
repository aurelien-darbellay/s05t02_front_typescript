

import { useTypesConfig } from "../contexts/TypesConfigHook";
import { Canvas } from "./Canvas";

const EditDocumentView = () => {
  const cfg = useTypesConfig();
  console.log(cfg.entryTypes[0]);
  return (<>
    <Canvas/>
  </>);
};

export default EditDocumentView;
