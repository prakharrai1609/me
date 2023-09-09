import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faUser, faBookJournalWhills, faTools } from '@fortawesome/free-solid-svg-icons'
import TypeWriter from "@/components/typewriter";
import { homePageText as texts } from "@/data";

export default function Home() {
  const router = useRouter();
  const [startTime, setStartTime] = useState(0);
  const tinkerer = useRef();
  const timer = useRef();

  const mouseEnter = () => {
    setStartTime(Date.now());
    tinkerer.current.style.transform = "rotate(-90deg)";
  };

  const mouseLeave = () => {
    setStartTime((startTime) => {
      if (Date.now() - startTime < 1000) {
        timer.current = setTimeout(() => {
          tinkerer.current.style.transform = "rotate(0deg)";
        }, 1000 - (Date.now() - startTime));
      } else {
        tinkerer.current.style.transform = "rotate(0deg)";
      }
      return 0;
    });
  };

  useEffect(() => {
    tinkerer.current?.addEventListener("mouseenter", mouseEnter);
    tinkerer.current?.addEventListener("mouseleave", mouseLeave);

    return () => {
      tinkerer.current?.removeEventListener("mouseenter", mouseEnter);
      tinkerer.current?.removeEventListener("mouseleave", mouseLeave);
    };
  }, [tinkerer.current]);

  return (
    <>
      <Head>
        <title>Prakhar Rai</title>
        <meta name="description" content="This is the portfolio of Prakhar Rai." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div id="content" >
        <p style={{ fontSize: "30px" }}>
          <span style={{ fontSize: "40px", fontWeight: 700 }}>Hey, I am Prakhar Rai</span>
          <br />
          <span style={{ display: "block", marginTop: "10px" }}></span>
          Engineer,
          educator & {" "}
          <span
            ref={tinkerer}
            className="tinkerer"
          >
            <span
              style={{ color: "red", fontWeight: 700, textDecoration: "underline" }}
            >
              tinkerer
            </span>
            <span style={{ color: "#000" }}>.</span>
          </span>
        </p>
        <TypeWriter texts={texts} />
        <ul className="index">
          <li
            onClick={() => {
              router.push("/blogs");
            }}
          >
            <span className="index-date">
              <FontAwesomeIcon icon={faBookJournalWhills} />
            </span>
            <u>Blogs</u>
          </li>
          <li
            onClick={() => {
              router.push("/projects");
            }}
          >
            <span className="index-date">
              <FontAwesomeIcon icon={faTools} />
            </span>
            <u>Projects</u>
          </li>
          <li
            onClick={() => {
              router.push("/about");
            }}
          >
            <span className="index-date">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <u>About me</u>
          </li>
          <li
            onClick={() => {
              router.push("/contact");
            }}
          >
            <span className="index-date">
              <FontAwesomeIcon icon={faAddressBook} />
            </span>
            <u>Contact</u>
          </li>
        </ul>
      </div>
    </>
  );
}
