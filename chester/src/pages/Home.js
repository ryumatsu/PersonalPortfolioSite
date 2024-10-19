import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import Particle from "../components/Particle";
import Socialicons from "../components/Socialicons";
import Spinner from "../components/Spinner";
import { useTypewriter, Cursor, Typewriter } from 'react-simple-typewriter';

function Home({ lightMode }) {
  const [information, setInformation] = useState("");
  const [startTypingName, setStartTypingName] = useState(false);

  useEffect(() => {
    axios.get("/api/information").then((response) => {
      setInformation(response.data);
    });
  }, []);

  const [initialText] = useTypewriter({
    words: ['Hello', 'Welcome to my page', "I'm "],
    loop: 1,
    deleteSpeed: 50,
    typeSpeed: 70,
    onLoopDone: () => setStartTypingName(true),
  });

  return (
    <Layout>
      <Helmet>
        <title>Home - Ryu Matsu's React Personal Portfolio Site</title>
        <meta
          name="personal portfolio site for RyuMatsu showcasing his personal projects, resume, and blog posts"
          content="RyuMatsu's React Personal Portfolio Homepage"
        />
      </Helmet>
      <Suspense fallback={<Spinner />}>
        <div className="mi-home-area mi-padding-section">
          <Particle lightMode={lightMode} />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-12">
                <div className="mi-home-content">
                  <h1>
                    {initialText}
                    {!startTypingName && <Cursor />}
                    
                    {startTypingName && (
                      <span className="color-theme" >
                      <Typewriter
                        words={[information.name || '']}
                        loop={1}
                        typeSpeed={100}
                        deleteSpeed={0}
                        />
                        {startTypingName && <Cursor />}
                      </span>
                      )}
                  </h1>
                  <p>{information.aboutContent}</p>
                  <Socialicons bordered />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}

export default Home;
