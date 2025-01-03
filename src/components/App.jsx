import { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const Catalog = lazy(() => import("../pages/Catalog/Catalog"));
const CatalogDetails = lazy(() =>
  import("../pages/CatalogDetails/CatalogDetails")
);
const AppBar = lazy(() => import("./AppBar/AppBar"));

function App() {
  return (
    <div className="container">
      <AppBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CatalogDetails />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
