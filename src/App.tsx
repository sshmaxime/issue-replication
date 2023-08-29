import "storyly-web";

import { useLayoutEffect, useRef } from "react";

type StorylyOptions = {
  token: string;

  // Internationalization
  lang?: string;
  segments?: string[];
};

type StorylyRef = {
  init: (options: StorylyOptions) => void;
  setSegments: (options: StorylyOptions["segments"]) => void;
};

export const useStoryly = () => {
  const ref = useRef<StorylyRef>();

  useLayoutEffect(() => {
    ref.current?.init({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NfaWQiOjY5NDgsImFwcF9pZCI6MTY0ODIsImluc19pZCI6MTgxNjB9.YpBArzPilZo4jHQohfYKCSnlnewhvyy0xbhex-g8DFg",
    });
  }, []);

  useLayoutEffect(() => {
    console.log("hello");
    ref.current?.setSegments([`lang_${"en"}`]);
  }, []);

  return { ref };
};

const StorilyBase = () => {
  const { ref } = useStoryly();

  return (
    <>
      {/* @ts-expect-error the `storyly-web` package doesn't provide any typings yet. */}
      <storyly-web ref={ref} />
    </>
  );
};

function App() {
  return (
    <>
      <StorilyBase />
      Hello
    </>
  );
}

export default App;
