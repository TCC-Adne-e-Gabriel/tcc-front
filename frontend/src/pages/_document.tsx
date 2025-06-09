// import { documentGetInitialProps } from '@mui/material-nextjs/v15-pagesRouter';
import { Html, Head, Main, NextScript } from "next/document";

   export default function MyDocument() {
     return (
       <Html lang="en">
         <Head>
          <link rel="icon" href="../app/favicon.ico" />
         </Head>
         <body>
           <Main />
           <NextScript />
         </body>
       </Html>
     );
   }
  
  // MyDocument.getInitialProps = async (ctx: Any) => {
  //   const finalProps = await documentGetInitialProps(ctx);
  //   return finalProps;
  // };
  