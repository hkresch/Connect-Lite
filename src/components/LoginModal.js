import React from 'react';
import ReactModalLogin from 'react-modal-login';
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase";


class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sign: false,
      login: false,
    }
  }

  onOpenModal = () => {
    this.setState({sign: true});
  }

  onOpenModalLogin = () => {
    this.setState({login: true});
  }

  onCloseModal = () => {
    this.setState({sign: false});
  };

  onCloseModalclose = () => {
    this.setState({login: false});
  };



}