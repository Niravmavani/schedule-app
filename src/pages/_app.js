import TimeProvider from "@/context/TimeProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <TimeProvider>
      <Component {...pageProps} />
    </TimeProvider>
  );
}
