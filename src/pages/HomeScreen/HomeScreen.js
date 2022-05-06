import React from "react";
import "./HomeScreen.css";
import TextCard from "../../components/TextCard/TextCard";
import NavMenu from "../../components/NavMenu/NavMenu";
import demo1gif from "../../assets/demo-1.gif";
import menubarimg from "../../assets/menubar.png";
import rightArrowIcon from "../../assets/right-arrow.svg";
import WhatsNewItem from "../../components/WhatsNewItem/WhatsNewItem";
import WhatsNewVersion from "../../components/WhatsNewVersionItem/WhatsNewVersion";

class HomeScreen extends React.Component {
  appRef = React.createRef();
  aboutSectionIntersectorCard = React.createRef();
  whatsNewSectionEntryCard = React.createRef();
  descriptionObserver = null;
  dimObserver = null;
  whatsNewSectionIO = null;
  whatsNewTitle = React.createRef();
  footer = React.createRef();

  state = {
    isDescriptionVisible: "false",
    aboutTextOpacity: "1",
    dimFooter: "false",
    growingIconRatio: 0,
    section: 1,
    whatsNewListMarginTop: 0,
    whatsNewListMarginBottom: 0,
  };

  componentDidMount() {
    document.body.addEventListener("wheel", this.onScroll, { passive: false });

    let options1 = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    let option2 = {
      root: null,
      rootMargin: "0px -50% 0px 0px",
      threshold: 1,
    };

    let option3 = {
      root: null,
      rootMargin: "0px",
      threshold: [
        0,
        0.5,
        0.1,
        0.15,
        0.2,
        0.25,
        0.3,
        0.35,
        0.4,
        0.45,
        0.5,
        0.55,
        0.6,
        0.65,
        0.7,
        0.75,
        0.8,
        0.85,
        0.9,
        0.95,
        1.0,
      ],
    };

    this.descriptionObserver = new IntersectionObserver(
      this.showDescriptionIntersctionObserver,
      options1
    );

    this.dimObserver = new IntersectionObserver(
      this.dimBackgroundObserver,
      option2
    );

    this.whatsNewSectionIO = new IntersectionObserver(
      this.whatsNewSectionObserver,
      option3
    );

    if (this.aboutSectionIntersectorCard.current) {
      this.descriptionObserver.observe(
        this.aboutSectionIntersectorCard.current
      );
      this.dimObserver.observe(this.aboutSectionIntersectorCard.current);
    }

    if (this.whatsNewSectionEntryCard.current) {
      this.whatsNewSectionIO.observe(this.whatsNewSectionEntryCard.current);
    }

    if (this.whatsNewTitle.current) {
      let height = this.whatsNewTitle.current.clientHeight;
      this.setState({ whatsNewListMarginTop: height });
    }

    if (this.footer.current) {
      let rect = this.footer.current.getBoundingClientRect();
      let viewHeight = window.innerHeight;
      let bottom = viewHeight - rect.top;
      this.setState({ whatsNewListMarginBottom: bottom });
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener("wheel", this.onScroll);
  }

  onScroll = (e) => {
    this.appRef.current.scrollLeft += e.deltaY;
    this.appRef.current.scrollLeft += e.deltaX;
    e.preventDefault();
  };

  showDescriptionIntersctionObserver = ([entry]) => {
    if (entry.intersectionRatio === 1) {
      this.setState({ isDescriptionVisible: "true" });
    } else if (
      entry.intersectionRatio === 0 &&
      entry.boundingClientRect.x >= entry.rootBounds.width
    ) {
      this.setState({ isDescriptionVisible: "false" });
    }
  };

  dimBackgroundObserver = ([entry]) => {
    if (entry.isIntersecting && entry.intersectionRatio === 1) {
      this.setState({ aboutTextOpacity: "0.4", dimFooter: "true" });
    } else if (
      entry.intersectionRatio === 0 &&
      entry.boundingClientRect.x >= entry.rootBounds.width / 2
    ) {
      this.setState({ aboutTextOpacity: "1", dimFooter: "false" });
    }
  };

  whatsNewSectionObserver = ([entry]) => {
    if (entry.isIntersecting && entry.boundingClientRect.x > 0) {
      let aboutTextO = Math.min(1 - entry.intersectionRatio, 0.4);
      this.setState({
        growingIconRatio: entry.intersectionRatio,
        aboutTextOpacity: aboutTextO,
      });
    }

    if (entry.intersectionRatio >= 0.9 && entry.boundingClientRect.x <= 150) {
      console.log("pop!");
      this.setState({ section: 2, aboutTextOpacity: 0 });
    } else if (
      entry.intersectionRatio < 0.9 &&
      entry.isIntersecting &&
      entry.boundingClientRect.x > 150 &&
      this.state.section !== 1
    ) {
      console.log("stop!");
      this.setState({ section: 1, aboutTextOpacity: 1 });
    }
  };

  downloadButtonOnPress = () => {
    console.log("download")
    window.open("https://github.com/an23lm/SleepWithMe/releases/download/2.7/SleepWithMe.app.zip")
  }

  render() {
    return (
      <div className="App" ref={this.appRef}>
        <NavMenu className="Menu" items={["About", "What's New"]} />
        <div className="AboutSection">
          <div
            className="StickyTitle"
            style={{ opacity: this.state.aboutTextOpacity }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                className="Title SerifFont"
                isdescriptionvisible={this.state.isDescriptionVisible}
                style={{ flex: 1 }}
              >
                à propos
              </div>
              <div
                style={{
                  color: "white",
                  padding: 20,
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: "white",
                  borderStyle: "solid",
                  alignSelf: "flex-start",
                  marginTop: 50,
                  marginRight: 50,
                  fontFamily: "Roboto",
                  fontSize: '20pt',
                }}
                onClick={this.downloadButtonOnPress}
              >
                Download
              </div>
            </div>
            <div
              className="Subtitle"
              isdescriptionvisible={this.state.isDescriptionVisible}
            >
              A timer which puts your Mac to sleep.
            </div>
            <div
              className="Description"
              isdescriptionvisible={this.state.isDescriptionVisible}
            >
              Sleep With Me? Oh, the handcrafted app that puts your Mac to sleep
              after a timer.
              <br />
              <br />
              Do you enjoy watching a show, listening to music, or an audio book
              before you sleep; but don’t want to worry about your Mac playing
              the show/music/book the whole night? Use Sleep With Me and set a
              timer and rest easy. Set a Sleep Schedule which puts your Mac to
              sleep without any hassles.
            </div>
          </div>
          <div
            className="AboutSectionIntersectorCard"
            ref={this.aboutSectionIntersectorCard}
          />
          <TextCard className="TCard">
            <img className="Demo1" src={menubarimg} alt="Demo video" />
            <div className="FloatingDescription">
              <div className="TitleText SerifFont">Lives on your Menu Bar</div>
              <div className="SubtitleText">
                or on your dock.
                <br />
                Your choice.
              </div>
            </div>
          </TextCard>
          <TextCard className="TCard">
            <img className="Demo1" src={menubarimg} alt="Demo video" />
            <div className="FloatingDescription">
              <div className="TitleText SerifFont">Quick Entry</div>
              <div className="SubtitleText">
                Use the pressure sensitive buttons <br />
                or type in the time
              </div>
            </div>
          </TextCard>
          <TextCard className="TCard">
            <img className="Demo1" src={menubarimg} alt="Demo video" />
            <div className="FloatingDescription">
              <div className="TitleText SerifFont">Sleep Schedule</div>
              <div className="SubtitleText">
                Set a time at which your Mac will go to sleep everyday.
              </div>
            </div>
          </TextCard>
          <TextCard className="TCard">
            <img className="Demo1" src={menubarimg} alt="Demo video" />
            <div className="FloatingDescription">
              <div className="TitleText SerifFont">Still Awake?</div>
              <div className="SubtitleText">
                Easily cancel the sleep timer if you’re still awake
              </div>
            </div>
          </TextCard>
          <TextCard className="TCard">
            <img className="Demo1" src={menubarimg} alt="Demo video" />
            <div className="FloatingDescription">
              <div className="TitleText SerifFont">Global Shortcut</div>
              <div className="SubtitleText">
                Quickly start a sleep timer with a custom global shortcut.
              </div>
            </div>
          </TextCard>
        </div>

        <div
          className="WhatsNewSectionEntry"
          ref={this.whatsNewSectionEntryCard}
        >
          <div className="WhatsNewEntryPadding" />
          <div
            className="EntryTitle SerifFont"
            section={this.state.section.toString()}
          >
            What's <span className="SansSerifItalicFont">new</span>
          </div>
          <div
            className="EntryGrowIcon"
            section={this.state.section.toString()}
            style={{ transform: `scale(${this.state.growingIconRatio})` }}
          >
            <img src={rightArrowIcon} alt="right arrow" />
          </div>
        </div>

        <div className="WhatsNewSection">
          <div
            className="WhatsNewSectionTitle SerifFont"
            ref={this.whatsNewTitle}
            section={this.state.section.toString()}
          >
            What's <span className="SansSerifItalicFont">new</span>
          </div>
          <div
            className="WhatsNewAboutSection"
            style={{
              marginTop: `${this.state.whatsNewListMarginTop}px`,
              marginBottom: `${this.state.whatsNewListMarginBottom}px`,
            }}
          >
            <WhatsNewVersion version="1.2" date="18th May, 2020">
              <WhatsNewItem isFeature={true} title="Keyboard Input">
                You can now type in your sleep timer! (Finally)
              </WhatsNewItem>
              <WhatsNewItem isFeature={false}>
                More bugs fixed! Yay!
              </WhatsNewItem>
            </WhatsNewVersion>
          </div>
        </div>

        <div
          className="FooterTitle SerifFont"
          dim={this.state.dimFooter}
          ref={this.footer}
        >
          Sleep With Me
        </div>
      </div>
    );
  }
}

export default HomeScreen;
