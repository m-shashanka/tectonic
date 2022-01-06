import HeadTags from "./HeadTags";
import TopBar from "./TopBar/TopBar";
import nprogress from "nprogress";
import Router, { useRouter } from "next/router";

function Layout({children, user, userFollowStats}){

  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();

  const router = useRouter();

  const authenticated = !(router.pathname === "/authentication" || router.pathname === "/reset" || router.pathname === "/reset/[token]");
  
  return (
    <>
    <style jsx global>{`body {background-color: aliceblue;}`}</style>
      <HeadTags />
      {(user && authenticated) && <TopBar user={user} userFollowStats={userFollowStats} />}
      {children}
    </>
  );
}

export default Layout;