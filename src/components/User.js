import React from "react";
import PropTypes from "prop-types";

export default class User extends React.Component {
  componentWillMount = () => {
    this.props.onMount(this.props.user);
  };
  componentWillReceiveProps = nextProps => {
    if (this.props.user !== nextProps.user) {
      this.props.onUpdate(nextProps.user);
    }
  };
  rederRepos = () => {
    const { repos, error } = this.props;
    if (error) {
      return <p>Error Status</p>;
    } else if (typeof repos === "undefined") {
      return <p>Loading...</p>;
    } else {
      return (
        <ol>
          {repos.map(item => (
            <li>
              <h3>
                <a href={item.url} rel="noreferrer noopener" target="_blank">
                  {item.name}
                </a>
              </h3>
              <p> {item.description} </p>
            </li>
          ))}
        </ol>
      );
    }
  };
  render() {
    const { category } = this.props;
    return (
      <div>
        <h2>
          {typeof category !== "undefined" ? `${category.name} repository` : ""}
        </h2>
        {this.rederRepos()}
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.string,
  onMount: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ),
  error: PropTypes.bool.isRequired
};

User.defaultProps = {
  user: " apple"
};
