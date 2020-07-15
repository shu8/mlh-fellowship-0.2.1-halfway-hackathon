import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "./Profile";
import SimpleAvatar from "./SimpleAvatar";
import Pods from "./Pods";
import Projects from "./Projects";
import babel from "../img/babel.png";
import amplify from "../img/amplify.png";
import docsify from "../img/docsify.png";
import n8n from "../img/n8n.png";
import sheetjs from "../img/sheetjs.png";
import webaverse from "../img/webaverse.ico";

import { TabNav, Box, Text } from "@primer/components";
import { NoteIcon, PersonIcon, RepoIcon } from "@primer/octicons-react";

function TabPanel(props) {
  const { children, tab, value, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tab !== value}
      id={`scrollable-force-tabpanel-${value}`}
      aria-labelledby={`scrollable-force-tab-${value}`}
      {...other}
    >
      {tab === value && (
        <Box p={3} as="div">
          <Text as="div">{children}</Text>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  tab: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "65%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [tab, setTab] = React.useState("home");

  const createAvatars = () =>
    props.data.map((fellow, i) => (
      <SimpleAvatar bgPhoto={fellow.avatar_url} cta="View profile" key={i} />
    ));

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Profile />
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
              gridTemplateColumns: "auto auto auto auto auto auto",
              gridRowGap: "20px",
            }}
          >
            {createAvatars()}
          </div>
        </TabPanel>
        <TabPanel tab={tab} value={"pods"}>
          <Pods
            name="Mentors"
            description="The mentors for the MLH Fellowship class."
          />
          <Pods name="0.0.1" description="Sudo Seals" />
          <Pods name="0.1.1" description="Smart Sea Cucumbers" />
          <Pods name="0.1.2" description="Baby Shark" />
          <Pods name="0.2.1" description="Distributed Dodos" />
          <Pods name="0.2.2" description="JavaScript Jellies" />
        </TabPanel>
        <TabPanel tab={tab} value={"projects"}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gridGap: "20px",
            }}
          >
            <Projects
              name="Babel"
              description="Babel is a popular tool for using the newest features of the JavaScript programming language."
              alt="Babel"
              image={babel}
              link="https://github.com/babel"
            />
            <Projects
              name="Amplify"
              description="AWS Amplify is a set of tools and services that enables mobile and front-end web developers to build secure, scalable full stack applications, powered by AWS."
              alt="Amplify"
              image={amplify}
              link="https://github.com/aws-amplify"
            />
            <Projects
              name="Sheetjs"
              description="Spreadsheets simplified. Read, edit, and export spreadsheets Works in web browsers and servers Supports every Excel file format"
              alt="Sheetjs"
              image={sheetjs}
              link="https://github.com/SheetJS"
            />
            <Projects
              name="N8N"
              description="Free and open self hostable workflow automation tool."
              alt="N8N"
              image={n8n}
              link="https://github.com/n8n-io"
            />
            <Projects
              name="Webaverse"
              description="The Webaverse is a blanket term used to describe a set of technologies that enable the use of spatial applications and objects powered by WebXR."
              alt="Webaverse"
              image={webaverse}
              link="https://github.com/webaverse"
            />
            <Projects
              name="Docsify"
              description="A magical documentation site generator."
              alt="Docsify"
              image={docsify}
              link="https://github.com/docsifyjs"
            />
          </div>
        </TabPanel>
      </div>
    </div>
  );
}
