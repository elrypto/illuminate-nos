import React from "react";
import Backbone from "backbone";


class Menu extends React.Component {

  render() {

    let activePath = Backbone.history.getFragment();

    return (
        <nav class="site-header sticky-top py-1">
              <div class="container d-flex flex-column flex-md-row justify-content-between">
                <a class="py-2 d-none d-md-inline-block" href="/">Home</a>
                <a class="py-2 d-none d-md-inline-block" href="#/interact">My Interactions</a>
                <a class="py-2 d-none d-md-inline-block" href="#/providers">Providers</a>
                <a class="py-2 d-none d-md-inline-block" href="#/categories">Categories</a>
                <a class="py-2 d-none d-md-inline-block" href="#">Section</a>
                <a class="py-2 d-none d-md-inline-block" href="#">My Profile</a>
              </div>
            </nav>
    )
  }
}
module.exports = Menu
