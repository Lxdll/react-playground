import { Allotment } from "allotment";
import Aside from "./components/Aside";
import Preview from "./components/Preview";
import Header from "./components/Header";
import "allotment/dist/style.css";
import { PlaygroundProvider } from "./PlaygroundContext";

function App() {
  return (
    <PlaygroundProvider>
      <Header />
      <Allotment className="h-[94vh]">
        <Allotment.Pane minSize={200}>
          <Aside />
        </Allotment.Pane>
        <Allotment.Pane minSize={300}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </PlaygroundProvider>
  );
}

export default App;
