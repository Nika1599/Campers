import { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const Catalog = lazy(() => import("../pages/Catalog/Catalog"));
const CatalogDetails = lazy(() =>
  import("../pages/CatalogDetails/CatalogDetails")
);
const Navigation = lazy(() => import("../components/Navigation/Navigation"));

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CatalogDetails />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
