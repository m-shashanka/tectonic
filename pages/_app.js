import { useRouter } from "next/router";
import axios from "axios";
import { parseCookies, destroyCookie } from "nookies"; //to retrieve cookies from server side
import baseUrl from "../utils/baseUrl";
import { redirectUser } from "../utils/authUser";
import Layout from "../components/Layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import "semantic-ui-css/semantic.min.css";
import "cropperjs/dist/cropper.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import { Media, MediaContextProvider } from "../Responsive/Media";

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  const needMedia = !(router.pathname === "/authentication" || router.pathname === "/reset" || router.pathname === "/reset/[token]");

  if(!needMedia)
    return (
      <Layout {...pageProps} >
        <Component {...pageProps} />
      </Layout>
    );

  return (
    <Layout {...pageProps} >
      <MediaContextProvider>
      <Media greaterThanOrEqual="computer">
        {router.pathname === "/messages" ? 
          (<div className="layContentForTablet">
            <Component {...pageProps} />
          </div>): <div className="layContent">
            <Component {...pageProps} />
          </div>
        }
        </Media>
        <Media between={["tablet", "computer"]}>
          <div className="layContentForTablet">
            <Component {...pageProps} />
          </div>
        </Media>
        <Media lessThan="tablet">
          <div className="layContentForMobile">
            <Component {...pageProps} />
          </div>
        </Media>
      </MediaContextProvider>
    </Layout>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};

  const protectedRoutes =
    ctx.pathname === "/" ||
    ctx.pathname === "/[username]" ||
    ctx.pathname === "/notifications" ||
    ctx.pathname === "/post/[postId]" ||
    ctx.pathname === "/messages" ||
    ctx.pathname === "/search" ||
    ctx.pathname === "/settings" ||
    ctx.pathname === "/update-profile";

  if (!token) {
    destroyCookie(ctx, "token");
    protectedRoutes && redirectUser(ctx, "/authentication");
  }
  //
  else {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    try {
      const res = await axios.get(`${baseUrl}/api/auth`, {
        headers: { Authorization: token },
      });

      const { user, userFollowStats } = res.data;

      //don't allow logged in user to visit authentication page
      if (user) !protectedRoutes && redirectUser(ctx, "/");

      pageProps.user = user;
      pageProps.userFollowStats = userFollowStats;
    } catch (error) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/authentication");
    }
  }

  return { pageProps };
};

export default MyApp;
