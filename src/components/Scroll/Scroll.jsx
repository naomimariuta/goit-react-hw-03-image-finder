/** @jsxImportSource @emotion/react */
import React, { Component } from 'react';
import { css } from '@emotion/react';

class Scroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
    this.scrollToTop = this.scrollToTop.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    if (window.scrollY > 300) {
      this.setState({ isVisible: true });
    } else {
      this.setState({ isVisible: false });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.toggleVisibility);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.toggleVisibility);
  }

  render() {
    const style = css`
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: ${this.state.isVisible ? 'flex' : 'none'};
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 24px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    `;

    return (
      <button css={style} onClick={this.scrollToTop}>
        ↑
      </button>
    );
  }
}

export default Scroll;
