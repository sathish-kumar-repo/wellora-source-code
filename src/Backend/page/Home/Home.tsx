import SocialMedia from "./Components/SocialMedia";
import { Header } from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { Character } from "./Components/Character";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { getYear } from "../../utils/message";

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Helmet>
        <title>{t("home.title")}</title>
        <meta name="description" content={t("home.description")} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950">
        <div className="container-custom">
          <Header isHomePage={true} />
          
          <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
            <div className="relative w-full max-w-6xl mx-auto">
              <div className="card-glass p-8 lg:p-12 rounded-3xl shadow-soft-lg">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div className="space-y-6 lg:space-y-8">
                    <div className="space-y-4">
                      <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gradient leading-tight">
                        {t("home.heading")}
                      </h1>
                      <p className="text-lg lg:text-xl text-secondary-600 dark:text-secondary-300 leading-relaxed">
                        {t("home.about")}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link 
                        to="/author" 
                        className="btn btn-primary btn-lg group"
                      >
                        <span>{t("home.designedBy")}</span>
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                      
                      <Link 
                        to="/programming" 
                        className="btn btn-secondary btn-lg"
                      >
                        Explore Courses
                      </Link>
                    </div>
                    
                    {/* Social Media */}
                    <div className="pt-6">
                      <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-4">
                        Connect with us
                      </p>
                      <SocialMedia />
                    </div>
                  </div>
                  
                  {/* Character/Image */}
                  <div className="flex justify-center lg:justify-end">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full blur-3xl opacity-20 animate-pulse-gentle"></div>
                      <div className="relative animate-float">
                        <Character />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-secondary-200/50 dark:border-secondary-700/50 text-center">
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">
                    {t("footer.copyright", { year: getYear })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;