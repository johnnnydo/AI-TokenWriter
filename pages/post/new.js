import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";
import Markdown from "react-markdown";

export default function NewPost(props) {
  const [postContent, setPostContent] = useState("");
  console.log(props);

  const handleClick = async () => {
    try {
      const response = await fetch("/api/generatePost", {
        method: "POST",
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from server:", errorData);
        return;
      }
      const json = await response.json();
      console.log("Result", json);
      setPostContent(json.post.postContent);
    } catch (error) {
      console.error("Error making request:", error);
    }
  };
  return (
    <div>
      <h1>This is the postPage</h1>
      <button className="btn" onClick={handleClick}>
        Generate
      </button>
      <Markdown>{postContent}</Markdown>
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
