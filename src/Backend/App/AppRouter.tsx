// src/router/AppRouter.tsx

import {
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import getContentData from "../utils/get_content_data";
import { usePrivateTab } from "../context/PrivateTabContext";
import Course from "../page/Course/Course";
import Home from "../page/Home/Home";
import Tutorial from "../page/Tutorial/Tutorial";
import Author from "../page/Author/Author";
import Faq from "../page/Faq/Faq";
import NotFound from "../page/NotFound/NotFound";
import PrivacyPolicy from "../page/PrivacyPolicy/PrivacyPolicy";
import Setting from "../page/Setting/Setting";
import TermsAndCondition from "../page/TermsAndCondition/TermsAndCondition";
import PDFViewerPage from "../UI/PDF/PDFViewPage";

const AppRouter = () => {
  const { isPrivate } = usePrivateTab();

  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/">
        {/* Home Page */}
        <Route index element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* Course Page */}
        <Route path=":category/">
          <Route index element={<Course />} />

          {getContentData(isPrivate).map((contents, index) => {
            if (!contents.about.link)
              return (
                <Route
                  key={index}
                  path={`${contents.about.name}/`}
                  element={<Tutorial contentData={contents} />}
                >
                  {contents.route!.map((eachContent, topicIndex) => {
                    const page = eachContent.page;
                    const topic = eachContent.topic;
                    return topicIndex === 0 ? (
                      <>
                        <Route
                          index
                          element={<Navigate to={topic} replace />}
                        />
                        <Route
                          path={topic}
                          element={page}
                          key={`${contents.about.name}-${topic}`}
                        />
                      </>
                    ) : (
                      <Route
                        key={`${contents.about.name}-${topic}`}
                        path={topic}
                        element={page}
                      />
                    );
                  })}
                </Route>
              );
          })}
        </Route>

        {/* Author Page */}
        <Route path="/author" element={<Author />} />

        {/* Privacy Policy Page*/}
        <Route path="/privacy_policy" element={<PrivacyPolicy />} />

        {/* Terms and Condition Page */}
        <Route path="/terms_and_condition" element={<TermsAndCondition />} />

        {/* FAQ Page */}
        <Route path="/faq" element={<Faq />} />

        {/* PDF Viewer Route */}
        <Route path="/pdf-viewer" element={<PDFViewerPage />} />

        {/* Setting Page */}
        <Route path="/setting08032006" element={<Setting />} />

        {/* Explicit 404 Page Route */}
        <Route path="/not-found" element={<NotFound />} />

        {/* 404 Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
