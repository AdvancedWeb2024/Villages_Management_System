import { Routes, Route } from 'react-router-dom';
import Overview from "../pages/Overview";
import VillageMgt from "../pages/VillageMgt";
import Chat from "../pages/Chat";
import Gallery from "../pages/Gallery";

function MainContent() {
  return (
    <div className="main" id="main-content">
      <Routes>
        <Route path="/overview" component={Overview} />
        <Route path="/village-mgt" component={VillageMgt} />
        <Route path="/chat" component={Chat} />
        <Route path="/gallery" component={Gallery} />
      </Routes>
    </div>
  );
}

export default MainContent;
