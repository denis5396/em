import React, { Component, createContext } from "react";

const UserContext = createContext();

class UserProvider extends Component {
  state = {
    dataToView: [],
    dataLabel: "",
  };

  setDataAndLabel = (data) => {
    this.setState((prevState) => ({ ...data }));
  };

  render() {
    const { children } = this.props;

    return (
      <UserContext.Provider
        value={{
          state: { ...this.state },
          setDataAndLabel: this.setDataAndLabel,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserContext;

export { UserProvider };
