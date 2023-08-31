import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

const Thread = () => {
  const posts = useSelector((state) => state.posts);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const ulRef = useRef(null);

  const handleScroll = () => {
    const ulElement = ulRef.current;
    if (ulElement) {
      const { scrollTop, clientHeight, scrollHeight } = ulElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        // Si on atteint le bas de la liste, ajouter 3 publications de plus
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 3);
      }
    }
  };

  useEffect(() => {
    const ulElement = ulRef.current;
    ulElement.addEventListener("scroll", handleScroll);
    return () => {
      ulElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const limitedPosts = posts?.slice(0, visiblePosts);

  return (
    <div className="h-full w-full">
      <p className="w-screen relative flex py-2 text-md after:content[''] after:absolute after:w-screen after:h-px after:bg-grey after:bottom-0 after:right-0 sm:w-full sm:after:absolute sm:after:w-full after:h-px after:bg-grey after:bottom-0 after:right-0">
        En ce moment
      </p>
      <ul
        ref={ulRef}
        className="post-list h-screen pb-24  w-full overflow-y-auto overflow-hidden sm:w-4/5 xl:w-[24rem] 2xl:w-[28rem]"
      >
        {limitedPosts &&
          limitedPosts.map((post) => {
            return <Post post={post} key={post._id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
