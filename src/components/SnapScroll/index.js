import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class SnapScroll extends React.Component {
  static defaultProps = {
    evalAfterScroll: 300, // px
    timeoutClearScroll: 100, // ms
  };

  static propTypes = {
    evalAfterScroll: PropTypes.number,
    timeoutClearScroll: PropTypes.number,
    sections: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element])).isRequired,
  };

  constructor(props) {
    super(props);
    this.scrollTimeoutManager = this.scrollTimeoutManager.bind(this);
    this.autoScroll = this.autoScroll.bind(this);
    this.sectionWrappers = [];

    this.previousScroll = 0;
  }

  state = {
    displayedSection: 0,
    blockedScroll: false,
  };

  componentDidMount() {
    this.scrollManager = document.addEventListener('scroll', this.scrollTimeoutManager);
  }

  componentWillUnmount() {
    this.scrollManager = document.removeEventListener('scroll', this.scrollTimeoutManager);
  }

  getSectionPosition(index) {
    if (index === this.state.displayedSection) {
      return 'middle';
    }

    if (index < this.state.displayedSection) {
      return 'top';
    }

    return 'bottom';
  }

  scrollTimeoutManager() {
    this.autoScroll();

    const { timeoutClearScroll } = this.props;

    window.clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.scrollToSection();
      return this.unlockScroll();
    }, timeoutClearScroll);
  }

  autoScroll() {
    if (!this.baseScroll) {
      this.baseScroll = window.scrollY;
      return true;
    }

    // avoid to go to an another section when the scroll is locked
    if (this.state.blockedScroll) {
      return this.scrollToSection();
    }

    const scrollDiff = window.scrollY - this.baseScroll;

    // if the scroll is not deep enough, we don't trigger the rest of the script
    if (scrollDiff < this.props.evalAfterScroll && scrollDiff > this.props.evalAfterScroll * -1) {
      return true;
    }

    const direction = scrollDiff > 0 ? 1 : -1;
    const sectionIndexToDisplay = this.state.displayedSection + direction;
    this.setState({
      displayedSection: sectionIndexToDisplay,
    });

    this.scrollToSection();
    return this.lockScroll();
  }

  lockScroll() {
    return this.setState({ blockedScroll: true });
  }

  unlockScroll() {
    return this.setState({ blockedScroll: false });
  }

  scrollToSection() {
    this.sectionWrappers[this.state.displayedSection].scrollIntoView();
    this.baseScroll = undefined;
  }

  render() {
    return (
      <Wrapper
        ref={wrapper => {
          this.wrapper = wrapper;
        }}
      >
        {this.props.sections.map((Section, index) => (
          <section
            key={`sectionWrapper-${index - 1}`}
            ref={section => {
              this.sectionWrappers[index - 1] = section;
            }}
          >
            <SectionContent position={this.getSectionPosition(index - 1)}>
              <Section>{index}</Section>
            </SectionContent>

            <SectionFootprint />
          </section>
        ))}
      </Wrapper>
    );
  }
}

const Wrapper = styled.main`
  // scroll-snap-points-y: repeat(100%);
  // scroll-snap-type: mandatory;
  // scroll-snap-destination: 100% 0%;
`;

const SectionFootprint = styled.div`
  height: 100vh;
`;

const sectionTopPos = position => {
  switch (position) {
    case 'top':
      return '-100%';

    case 'middle':
      return '0';

    case 'bottom':
    default:
      return '100%';
  }
};

const SectionContent = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 10px black;
  left: 0;
  top: ${props => sectionTopPos(props.position)};
  transition: top 300ms ease-in-out;

  > * {
    height: 100%;
  }
`;

export default SnapScroll;
