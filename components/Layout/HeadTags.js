import Head from "next/head";
import { mediaStyles } from "../../Responsive/Media";

const HeadTags = () => (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="UTF-8" />
      
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />

      <link rel="icon" href="/favicon.png" sizes="16*16" type="image/png" />

      <link rel="stylesheet" type="text/css" href="/nprogress.css" />

      <link rel="stylesheet" type="text/css" href="/styles.css" />

      <style>{mediaStyles}</style>

      <title>Tectonic</title>
    </Head>
);
export default HeadTags;
