import React, { Component } from 'react';
import { Form, Input, Message, Button ,Card, Grid} from 'semantic-ui-react';
import Campaign from '../ethereum/testingNode';
import web3 from '../ethereum/web3';
import { Router } from '../routes';
import Link from 'next/link';

class ContributeForm extends Component {
  state = {
    malwareAddress: '',
    errorMessage: '',
    loading: false,
    perCent: 0,
  };


  render() {
    return (
      <Form  error={!!this.state.errorMessage}>

           <Button loading={this.state.loading}>
                <a target="_blank" href="https://minhaskamal.github.io/DownGit/#/home" rel="noopener noreferrer">
                    Download File!
                </a>
            </Button>

        <Message error header="Oops!" content={this.state.errorMessage} />

      </Form>

    );
  }
}

export default ContributeForm;
