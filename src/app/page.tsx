import Image from "next/image";
import styles from "./page.module.css";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite + React + TS</title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>)
}
