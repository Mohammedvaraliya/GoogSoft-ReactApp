import { Routes, Route } from "react-router-dom";
import Search from "./Search";
import Results from "./Results";

const RoutesComponent = () => {
  return (
    <div className="p-4">
      <Routes>
          <Route exact path="/" element={<Search />} />
          <Route exact path="/search" element={<Results />} />
          <Route path="/images" element={<Results />} />
          <Route path="/news" element={<Results />} />
          <Route path="/videos" element={<Results />} />
        </Routes>
    </div>
  );
};

export default RoutesComponent;
