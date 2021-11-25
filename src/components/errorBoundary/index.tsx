import React, { Component } from "react";
import { ModalWithReload } from "../modal/modalWithReload";
export class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }
  componentDidCatch(_error: Error, _info: any) {}
  render = () => {
    if (!this.state.hasError) {
      return this.props.children;
    }
    return <ModalWithReload message={"Something went wrong."} />;
  };
}
