import {DocumentHeadTags,documentGetInitialProps} from '@mui/material-nextjs/v15-pagesRouter';
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

   export default function MyDocument(props) {
     return (
       <Html lang="en">
         <Head>
            <DocumentHeadTags {...props} />
         </Head>
         <body>
           <Main />
           <NextScript />
         </body>
       </Html>
     );
   }
  
  MyDocument.getInitialProps = async (ctx) => {
    const finalProps = await documentGetInitialProps(ctx);
    return finalProps;
  +};
  