import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../Components/Profile";
import SimpleAvatar from "../Components/SimpleAvatar";
import Pods from "../Components/Pods";
import Projects from "../Components/Projects";

import TabPanel from "../Components/TabPanel";
import { TabNav } from "@primer/components";
import {
  NoteIcon,
  PersonIcon,
  RepoIcon,
  PeopleIcon,
} from "@primer/octicons-react";

import octocat from "../img/octocat-white.png";
import { PodmateAvatar } from "../Components/PodmateAvatar";

import projectsData from "../data/projects.json";
import projectImages from "../img/projects";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "65%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [tab, setTab] = React.useState(
    window.location.hash.substr(1) || "home"
  );

  const createAvatars = () =>
    props.fellows
      .filter((fellow) => {
        if (!props.search) return true;
        if (!fellow.name) return false;
        return fellow.name.toLowerCase().includes(props.search);
      })
      .map((fellow, i) => (
        <SimpleAvatar
          bgPhoto={fellow.avatar_url}
          cta="View profile"
          ctaUrl={`/fellows/${fellow.username}`}
          key={i}
        />
      ));

  const createProjects = () =>
    Object.entries(projectsData)
      .filter(([name, details]) => {
        if (!props.search) return true;
        return name.toLowerCase().includes(props.search);
      })
      .map(([name, details]) => (
        <Projects
          name={name}
          description={details.description}
          alt={name}
          image={projectImages[details.image]}
          link={details.githubUrl}
        />
      ));

  if (!props.accessToken) {
    return (
      <div className="App">
        <div className="login">
          <h1>Login</h1>
          <p>
            You must be a{" "}
            <a
              href="https://fellowship.mlh.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MLH Fellow
            </a>
            , and a member of the{" "}
            <a
              href="https://github.com/MLH-Fellowship"
              target="_blank"
              rel="noopener noreferrer"
            >
              MLH Fellowship GitHub organisation
            </a>{" "}
            to use the MLH Fellowbook.
          </p>
          <p>Please login with GitHub below</p>
          <a
            href="https://github.com/login/oauth/authorize?client_id=22d8bad72f3469cd766c&scope=user&allow_signup=false"
            className="login-btn"
          >
            <img src={octocat} alt="octacat" />
            <span>Login with GitHub</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Profile fellows={props.fellows} />
      <div className={classes.root}>
        <TabNav aria-label="Main">
          <TabNav.Link
            href="#home"
            selected={tab === "home"}
            onClick={() => setTab("home")}
          >
            <NoteIcon /> Overview
          </TabNav.Link>
          <TabNav.Link
            href="#pods"
            selected={tab === "pods"}
            onClick={() => setTab("pods")}
          >
            <PersonIcon /> Pods
          </TabNav.Link>
          <TabNav.Link
            href="#podmates"
            selected={tab === "podmates"}
            onClick={() => setTab("podmates")}
          >
            <PeopleIcon /> Podmates
          </TabNav.Link>
          <TabNav.Link
            href="#projects"
            selected={tab === "projects"}
            onClick={() => setTab("projects")}
          >
            <RepoIcon /> Projects
          </TabNav.Link>
        </TabNav>

        <TabPanel tab={tab} value={"home"}>
          <div
            style={{
              display: "grid",
              columnGap: "15px",
              gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
              gridTemplateRows: "repeat(4, 110px)",
            }}
          >
            {createAvatars()}
          </div>
        </TabPanel>
        <TabPanel tab={tab} value={"pods"}>
          <Pods {...props} />
        </TabPanel>
        <TabPanel tab={tab} value={"projects"}>
          <div
            style={{
              display: "grid",
              columnGap: "15px",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gridTemplateRows: "repeat(4, 400px)",
            }}
          >
            {createProjects()}
          </div>
        </TabPanel>
        <TabPanel tab={tab} value={"podmates"}>
          {props.podmates.map((mate, i) => (
            <PodmateAvatar key={i} mate={mate}>
              {mate.name || mate.username}
            </PodmateAvatar>
          ))}
        </TabPanel>
      </div>
    </div>
  );
}
