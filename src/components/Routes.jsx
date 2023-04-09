import { Routes, Route, Navigate } from "react-router-dom";
import Search from "./Search";
import Results from "./Results";

const RoutesComponent = () => {
  return (
    <div className="p-4">
      <Routes>
          <Route path="/search" element={<Results />} />
          <Route path="/images" element={<Results />} />
          <Route path="/news" element={<Results />} />
          <Route path="/videos" element={<Results />} />
          <Route path="*" element={<Navigate to="/search" replace />} />
        </Routes>
    </div>
  );
};

export default RoutesComponent;
