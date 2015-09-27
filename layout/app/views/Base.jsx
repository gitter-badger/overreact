import React from "react";
import { Link, RouteHandler } from "react-router";

export default class Base extends React.Component {
  render () {
    return (
      <div>
        <h1>Base</h1>
        <RouteHandler />
      </div>
    )
  }
}
